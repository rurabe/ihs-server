'use strict';

const ReportsController = require('./controllers/reports_controller');

const Routes = {
  init: function(app){
    // reports
    app.post('/reports',ReportsController.create);
    app.get('/reports',ReportsController.index);
  }
};

module.exports = Routes;