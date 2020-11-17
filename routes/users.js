const express = require('express');
const router = express.Router();

const { verifyToken } = require('./middlewares/authorization');

/* GET users listing. */
router.get('/:userId/photos', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/:userId/photos', verifyToken, function(req, res, next) {
  // console.log('body', req);
  // console.log('req', req);
});

module.exports = router;
