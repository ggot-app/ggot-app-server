const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const { statusMessage } = require('../../constants/statusMessage');
const { errorMessage } = require('../../constants/errorMessage');

const SECRET_KEY = process.env.SECRET_KEY;

exports.getLogin = async (req, res, next) => {
  const { email, profileUrl } = req.body;

  try {
    const targetUser = await User.findOne({ email: email });
    // const {
    //   _id,
    //   photos,
    //   email,
    //   profile_url} = targetUser;

    // const userData = {
    //   _id: _id,
    //   email: email,
    //   profile_url: profile_url,
    //   photos: photos
    // };

    if (!targetUser) {
      const userData = {
        email: email,
        profile_url: profileUrl,
        photos: []
      };

      await User.create(userData);
    }

    return res.status(201).json({
      result: statusMessage.success,
      token: jwt.sign(email, SECRET_KEY)
    });
  } catch (err) {
    return res.status(400).json({
      result: statusMessage.fail,
      errMessage: errorMessage.invalidLogin
    });
  }
};
