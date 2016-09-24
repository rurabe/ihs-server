'use strict';
const Squel = require('squel').useFlavour('postgres');

const DB = require('../db');

class Report {
  static create(params){
    params = params || {};
    const q = Squel.insert().into('reports').setFields(params).returning('*');
    return DB.query(q.toParam());
  }

  static fetch(criteria){
    criteria = criteria || {};
    let q = Squel.select().from('reports').order('created_at',false); // false makes it sort desc
    if(criteria.from){ q = q.where('created_at > ?',new Date(criteria.from).toISOString()) }
    return DB.query(q.toParam());
  }
};

module.exports = Report;