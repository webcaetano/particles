var utils = require('./utils');
var _ = require('lodash');

module.exports = function(scope){
	var self = {};

	// self.particles = function(options.targetX, options.targetY, options.sparkNumber, options.distance, optiions.sparkSize){
	self.particles = function(options){
		var defaults = {
			target:{x:0,y:0},
			qnt:5,
			distance:10,
			maxsize:10,
			alpha:75,
			minsize:2.5,
			rotation:true,
			duration:0.25,
			tint:null,
			init:function(){
				this.a = 0.1;
				this.vel = 2;
			},
			update:function(){
				this.scale.x += 0.001;
				this.scale.y += 0.001;
				this.alpha -= 0.025;
			}
		};

		options = utils.extend({},defaults,options);

		var sparks = [];

		for(var i=0;i<options.qnt;i++) sparks.push(scope.game.add.sprite(0,0,'spark'));

		_.each(sparks,function(spark){
			spark.x = options.target.x+utils.rand(0,options.distance)-(options.distance/2);
			spark.y = options.target.y+utils.rand(0,options.distance)-(options.distance/2);
			var tmpRand = utils.rand(options.minsize,options.maxsize)/100;
			spark.scale.setTo(tmpRand,tmpRand);
			if(!!options.rotation) spark.rotation = utils.rand(0,359);
			spark.alpha = options.alpha/100;

			if(options.tint) spark.tint = options.tint;


			if(options.init) options.init.bind(spark)();
			if(options.update) spark.update = options.update.bind(spark);
			var frames = setInterval(function() {
				if(options.update) spark.update();
			},1000/scope.fps);

			setTimeout(function(){
				clearInterval(frames);
				spark.destroy();
				sparks.slice(sparks.indexOf(spark),1);
			},options.duration*1000)
		})
	}

	return self;
}
