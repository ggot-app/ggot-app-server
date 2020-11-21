const PhotoService = require('../../services/PhotoService');

exports.getPhotoByLocation = async (req, res, next) => {
  try {
    const { lat, lng } = req.query;
    const result = await PhotoService.getPhotoByLocation(lat, lng);
    console.log(result);
  } catch (error) {
  }
};
