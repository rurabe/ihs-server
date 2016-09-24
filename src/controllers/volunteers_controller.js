'use strict';

const Volunteer = require('../models/volunteer');

const _handle = function(res){
  return function(volunteers){
    res.json(volunteers);
  };
};

const _errors = function(res){
  return function(e){
    console.log("error",e)
    res.status(500).json(JSON.stringify(e));
  };
};

const VolunteersController = {
  create: function(req,res){
    console.log("Volunteers#create",req.body)
    Volunteer.create(req.body).then(_handle(res)).catch(_errors(res));
  },
  index: function(req,res){
    console.log("Volunteers#index",req.query)
    Volunteer.fetch(req.query).then(_handle(res)).catch(_errors(res));
  },
};

module.exports = VolunteersController;