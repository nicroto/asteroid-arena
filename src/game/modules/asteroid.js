'use strict';

var utils = require("./utils");

function Asteroid(Phaser, game, index) {
	var self = this,
		x = game.world.randomX,
		y = game.world.randomY;

	self.game = game;
	self.Phaser = Phaser;

	var sprite = game.add.sprite( x, y, 'asteroid1', 'asteroidsGroup' );

	sprite.anchor.set( 0.5 );

	// to be able to find the Asteroid object having just the sprite (and the asteroids array)
	sprite.name = index.toString();
	game.physics.enable( sprite, Phaser.Physics.ARCADE );
	sprite.body.immovable = false;
	sprite.body.collideWorldBounds = false;

	sprite.angle = game.rnd.angle();

	game.physics.arcade.velocityFromRotation( sprite.rotation, 100, sprite.body.velocity );

	self.sprite = sprite;
}

Asteroid.prototype = {

	game: null,
	Phaser: null,
	health: 3,
	alive: true,
	impactDamage: 1,

	sprite: null,

	damage: function() {
		this.health -= 1;

		if (this.health <= 0)
		{
			this.alive = false;
			this.sprite.kill();
			return true;
		}

		return false;
	},

	update: function() {
		var self = this,
			game = self.game,
			sprite = self.sprite;

		utils.screenWrap( sprite, game );
	}

};

module.exports = Asteroid;