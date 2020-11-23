const PhotoService = require('../../services/PhotoService');

exports.getPhotoByLocation = async (req, res, next) => {
  try {
    (async function () {
      const { lat, lng } = req.query;
      console.log(lat, lng);
      const result = await PhotoService.getPhotoByLocation(lat, lng);
      res.json(result);
    })();
  } catch (error) {
  }
};
