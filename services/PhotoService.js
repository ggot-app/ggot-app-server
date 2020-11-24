const Photo = require('../models/Photo');

function getDistanceFromLatLonInKm(lat1,lng1,lat2,lng2) {
  function deg2rad(deg) {
      return deg * (Math.PI/180);
  }

  var R = 6371;
  var dLat = (lat2-lat1) * (Math.PI/180);
  var dLon = deg2rad(lng2-lng1);
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d;
}

const PhotoService = {
  getPhotoByLocation: async (lat, lng) => {
    const findResult = await Photo.find();

    return findResult.filter(el => (getDistanceFromLatLonInKm(lat, lng, el.location[0], el.location[1]) < 3));
  },
};

module.exports = PhotoService;
