'use strict';
const Promise = require('bluebird');
const request = require('superagent');

const GeoJsonHelpers = require('../helpers/geo_json_helpers');

const ReportsActions = {
  index: function(params={}){
    return new Promise((resolve,reject) => {
      request.get('/reports').query(params).end((err,res) => {
        if(err){ reject(err); }
        else { 
          const geojson = JSON.parse(res.text);
          const reports = GeoJsonHelpers.keyFeatures(geojson);
          resolve({type: 'reports.merge', reports: reports }); 
        }
      });
    });
  }
};

module.exports = ReportsActions;