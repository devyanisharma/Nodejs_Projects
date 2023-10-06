const { S3Client, GetObjectCommand, PutObjectCommand ,ListObjectsV2Command} = require('@aws-sdk/client-s3')
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")

//it will call on behalf of node.js
const s3Client = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: "AKIA6FNBXNUNTTL6NBUX",
        secretAccessKey: "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"

    }
})
const getsignedurl = function (req,res,next){
    const file = req.file;
    async function getObjectURL(key) {
            const command = new GetObjectCommand({
                Bucket: 'social-media-post',
                Key: key
        
            })
            const url = await getSignedUrl(s3Client, command)
            return url;
        }
        
        getObjectURL(file.location).then((data) => {
            console.log("get url for icecream img", data)
        }).catch((error) => {
            console.log(error)
        })
     next(data)
}
