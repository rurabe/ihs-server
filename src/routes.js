'use strict';

const ReportsController = require('./controllers/reports_controller');

const Routes = {
  init: function(app){
    // reports
    app.post('/reports',ReportsController.create);
    app.get('/reports',ReportsController.index);

    app.get('/test',(req,res) => { res.json({test: 'ok'}) })
  }
};

module.exports = Routes;