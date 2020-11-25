const PhotoService = require('../../services/PhotoService');
const { errorMessage } = require('../../constants/errorMessage');
const { statusMessage } = require('../../constants/statusMessage');

exports.getPhotoByLocation = async (req, res, next) => {
  try {
    const {
      limit,
      page,
      latitude,
      longitude
    } = req.query;
    const photos = await PhotoService.getPhotoByLocation(latitude, longitude, limit, page);

    return res.status(200).json({
      result: statusMessage.success,
      photos
    });
  } catch (err) {
    err.message = errorMessage.invalidPhotoListByLocation;

    next(err);
  }
};
