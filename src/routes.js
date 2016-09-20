'use strict';
const IndexController = require('./controllers/index_controller');
const ReportsController = require('./controllers/reports_controller');

const Routes = {
  init: function(app){
    app.get('/',IndexController.index)
    // reports
    app.post('/reports',ReportsController.create);
    app.get('/reports',ReportsController.index);

  }
};

module.exports = Routes;