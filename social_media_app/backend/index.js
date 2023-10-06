const express = require("express")
const authRouter = require("./routers/authRouter")
const postRouter = require("./routers/postRouter")
const commentRouter = require("./routers/commentRouter")
const app = express()
const passport = require('passport');
const bodyParser = require("body-parser");
const morgan = require("morgan") //middleware for logs
const rfs = require('rotating-file-stream')
const path = require("path")
require('./passport');
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express");
const { S3Client, GetObjectCommand, PutObjectCommand ,ListObjectsV2Command} = require('@aws-sdk/client-s3')
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")

//it will call on behalf of node.js
// const s3Client = new S3Client({
//     region: "ap-south-1",
//     credentials: {
//         accessKeyId: "AKIA6FNBXNUNTTL6NBUX",
//         secretAccessKey: "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"

//     }
// })

// async function getObjectURL(key) {
//     const command = new GetObjectCommand({
//         Bucket: 'social-media-post',
//         Key: key

//     })
//     const url = await getSignedUrl(s3Client, command)
//     return url;
// }

// getObjectURL('download (2).jpeg').then((data) => {
//     console.log("get url for icecream img", data)
// }).catch((error) => {
//     console.log(error)
// })

// async function putObject(filename, contentType) {
//     const command = new PutObjectCommand({
//         Bucket: 'social-media-post',
//         Key: `/uploads/user-uploads/${filename}`,
//         ContentType: contentType

//     })
//     const url = await getSignedUrl(s3Client, command)
//     return url;
// }

// putObject('uploadedfile.jpeg',"image/jpeg").then((data)=>{
//     console.log(`signed url for put ${data}`)
//     return data;
// }).catch((error)=>{
//     console.log(error)
// })
// getObjectURL("/uploads/user-uploads/uploadedfile.jpeg").then((data) => {
//     console.log("get signed url for new uploaded", data)
// }).catch((error) => {
//     console.log(error)
// })

// //to get list details of all uploads
// async function listObjects(){
//     const command = new ListObjectsV2Command({
//         Bucket: 'social-media-post',
//         Key:"/"
//     })
//     const result =  await s3Client.send(command)
//     console.log(result)
// }
// async function init(){await listObjects();}
// init();



app.use(express.json()); // parses incoming requests with JSON payloads 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const customFormat = 'date :date[web] method-:method url-:url status-:status response time-:response-time ms response-:res[content-length]';
const accessLogStream = rfs.createStream(`access.log`, {
    interval: '1d', // Rotate daily
    path: path.join(__dirname, 'logs') // Folder where log files will be stored

});

app.use(morgan(customFormat, { stream: accessLogStream }))
app.use(passport.initialize());
app.use('/api', authRouter)
app.use('/api/post', postRouter)
app.use('/api/post/comment', commentRouter)
//app.use('/api/post', passport.authenticate('jwt', { session: false }),postRouter)


//db connection details
const mongoose = require("mongoose");
const username = encodeURIComponent("user");
const password = encodeURIComponent("password");
const mongo_server = "localhost:27017";
const authMechanism = "DEFAULT";
const dbName = "social_app_backend"
const uri = `mongodb://${username}:${password}@${mongo_server}/?authMechanism=${authMechanism}`;
mongoose.connect(uri, {
    authMechanism: authMechanism,
    dbName: dbName,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("mongodb connected");
})
    .catch((error) => {
        console.log(`mongodb connection error: ${error}`)
    })


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
//port connection
const port = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`local host is listening at ${port}`)
})
