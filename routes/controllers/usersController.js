const Photo = require('../../models/Photo');
const User = require('../../models/User');
const { statusMessage } = require('../../constants/statusMessage');
const { errorMessage } = require('../../constants/errorMessage');
const { getPhotoUrl } = require('../middlewares/uploadPhotos');

exports.savePhotos = async (req, res, next) => {
  try {
    const awsPhotoUrlList = getPhotoUrl(req.files);

    // // 에러처리 해야함
    // if (!awsPhotoUrlList) {
    //   return res.status(400).json({
    //     result: statusMessage.fail
    //   });
    // }

    // // newPhoto DB에 저장
    // const {
    //   resistered_by,
    //   location,
    //   description,
    //   published_at
    // } = req.body;

    // const photosInfo = {
    //   resistered_by: resistered_by,
    //   location: location,
    //   photo_url_list: awsPhotoUrlList,
    //   description: description,
    //   published_at: published_at
    // };

    // const newPhoto = await Photo.create(photosInfo); //에러처리해야함

    // // 유저 schema에 photos 업데이트
    // const { _id } = newPhoto;
    // const newPhotoId = _id.toString();

    // // const userData = await User.findByIdAndUpdate(newPhotoId, )

    return res.status(200).json({
      result: statusMessage.success
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      result: statusMessage.fail,
      errorMessage: errorMessage.invalidPhoto
    });
  }
};
