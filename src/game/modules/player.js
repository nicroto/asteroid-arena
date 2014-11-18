'use strict';

var utils = require("./utils");

function Player() {}

Player.prototype = {

	Phaser: null,
	game: null,

	sprite: null,
	bullets: null,
	cursors: null,
	bullet: null,
	bulletTime: 0,

	preload: function(Phaser, game) {
		var self = this;

		self.Phaser = Phaser;
		self.game = game;

		game.load.image( 'bullet', 'assets/bullets.png' );
		game.load.image( 'ship', 'assets/ship.png' );
	},

	create: function() {
		var self = this,
			Phaser = self.Phaser,
			game = self.game;

		//  bullets
		var bullets = game.add.group();
		bullets.enableBody = true;
		bullets.physicsBodyType = Phaser.Physics.ARCADE;
		bullets.createMultiple( 40, 'bullet' );
		bullets.setAll( 'anchor.x', 0.5 );
		bullets.setAll( 'anchor.y', 0.5 );

		//  ship
		var sprite = game.add.sprite( 300, 300, 'ship' );
		sprite.anchor.set( 0.5 );
		game.physics.enable( sprite, Phaser.Physics.ARCADE );
		sprite.body.drag.set( 100 );
		sprite.body.maxVelocity.set( 200 );

		self.bullets = bullets;
		self.sprite = sprite;
	},

	update: function(cursors) {
		var self = this,
			game = self.game,
			Phaser = self.Phaser,
			sprite = self.sprite;

		if ( cursors.up.isDown )
		{
			game.physics.arcade.accelerationFromRotation( sprite.rotation, 200, sprite.body.acceleration );
		}
		else
		{
			sprite.body.acceleration.set( 0 );
		}

		if ( cursors.left.isDown )
		{
			sprite.body.angularVelocity = -300;
		}
		else if ( cursors.right.isDown )
		{
			sprite.body.angularVelocity = 300;
		}
		else
		{
			sprite.body.angularVelocity = 0;
		}

		if ( game.input.keyboard.isDown( Phaser.Keyboard.SPACEBAR ) )
		{
			self._fireBullet();
		}

		utils.screenWrap( sprite, game );
	},

	render: function() {

	},

	_fireBullet: function() {
		var self = this,
			game = self.game,
			sprite = self.sprite,
			bulletTime = self.bulletTime,
			bullets = self.bullets;

		if ( game.time.now > bulletTime )
		{
			var bullet = bullets.getFirstExists( false );

			if ( bullet )
			{
				bullet.reset( sprite.body.x + 16, sprite.body.y + 16 );
				bullet.lifespan = 2000;
				bullet.rotation = sprite.rotation;
				game.physics.arcade.velocityFromRotation( sprite.rotation, 400, bullet.body.velocity );
				self.bulletTime = game.time.now + 50;
			}
			self.bullet = bullet;
		}
	}

};

module.exports = Player;