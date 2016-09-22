'use strict';

const DateTimeHelpers = {
  formatDate: function(dateTime){
    return (dateTime
      .toDateString()
      .slice(4)
    );
  },
  formatTime: function(dateTime){
    return (dateTime
      .toLocaleTimeString()
      .replace(/:\d\d /, ' ')
    );
  }
};

module.exports = DateTimeHelpers;
