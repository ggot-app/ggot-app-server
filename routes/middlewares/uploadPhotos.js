const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: ggot-app-photo-storage,
    acl: 'public-read-write',
    key: function(req, file, cb) {
      let extention = path.extname(file.originalname);

      cd(null, Date.now().toString() + extension);
    }
  })
});

