'use strict';

const Report = require('../models/report');
const GeoJsonHelpers = require('../helpers/geo_json_helpers');

const _handle = function(res){
  return function(reports){
    res.json(GeoJsonHelpers.encode(reports));
  };
};

const _errors = function(res){
  return function(e){
    console.log("error",e)
    res.status(500).json(JSON.stringify(e));
  };
};

const ReportsController = {
  create: function(req,res){
    console.log("Reports#create",req.body)
    Report.create(req.body).then(_handle(res)).catch(_errors(res));
  },
  index: function(req,res){
    console.log("Reports#index",req.query)
    Report.fetch(req.query).then(_handle(res)).catch(_errors(res));
  },
};

module.exports = ReportsController;