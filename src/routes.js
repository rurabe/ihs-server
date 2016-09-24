'use strict';
const IndexController = require('./controllers/index_controller');
const ReportsController = require('./controllers/reports_controller');
const VolunteersController = require('./controllers/volunteers_controller');

const Routes = {
  init: function(app){
    app.get('/',IndexController.index)
    // reports
    app.post('/reports',ReportsController.create);
    app.get('/reports',ReportsController.index);

    app.post('/volunteers',VolunteersController.create);
    app.get('/volunteers',VolunteersController.index);

  }
};

module.exports = Routes;