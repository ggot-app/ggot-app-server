const Photo = require('../../models/Photo');
const User = require('../../models/User');
const { statusMessage } = require('../../constants/statusMessage');
const { errorMessage } = require('../../constants/errorMessage');
const { getPhotoUrl } = require('../middlewares/uploadPhotos');

exports.savePhotos = async (req, res, next) => {
  try {
    const awsPhotoUrlList = getPhotoUrl(req.files);
    // aws에서 받아온 location리스트 => 배열형태

    // 에러처리 해야함
    if (!awsPhotoUrlList) {
      return res.status(400).json({
        result: statusMessage.fail
      });
    }
    // newPhoto DB에 저장
    const {
      latitude,
      longitude,
      description,
      published_at,
      resistered_by
    } = req.body;

    // latitude: 37.506059, longitude: 127.059130 => 바닐라코딩
    // latitude: 37.511808, longitude: 127.059348 => 코엑스
    // latitude: 37.506004, longitude: 127.056137 => 포스코 테라로사

    const photosInfo = {
      resistered_by: resistered_by,
      location: [latitude, longitude],
      photo_url_list: awsPhotoUrlList,
      description: description,
      published_at: published_at
    };

    const newPhoto = await Photo.create(photosInfo); //에러처리해야함
    // 유저 schema에 photos 업데이트
    const { _id } = newPhoto;
    await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { photos: _id } }
    );

    return res.status(200).json({
      result: statusMessage.success
    });
  } catch (err) {
    return res.status(500).json({
      result: statusMessage.fail,
      errorMessage: errorMessage.invalidPhoto
    });
  }
};

exports.getPhotoListByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const PhotoListByUserId = await User.findById(userId).populate('photos');
    const { photos } = PhotoListByUserId;

    return res.status(200).json({
      result: statusMessage.success,
      photos
    });
  } catch (err) {
    error.status =  500;

    next(); //미완성의 에러처리...
  }
};
