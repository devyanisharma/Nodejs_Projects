const { S3Client } = require('@aws-sdk/client-s3')
const multer = require('multer')
const multerS3 = require('multer-s3')


    const s3Client = new S3Client({
        region: "ap-south-1",
        credentials: {
            accessKeyId: "AKIA6FNBXNUNTTL6NBUX",
            secretAccessKey: "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"
    
        }
    })
    
    const upload = multer({
        storage: multerS3({
          s3: s3Client,
          bucket: 'social-media-post',
          contentType: multerS3.AUTO_CONTENT_TYPE,
          metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
          },
          key: function (req, file, cb) { 
            let fullpath = 'media/uploads/' + Date.now().toString() +'.jpeg'
            cb(null,fullpath)
          }
        }),
        limits: { fileSize: 5000000 }, // In bytes: 5000000 bytes = 5 MB
      })
     
module.exports = {upload:upload};
  