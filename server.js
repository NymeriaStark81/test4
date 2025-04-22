const express = require('express');
const cors = require("cors");
const app = express();
const dotenv = require('dotenv');
const sharp = require("sharp")
const mongoose = require('mongoose');
const path = require('path')
const bodyParser = require('body-parser');

//getting secret keys from .env
dotenv.config();
const BUCKET_NAME = process.env.BUCKET_NAME
const BUCKET_REGION = process.env.BUCKET_REGION
const ACCESS_KEY = process.env.ACCESS_KEY
const SECRET_KEY = process.env.SECRET_KEY



//CORS policy
app.use(cors({
    origin: '*',
    methods: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,   
}))


//DEALING WITH IMAGES
//multer
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage: storage})

//image size library
const sizeOf = require("image-size")

//generating random image names
const crypto = require('crypto')
const randomImageNam = (bytes = 64) => crypto.randomBytes(bytes).toString('hex')

//s3 library
const {S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand} = require("@aws-sdk/client-s3")
const {getSignedUrl} = require('@aws-sdk/s3-request-presigner')
//s3 client
const s3 = new S3Client({
    credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_KEY
    },
    region: BUCKET_REGION
})

//add object to s3 and get its url
const ObjectCommand = async(params) => {
    const command = new PutObjectCommand(params)
    await s3.send(command)

    const get_obj_command = new GetObjectCommand(params)
    const url = await getSignedUrl(s3, get_obj_command, {expiresIn: 3600})

    return(url)
}

//editTemplate images - add images and icons to s3
const updateS3 = async(buffer) => {
    const dimensions = sizeOf(buffer)
    const image_name = randomImageNam() + '.png'
    const params = {
        Bucket: BUCKET_NAME,
        Key: image_name,
        Body: buffer,
        ContentType: 'image/png'
    }

    console.log('server 4')
    
    const url = await ObjectCommand(params)

    return {url: url, width: dimensions.width, height: dimensions.height}
}
app.post('/add_image', upload.single('image'), async(req, res) => {
try{
    const buffer = req.file.buffer
    const params = await updateS3(buffer)
    const URL = params.url.split('?')[0]
    res.json({URL: URL, width: params.width, height: params.height})
}catch(err){
    console.log(err)
}
}
)
app.post('/add_icon', upload.array('image', 100), async(req, res) => {
    try{
        var urls = []
        for(let i = 0; i< req.files.length; i++){
            const buffer = req.files[i].buffer
            const dimensions = sizeOf(buffer)
            if(dimensions.width <= dimensions.height){
                size = dimensions.width
            } else {
                size = dimensions.height
            }
            await sharp(buffer)
                .resize({width: size, height: size})
                .toBuffer()
                .then(async(data) => {
                    const params = await updateS3(data)
                    const URL = params.url.split('?')[0]
                    urls.push(URL)
                })
        }
        res.json(urls)
        
    }catch(err){
        console.log(err)
    }
    }
    )



//SOCKET
const http = require('http')
const {Server} = require('socket.io')
const server = http.createServer(app)
const authTemplate = require('./controllers/authTemplate')
const authJournalView = require('./controllers/authJournalView')


/*const sameNameS3_Update = async(buffer, prevUrl) => {
    const image_name = prevUrl.split('/')[3]
    console.log('server 5', image_name)
    const params = {
        Bucket: BUCKET_NAME,
        Key: image_name,
        Body: buffer,
        ContentEncoding: 'base64',
        ContentType: 'application/json',
    }

    const url = await ObjectCommand(params)
    console.log(url)
    const URL = url.split('?')[0]

    return(URL)
}*/


const io = new Server(server, {
    cors: {
        origin: '*',
    }, 
    maxHttpBufferSize: 1e8
});

//socket connection
var image_new_props
io.on('connection', (socket) => {
    console.log('user connected')
    socket.on('disconnect', () => {
        console.log('user disconnected')
    });

    //update template when editing
    socket.on('update_db', (msg) => {
        authTemplate.update_canvas(msg)
    })

    //replace new image after cropping
    socket.on('s3_bucket', async(msg) => {
        const buffer = Buffer.from(msg.buffer)
        image_new_props = await updateS3(buffer)
        socket.emit('reply', {image_new_props: image_new_props, image_id: msg.image_id})
    })

    //delete image
    socket.on('delete_image', async(msg) => {
        const URL = require('url').parse(msg.url)
        const filename = URL.pathname.replace(/(^\/|\/$)/g,'')
        const input = { // DeleteObjectRequest
            Bucket: BUCKET_NAME, // required
            Key: filename, // required
        };
        const command = new DeleteObjectCommand(input);
        await s3.send(command);
    })

    //update journal content
    socket.on('update_view', async (msg) => {
        console.log('1.6')
        const buffer = Buffer.from(JSON.stringify(msg.pages));

        const image_name = msg.prevURL.split('/')[3]
        const params = {
            Bucket: BUCKET_NAME,
            Key: image_name,
            Body: buffer,
            ContentEncoding: 'base64',
            ContentType: 'application/json',
        }

        const url = await ObjectCommand(params)
        const URL = url.split('?')[0]

        console.log('2')

        authJournalView.update_view(msg.journalID, URL)
    })
})



app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '500mb' }));


app.use(express.json());
app.use(express.static(path.join(__dirname, "./frontend/dist")))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "./", "frontend", "dist", "index.html"))
})

//routing to routes 
app.use('/', require('./routes'))

//db connect
mongoose.connect(process.env.MONGO_DB)
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})

//PORT
const PORT = process.env.PORT;
server.listen(PORT, () => console.log('Server is running on', PORT));


//update JSON objects or text files (pages of journals) to s3
const updateJSON = async(buffer) => {
    const image_name = randomImageNam() + '.json'
    const params = {
        Bucket: BUCKET_NAME,
        Key: image_name,
        Body: buffer,
        ContentEncoding: 'base64',
        ContentType: 'application/json',
    }

    const url = await ObjectCommand(params)

    return {url: url}
}
app.post('/add_JSON', async(req, res) => {
try{
    const buffer = Buffer.from(JSON.stringify(req.body.data));
    const params = await updateJSON(buffer)
    const URL = params.url.split('?')[0]
    res.json(URL)
}catch(err){
    console.log(err)
}
}
)

//new thumbnail
app.post('/news3_thumbnail_template', async(req, res) => {
    try{
        let fimg = await fetch(req.body.dataUrl)
        let fimgb = Buffer.from(await fimg.arrayBuffer())
        const params = await updateS3(fimgb)
        const URL = params.url.split('?')[0]
        res.json(URL)
    }catch(err){
        console.log(err)
    }
    }
    )

//update thumbnail using same key
app.post('/updates3_thumbnail_template', async(req, res) => {
    try{
        
        console.log('server 2')
        let fimg = await fetch(req.body.dataUrl)
        console.log('server 3', fimg)
        let fimgb = Buffer.from(await fimg.arrayBuffer())
        console.log('server 4', fimgb)

        const image_name = req.body.prevURL.split('/')[3]
        console.log('server 5', image_name)
        const params = {
            Bucket: BUCKET_NAME,
            Key: image_name,
            Body: fimgb,
            ContentType: 'image/png',
        }

        const url = await ObjectCommand(params)
        console.log(url)
        const URL = url.split('?')[0]
        console.log('server 6', URL)
        res.json(URL)
    }catch(err){
        console.log(err)
    }
    }
    )