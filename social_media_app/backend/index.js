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
