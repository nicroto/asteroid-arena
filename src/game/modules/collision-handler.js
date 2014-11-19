'use strict';

function CollisionHandler() {}

CollisionHandler.prototype = {

	Phaser: null,
	game: null,

	preload: function(Phaser, game) {
		var self = this;

		self.Phaser = Phaser;
		self.game = game;
	},

	update: function(asteroids, player) {
		var self = this,
			game = self.game,
			bullets = player.bullets,
			playerSprite = player.sprite;

		var asteroidBulletOverlapHandler = function(asteroidSprite, bullet) {
			self._asteroidCollideWithSprite( asteroids[ asteroidSprite.name ], bullet );
		};
		var playerAsteroidOverlapHandler = function(playerSprite, asteroidSprite) {
			self._asteroidCollideWithPlayer( asteroids[ asteroidSprite.name ], player );
		};

		for ( var i = 0; i < asteroids.length; i++ ) {
			var asteroid = asteroids[ i ];
			if ( asteroid.alive ) {
				game.physics.arcade.overlap( bullets, asteroid.sprite, asteroidBulletOverlapHandler, null, self );
				if ( asteroid.alive ) {
					game.physics.arcade.overlap( playerSprite, asteroid.sprite, playerAsteroidOverlapHandler, null, self );
				}
			}
		}
	},

	_asteroidCollideWithSprite: function(asteroid, sprite) {
		var self = this;

		sprite.kill();
		self._damageAsteroid( asteroid );
	},

	_asteroidCollideWithPlayer: function(asteroid, player) {
		var self = this;

		player.receiveDamage( asteroid.impactDamage );
		self._damageAsteroid( asteroid );
	},

	_damageAsteroid: function(asteroid) {
		var destroyed = asteroid.damage();

		if ( destroyed )
		{
			// var explosionAnimation = explosions.getFirstExists(false);
			// explosionAnimation.reset(tank.x, tank.y);
			// explosionAnimation.play('kaboom', 30, false, true);
		}
	}

};

module.exports = CollisionHandler;