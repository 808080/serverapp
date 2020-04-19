const multer = require('multer');

const formatFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Unsupported file type'));
  }
  cb(null, true);
}

const storage = (path) => multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./public/${path}`);
  }
});

const bookImgUpload = multer({
  storage: storage('bookPreviews'),
  limits: {
    fileSize: 1024 * 1024 * 7
  },
  fileFilter: formatFilter
}).array('images', 4);

const avatarUpload = multer({
  storage: storage('userAvatars'),
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: formatFilter
}).single('avatar');

module.exports = {
  bookImgUpload,
  avatarUpload
};