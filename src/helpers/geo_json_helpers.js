'use strict';
const _ = require('lodash');

const GeoJsonHelpers = {
  encode: function(objects){
    const features = objects.map(r => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [r.longitude,r.latitude],
        },
        properties: _.omit(r,['longitude','latitude'])
      }
    });
    return { type: 'FeatureCollection', features: features };
  }
};

module.exports = GeoJsonHelpers;