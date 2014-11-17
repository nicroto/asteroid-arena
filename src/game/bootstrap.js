'use strict';

var $ = require("jquery"),
	State = require("./modules/state"),
	CollisionHandler = require("./modules/collision-handler"),
	Player = require("./modules/player"),
	AsteroidManager = require("./modules/asteroid-manager"),
	state = new State(),
	collisionHandler = new CollisionHandler(),
	player = new Player(),
	asteroidManager = new AsteroidManager(),
	preload = require("./modules/phases/preload")( state ),
	create = require("./modules/phases/create")( state ),
	update = require("./modules/phases/update")( state ),
	render = require("./modules/phases/render")( state );

$( function() {

state.Phaser = Phaser;
state.collisionHandler = collisionHandler;
state.player = player;
state.asteroidManager = asteroidManager;

var game = state.game = new Phaser.Game(
	800,
	600,
	Phaser.CANVAS,
	'gameContainer',
	{
		preload: preload,
		create: create,
		update: update,
		render: render
	}
);

} );