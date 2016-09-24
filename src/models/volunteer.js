'use strict';
const Squel = require('squel').useFlavour('postgres');

const DB = require('../db');

class Volunteer {
  static create(params){
    params = params || {};
    const q = Squel.insert().into('volunteers').setFields(params).returning('*');
    return DB.query(q.toParam());
  }

  static fetch(criteria){
    criteria = criteria || {};
    let q = Squel.select().from('volunteers').order('created_at',false); // false makes it sort desc
    if(criteria.from){ q = q.where('created_at > ?',new Date(criteria.from).toISOString()) }
    return DB.query(q.toParam());
  }
};

module.exports = Volunteer;