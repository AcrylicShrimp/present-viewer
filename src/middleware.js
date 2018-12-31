
'use strict';

const path = require('path');

const compression  = require('compression');
const helmet       = require('helmet');
const serverStatic = require('serve-static');

module.exports = [
	helmet(),
	compression(),
	serverStatic(path.resolve(__dirname, '..', 'static'), { index: 'index.html' })
];