const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/bookPreviews');
  }
});

module.exports = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 7
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Unsupported format'));
    }
    cb(null, true);
  }
}).array('images', 4);