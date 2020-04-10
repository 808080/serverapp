const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public');
  },
  filename: (req, file, cb) => {
    const id = req.params.id;
    const extention = file.originalname.split('.').pop();
    cb(null, id + '.' + extention);
  }
});

module.exports = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
}).single('avatar');