const express = require('express');
const router = express.Router();

const photoController = require('../routes/controllers/photoController.js');

router.get('/location', photoController.getPhotoByLocation);

module.exports = router;
