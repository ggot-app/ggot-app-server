const express = require('express');
const router = express.Router();

const { verifyToken } = require('./middlewares/authorization');
const { uploadPhoto } = require('./middlewares/uploadPhotos');
const usersController = require('./controllers/usersController');

/* GET users listing. */
router.get('/:userId/photos', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/:userId/photos',
  verifyToken,
  uploadPhoto.array('image', 5),
  usersController.savePhotos,
);

module.exports = router;
