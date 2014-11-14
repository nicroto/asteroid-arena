'use strict';

var pathUtils = require('path'),
	express = require("express"),
	bodyParser = require("body-parser"),
	app = express();

app.use( bodyParser.json() );

app.use( express.static( pathUtils.resolve( __dirname, "client" ) ) );

app.listen( process.env.PORT || 5000 );