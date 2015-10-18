var utils = require('./utils');
var _ = require('lodash');

module.exports = function(scope){
	var self = {};

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

		var particles = scope.game.add.group();

		for(var i=0;i<options.qnt;i++) sparks.push(particles.add(scope.game.add.sprite(0,0,'spark')));

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
		return particles;
	}

	// var ax = 99;
	// setInterval(function(){
	// 	ax++;
	// },200);

	// self.fireWeapon = function(xStart:Number, yStart:Number, xEnd:Number, yEnd:Number){
	self.line = function(options){
		var defaults = {
			target:{x:0,y:0},
			start:{x:0,y:0},
			width:1,
			alpha:75,
			duration:0.25,
			frequency:15,
			offset:15,
			branches:3,
			size:70,
			fps:24,
			tint:null
		};

		options = utils.extend({},defaults,options);
		// console.log(options)

		// effectHolder.onEnterFrame = function(){
		var graphics = scope.game.add.graphics(options.start.x, options.start.y);

		// var frames = function(){
		// graphics.clear();


		var distance = Number(Math.sqrt(Math.pow(options.target.x,2)+Math.pow(options.target.y,2)).toFixed(2));
		// console.log(distance)

		var steps = distance/options.frequency;

		var angle = Math.atan2(options.target.y, options.target.x);
		var pixels = distance/steps;

		// var initPos = {
		// 	x:spell.x+d*Math.sin((a-(ax*(Math.PI/180)))+(Math.PI/2)),
		// 	y:spell.y-d*Math.cos((a-(ax*(Math.PI/180)))+(Math.PI/2))
		// }

		var make = function(){
			graphics.clear();
			graphics.lineStyle(options.width, options.tint, options.alpha/100);
			for (var j=0;j<options.branches;j++){
				// graphics.moveTo(options.start.x,options.start.y);
				// graphics.moveTo(options.start.x,options.start.y);
				graphics.moveTo(0,0);

				for (var i=1;i<(steps+1);i++){
					var currentPos = pixels*i;

					var randomOffset = utils.rand(0,options.offset-(options.offset/2));

					graphics.lineTo(
						Math.cos(angle)*currentPos+Math.cos(angle+1.55)*randomOffset,
						Math.sin(angle)*currentPos+Math.sin(angle+1.55)*randomOffset
					);
				}
			}
		}

		make();
		if(options.fps) var frames = setInterval(make,1000/options.fps);


		setTimeout(function(){
			if(options.fps) clearInterval(frames);
			graphics.destroy();
		},options.duration*1000);
		return graphics;
	}

	return self;
}
