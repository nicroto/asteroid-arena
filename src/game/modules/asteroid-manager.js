'use strict';

var utils = require("./utils"),
	Asteroid = require("./asteroid");

function AsteroidsManager() {
	var self = this;

	self.asteroids = [];
}

AsteroidsManager.prototype = {

	asteroids: null,

	preload: function(Phaser, game) {
		var self = this;

		self.Phaser = Phaser;
		self.game = game;

		game.load.image( 'asteroid1', 'assets/asteroid1.png' );
		game.load.image( 'asteroid2', 'assets/asteroid2.png' );
		game.load.image( 'asteroid3', 'assets/asteroid3.png' );
	},

	create: function() {
		var self = this,
			Phaser = self.Phaser,
			game = self.game;

		//  asteroids
		var asteroids = self.asteroids;
		for ( var i = 0; i < 15; i++ ) {
			var asteroid = new Asteroid( Phaser, game, i );
			asteroids.push( asteroid );
		}
	},

	update: function(cursors) {
		var self = this,
			game = self.game,
			asteroids = self.asteroids;

		for ( var i = 0; i < asteroids.length; i++ ) {
			var asteroid = asteroids[ i ];
			if ( asteroid.alive ) {
				utils.screenWrap( asteroid.sprite, game );
			}
		}
	},

	render: function() {

	}

};

module.exports = AsteroidsManager;