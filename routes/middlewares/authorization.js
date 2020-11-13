const jwt = require('jsonwebtoken');
const { errorMessage } = require('../../constants/index');
const YOUR_SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  const { token } = req.body;

  jwt.verify(token, YOUR_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error: errorMessage.invalidUser
      });
    }

    next();
  });
};

exports.verifyToken = verifyToken;