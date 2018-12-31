
'use strict';

const express = require('express');

const middleware  = require('./middleware');
const router      = require('./router');
const application = express();

application.use(middleware);
application.use(router);
application.use((req, res, next) => {
	res.status(404).end();
});
application.use((err, req, res, next) => {
	res.status(500).end();
});

module.exports = application;