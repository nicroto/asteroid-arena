'use strict';

function State() {}

State.prototype = {

	Phaser: null,
	game: null,
	cursors: null,

	collisionHandler: null,

	player: null,
	asteroidManager: null

};

module.exports = State;