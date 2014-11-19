'use strict';

var utils = {

	screenWrap: function(sprite, game) {
		if ( sprite.x < 0 )
		{
			sprite.x = game.width;
		}
		else if ( sprite.x > game.width )
		{
			sprite.x = 0;
		}

		if ( sprite.y < 0 )
		{
			sprite.y = game.height;
		}
		else if ( sprite.y > game.height )
		{
			sprite.y = 0;
		}
	},

	rgbToHex: function (r, g, b) {
		return "0x" + ( ( 1 << 24 ) + ( r << 16 ) + ( g << 8 ) + b ).toString( 16 ).slice( 1 );
	}

};

module.exports = utils;