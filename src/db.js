'use strict';

const pg = require('pg');
const fs = require('fs');
const Promise = require('bluebird');
const config = JSON.parse(fs.readFileSync('./database.json',{encoding: 'utf-8'}))[process.env.NODE_ENV];

const DB = {
  query: function(preparedStatement){
    return new Promise(function(resolve,reject){
      pg.connect(config,function(err,client,done){
        client.query(preparedStatement,function(e,r){
          done();
          if(e){ console.log(e,preparedStatement); reject(e) }
          resolve(r.rows);
        });
      });
    });
  },
};

DB.query("select 1;").then(() => {
  console.log("Database connected");
}).catch(e => {
  console.log("Database failed to connect",e)
})

module.exports = DB;