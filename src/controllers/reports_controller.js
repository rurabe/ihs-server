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
    res.status(500).json(JSON.stringify(e));
  };
};

const ReportsController = {
  create: function(req,res){
    Report.create(req.body).then(_handle(res)).catch(_errors(res));
  },
  index: function(req,res){
    Report.fetch(req.query).then(_handle(res)).catch(_errors(res));
  },
};

module.exports = ReportsController;