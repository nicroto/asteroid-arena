'use strict';

module.exports = function(state) {

	return function() {
		var game = state.game,
			Phaser = state.Phaser;

		//  This will run in Canvas mode, so let's gain a little speed and display
		game.renderer.clearBeforeRender = false;
		game.renderer.roundPixels = true;

		game.physics.startSystem( Phaser.Physics.ARCADE );

		//  background
		game.add.tileSprite( 0, 0, game.width, game.height, 'space' );

		//  Game input
		state.cursors = game.input.keyboard.createCursorKeys();
		game.input.keyboard.addKeyCapture( [ Phaser.Keyboard.SPACEBAR ] );

		// create all objects up the tree
		state.player.create();
		state.asteroidManager.create();
	};

};