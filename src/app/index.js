'use strict';

require('./modules/stats')();
var utils = require('./modules/utils');
var _ = require('lodash');
var Phaser = require('phaser');

var stage = {};
var scope = {
	fps:60
};
var options = {
	width:500,
	height:400,
	where:'wizz-canvas'
}

var game = scope.game = new Phaser.Game(options.width, options.height, Phaser.AUTO, options.where, options.where);


var effects = require('./modules/effects')(scope);

var assets = {
	images:{
		spark:'images/spark.svg'
	}
}




scope.game.state.add('game', {
	preload:function preload(){
		game.stage.backgroundColor = '#fff';
		utils.loadAssets(game,assets);
	},
	create:function create(){
		// stage.test = game.add.sprite(100,100,'spark');
		// console.log(stage.test)
		// stage.test.tint = ;
		// stage.test.width = 10;
		// stage.test.height = 10;

		game.input.onUp.add(function(){
			console.log('x')
			effects.particles({
				target:{x:game.input.x,y:game.input.y},
				tint:'0xFF0000'
			});
		});
	},
	update:function update(){
	}
});


game.state.start('game');
