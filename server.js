'use strict';

require('dotenv').load();

const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const pug = require('pug');

const Routes = require('./src/routes');

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use('/assets',express.static('public'));
app.set('views', './src/html');
app.set('view engine', 'pug');

Routes.init(app);

http.listen(app.get('port'),function(){
  console.log("Server up on",app.get('port'),"in",process.env.NODE_ENV);
});