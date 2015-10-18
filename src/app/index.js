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
		spark:'images/spark.svg',
		pointer_bkg:'images/pointer_bkg.png',
		pointer_top:'images/pointer_top.png'
	}
}


scope.game.state.add('game', {
	preload:function preload(){
		game.stage.backgroundColor = '#fff';
		utils.loadAssets(game,assets);
	},
	create:function create(){
		stage.backSide = game.add.group();
		stage.pointer = game.add.group();
		stage.pointer.bkg = stage.pointer.add(game.add.sprite(0,0,'pointer_bkg'));
		stage.pointer.top = stage.pointer.add(game.add.sprite(0,0,'pointer_top'));
		stage.pointer.x = options.width/2;
		stage.pointer.y = options.height/2;
		stage.pointer.top.pivot.x = stage.pointer.bkg.pivot.x = stage.pointer.pivot.x+(stage.pointer.width/2);
		stage.pointer.top.pivot.y = stage.pointer.bkg.pivot.y = stage.pointer.pivot.y+(stage.pointer.height/2);
		var ax = 180;
		stage.pointer.frames = setInterval(function(){
			stage.pointer.bkg.angle = -Math.atan2(stage.pointer.x-game.input.x, stage.pointer.y-game.input.y)*(180/Math.PI);
		},1000/scope.fps)

		game.input.onUp.add(function(){
			var particles = effects.particles({
				target:{x:game.input.x,y:game.input.y},
				tint:'0xFF0000'
			});

			var lines = effects.line({
				target:{x:game.input.x-(options.width/2),y:game.input.y-(options.height/2)},
				start:{x:options.width/2,y:options.height/2},
				tint:'0xFF0000'
			});

			stage.backSide.add(lines);
			stage.backSide.add(particles);
		});
	},
	update:function update(){
	}
});


game.state.start('game');
