const express = require('express');
const cors = require("cors");
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//const Db = require('mongodb').Db;
//const MongoClient = require('mongodb').MongoClient;
const path = require('path')
const compression = require('compression')

const crypto = require('crypto')
const randomImageNam = (bytes = 64) => crypto.randomBytes(bytes).toString('hex')

//multer
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage: storage})

//s3
const {S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand} = require("@aws-sdk/client-s3")
const {getSignedUrl} = require('@aws-sdk/s3-request-presigner')

const sizeOf = require("image-size")


//var bodyParser = require('body-parser')
const http = require('http')
const {Server} = require('socket.io')
const server = http.createServer(app)
const authCreateTemplate = require('./controllers/authCreateTemplate')

dotenv.config();
const BUCKET_NAME = process.env.BUCKET_NAME
const BUCKET_REGION = process.env.BUCKET_REGION
const ACCESS_KEY = process.env.ACCESS_KEY
const SECRET_KEY = process.env.SECRET_KEY

const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

var image_new_props
io.on('connection', (socket) => {
    console.log('user connected')
    socket.on('disconnect', () => {
        console.log('user disconnected')
    });

    socket.on('update_db', (msg) => {
        authCreateTemplate.update_canvas(msg)
    })

    socket.on('s3_bucket', async(msg) => {
        const buffer = Buffer.from(msg.buffer)
        image_new_props = await updateS3(buffer)
        socket.emit('reply', {image_new_props: image_new_props, image_id: msg.image_id})
    })

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

    /*socket.on('update_s3', async(msg) => {
        console.log('updates3')
        const buffer = Buffer.from(msg.buffer)
        image_new_props = await updateS3(buffer)
        socket.emit('reply', image_new_props)

        console.log('delet s3')
        const URL = require('url').parse(msg.url)
        const filename = URL.pathname.replace(/(^\/|\/$)/g,'')
        const input = { // DeleteObjectRequest
            Bucket: BUCKET_NAME, // required
            Key: filename, // required
        };
        const command = new DeleteObjectCommand(input);
        await s3.send(command);
    })*/
})

const s3 = new S3Client({
    credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_KEY
    },
    region: BUCKET_REGION
})

app.use(cors({
    origin: '*',
}))


// parse application/x-www-form-urlencoded
//app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

//app.use(bodyParser.text());

app.use('/', require('./routes/authRoutes'))

const updateS3 = async(buffer) => {
        const dimensions = sizeOf(buffer)
        const image_name = randomImageNam() + '.png'
        const params = {
            Bucket: BUCKET_NAME,
            Key: image_name,
            Body: buffer,
            ContentType: 'image/png'
        }
    
        const command = new PutObjectCommand(params)
        await s3.send(command)
    
        const get_obj_command = new GetObjectCommand(params)
        const url = await getSignedUrl(s3, get_obj_command, {expiresIn: 3600})
        return {url: url, width: dimensions.width, height: dimensions.height}
    }

app.post('/add_image', upload.single('image'), async(req, res) => {
    try{
        const buffer = req.file.buffer
        const params = await updateS3(buffer)
        res.json({URL: params.url, width: params.width, height: params.height})
    }catch(err){
        console.log(err)
    }
}
)

/*app.post('/crop', upload.single('image'), async(req, res) => {
    try{
        console.log('2', req.body)
        const image = sharp(req.body.buffer);
        image.metadata()
        .then((metadata) => {
            // perform your calculations based on metadata.width and metadata.height
            const left = req.body.cropProp.left, top = req.body.cropProp.top, width = req.body.cropProp.width, height = req.body.cropProp.height;
            return image
            .extract({ left, top, width, height })
            .toBuffer();
        })
        .then((metadata) => {
            console.log('3', metadata)
            const dimensions = sizeOf(metadata)
    
            const image_name = randomImageNam() + '.png'
            const params = {
                Bucket: BUCKET_NAME,
                Key: image_name,
                Body: metadata,
                ContentType: 'png'
            }

            const command = new PutObjectCommand(params)
            s3.send(command)

            const get_obj_command = new GetObjectCommand(params)
            const url = getSignedUrl(s3, get_obj_command, {expiresIn: 3600})
            res.json(url)
        })
        .then((data) => {
            console.log('4', data)
            res.json(data)
        })
    }
    catch(e){
        res.json("fail")
    }

})*/

app.use(express.static(path.join(__dirname, "./frontend/dist")))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "./", "frontend", "dist", "index.html"))
})

//app.post("/login",cors(),(req,res)=>{
    //console.log('RECEIVED!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
//})

//app.use(express.static(path.join(__dirname, "./frontend/dist")))
//app.get('*', (req, res) => {
    //res.sendFile(path.resolve(__dirname, "./", "frontend", "dist", "index.html"))
//})

//app.post('*', (req, res) => {
    //res.sendFile(path.resolve(__dirname, "./", "frontend", "dist", "index.html"))
//})


//db connect
mongoose.connect(process.env.MONGO_DB)
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})



/*
const client = new MongoClient(process.env.MONGO_DB);
try {
    const connect = client.connect();

    if(connect){
        console.log('Database connected!!!')
    }
 
} catch (e) {
    console.error(e);
}
    */


const PORT = process.env.PORT;
server.listen(PORT, () => console.log('Server is running on', PORT));
