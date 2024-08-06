const express = require('express');
const cors = require("cors");
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//const Db = require('mongodb').Db;
//const MongoClient = require('mongodb').MongoClient;
const path = require('path')
//var bodyParser = require('body-parser')

dotenv.config();

app.use(cors({
    origin: '*',
}))

// parse application/x-www-form-urlencoded
//app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

//app.use(bodyParser.text());

app.use('/', require('./routes/authRoutes'))

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
app.listen(PORT, () => console.log('Server is running on', PORT));
