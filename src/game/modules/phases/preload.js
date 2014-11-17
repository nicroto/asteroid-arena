'use strict';

module.exports = function(state) {

	return function() {
		var Phaser = state.Phaser,
			game = state.game;

		game.load.image( 'space', 'assets/deep-space.jpg' );

		state.collisionHandler.preload( Phaser, game );
		state.player.preload( Phaser, game );
		state.asteroidManager.preload( Phaser, game );
	};

}