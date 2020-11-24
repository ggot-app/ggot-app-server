const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const { errorMessage } = require('../../constants/errorMessage');
const { statusMessage } = require('../../constants/statusMessage');

const SECRET_KEY = process.env.SECRET_KEY;

exports.getLogin = async (req, res, next) => {
  try {
    const { email, profileUrl } = req.body;

    let ggotUser = await User.findOne({ email: email })
                             .populate('photos');

    if (!ggotUser) {
      const newUserData = {
        email: email,
        profile_url: profileUrl,
        photos: []
      };

      ggotUser = await User.create(newUserData);
    }

    return res.status(201).json({
      result: statusMessage.success,
      token: jwt.sign(email, SECRET_KEY),
      ggotUser
    });
  } catch (err) {
    err.status = 401;
    err.result = statusMessage.fail;
    err.message = errorMessage.invalidLogin;

    next(err);
  }
};
