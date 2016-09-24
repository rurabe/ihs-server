'use strict';

const ActiveIdActions = {
  selectId: function(id) {
    return {type: 'activeId.selectId', id};
  }
};

module.exports = ActiveIdActions;
