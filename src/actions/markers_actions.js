'use strict';

const MarkersActions = {
  saveRef: function(id, marker) {
    return Object.assign({type: 'markers.saveRef'}, {id, marker});
  }
};

module.exports = MarkersActions;
