const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const { statusMessage } = require('../../constants/statusMessage');
const { errorMessage } = require('../../constants/errorMessage');

const SECRET_KEY = process.env.SECRET_KEY;

exports.getLogin = async (req, res, next) => {
  const { email, profileUrl } = req.body;
  let ggotUser;

  try {
    ggotUser = await User.findOne({ email: email });

    if (!ggotUser) {
      const userData = {
        email: email,
        profile_url: profileUrl,
        photos: []
      };

      ggotUser = await User.create(userData);
    }

    return res.status(201).json({
      result: statusMessage.success,
      token: jwt.sign(email, SECRET_KEY),
      ggotUser
    });
  } catch (err) {
    return res.status(400).json({
      result: statusMessage.fail,
      errMessage: errorMessage.invalidLogin
    });
  }
};
