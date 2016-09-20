'use strict';
const _ = require('lodash');

const GeoJsonHelpers = {
  encode: function(objects){
    const features = objects.map(r => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [r.latitude,r.longitude],
        },
        properties: _.omit(r,['longitude','latitude'])
      }
    });
    return { type: 'FeatureCollection', features: features };
  },
  keyFeatures: function(geojson){
    return _.keyBy(geojson.features,f => f.properties.id )
  }
};

module.exports = GeoJsonHelpers;