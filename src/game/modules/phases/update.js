'use strict';

module.exports = function(state) {

	return function() {
		var cursors = state.cursors;

		// propagate update
		state.player.update( cursors );
		state.asteroidManager.update( cursors );
		state.collisionHandler.update( state.asteroidManager.asteroids, state.player );
	};

};