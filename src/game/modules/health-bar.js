'use strict';

var utils = require("./utils");

function HealthBar(totalHits, widthInPixels) {
	var self = this;

	self.totalHits = self.hitsLeft = totalHits;
	self.widthInPixels = widthInPixels;
}

HealthBar.prototype = {

	Phaser: null,
	game: null,

	group: null,
	bar: null,

	totalHits: 0,
	hitsLeft: 0,
	widthInPixels: 0,

	preload: function(Phaser, game) {
		var self = this;

		self.Phaser = Phaser;
		self.game = game;
	},

	create: function() {
		var self = this,
			game = self.game,
			group = game.add.group(),
			bar = game.add.graphics( 0, 0 );

		group.add( bar );

		self.group = group;
		self.bar = bar;
	},

	update: function(lastHit) {
		var self = this,
			health = self.hitsLeft - lastHit;

		self.hitsLeft = health > 0 ? health : 0;

		var totalHits = self.totalHits,
			hitsLeft = self.hitsLeft,
			bar = self.bar,
			hitRatio = hitsLeft / totalHits,
			x = hitRatio * 100,
			red = ( x > 50 ? 1 - 2 * ( x - 50 ) / 100.0 : 1.0 ) * 255,
			green = ( x > 50 ? 1.0 : 2*x / 100.0) * 255,
			blue = 0,
			colour = utils.rgbToHex( red, green, blue ),
			fillWidth = self.widthInPixels * hitRatio;

		console.log( "health: " + fillWidth + "/" + self.widthInPixels );

		bar.clear();
		bar.beginFill( colour );
		bar.lineStyle( 5, colour, 1 );
		bar.moveTo( 20, 10 );
		bar.lineTo( fillWidth, 10 );
		bar.endFill();
	}

};

module.exports = HealthBar;