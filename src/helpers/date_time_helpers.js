'use strict';

const DateTimeHelpers = {
  getDateKey: function(dateTime) {
    const padZero = (n => (n < 10 ? '0' : '') + n);
    const DD = padZero(dateTime.getDate());
    const MM = padZero(dateTime.getMonth());
    const YYYY = dateTime.getFullYear();
    return '' + YYYY + MM + DD;
  },
  formatDate: function(dateTime){
    const dt = dateTime
      .toDateString()
      .split(' ');
    return `${dt[1]} ${dt[2]}`;
  },
  formatWeekday: function(dateTime) {
    const weekdays = [
      'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'
    ];
    return weekdays[dateTime.getDay()];
  },
  formatTime: function(dateTime){
    return (dateTime
      .toLocaleTimeString()
      .replace(/:\d\d /, ' ')
    );
  }
};

module.exports = DateTimeHelpers;
