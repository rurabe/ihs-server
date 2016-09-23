'use strict';

const activeIdReducer = function(state=null,action){
  switch(action.type) {
    case 'activeId.selectId':
      return action.id;
    default:
      return state;
  }
};

module.exports = activeIdReducer;
