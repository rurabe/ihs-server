'use strict';
const Squel = require('squel').useFlavour('postgres');

const DB = require('../db');

class Report {
  static create(params){
    const q = Squel.insert().into('reports').setFields(params).returning('*');
    return DB.query(q.toParam());
  }

  static fetch(criteria){
    const q = Squel.select().from('reports').order('created_at',false);
    return DB.query(q.toParam());
  }
};

module.exports = Report;