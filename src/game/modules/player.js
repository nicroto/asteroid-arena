'use strict';

var utils = require("./utils"),
	CONST = require("./const");

function Player() {}

Player.prototype = {

	Phaser: null,
	game: null,

	sprite: null,
	shipSprite: null,
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

		// ship
		var mainSprite = game.add.sprite( 300, 300, null );
		game.physics.enable( mainSprite, Phaser.Physics.ARCADE );
		mainSprite.anchor.setTo( 0.5 );
		mainSprite.body.setSize( 10, 10, 0, 0 );
		mainSprite.body.drag.set( 100 );
		mainSprite.body.maxVelocity.set( CONST.PLAYER_MAX_VELOCITY );

		var shipSprite = game.add.sprite( 0, 0, 'ship' );
		game.physics.enable( shipSprite, Phaser.Physics.ARCADE );
		shipSprite.anchor.setTo( 0.5 );

		mainSprite.addChild( shipSprite );

		self.bullets = bullets;
		self.sprite = mainSprite;
		self.shipSprite = shipSprite;
	},

	update: function(cursors) {
		var self = this,
			game = self.game,
			Phaser = self.Phaser,
			sprite = self.sprite;

		if ( cursors.up.isDown )
		{
			game.physics.arcade.accelerationFromRotation( sprite.rotation, CONST.PLAYER_ACCELERATION, sprite.body.acceleration );
		}
		else
		{
			sprite.body.acceleration.set( 0 );
		}

		if ( cursors.left.isDown )
		{
			sprite.body.angularVelocity = CONST.PLAYER_ANGULAR_VELOCITY_LEFT;
		}
		else if ( cursors.right.isDown )
		{
			sprite.body.angularVelocity = CONST.PLAYER_ANGULAR_VELOCITY_RIGHT;
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
			shipSprite = self.shipSprite,
			mainSprite = self.sprite,
			bulletTime = self.bulletTime,
			bullets = self.bullets;

		if ( game.time.now > bulletTime )
		{
			var bullet = bullets.getFirstExists( false );

			if ( bullet )
			{
				bullet.reset( shipSprite.body.x + 16, shipSprite.body.y + 16 );
				bullet.lifespan = CONST.PLAYER_BULLET_LIFESPAN;
				bullet.rotation = mainSprite.rotation;
				game.physics.arcade.velocityFromRotation( mainSprite.rotation, 400, bullet.body.velocity );
				self.bulletTime = game.time.now + 50;
			}
			self.bullet = bullet;
		}
	}

};

module.exports = Player;