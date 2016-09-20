'use strict';
const Immutable = require('immutable');


const reportsReducer = function(state=Immutable.fromJS({}),action){
  switch(action.type) {
    case 'reports.merge':
      return state.mergeDeep(action.reports);
    default: 
      return state;
  }
};

module.exports = reportsReducer;