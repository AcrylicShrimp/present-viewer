
'use strict';

const http = require('http');

const application = require('./application');
const server      = http.createServer(application);

const port = process.env.PORT || 80;

server.listen(port, () => {
	console.log(`HTTP server is running on port ${port}.`);
});