'use strict';

const markersReducer = function(state={},action){
  switch(action.type) {
    case 'markers.saveRef':
      return Object.assign(state, {[action.id]: action.marker})
    default:
      return state;
  }
};

module.exports = markersReducer;
