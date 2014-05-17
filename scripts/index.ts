// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397705
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 

/// <reference path="../phaser/phaser.d.ts"/>

// and then run "window.location.reload()" in the JavaScript Console.
module AndroidGame
{
	"use strict";

	function toRadians(angle: number)
	{
		return angle * (Math.PI / 180);
	}

	class AndroidGame
	{
		constructor()
		{
			var width: number = screen.width;
			var height: number = screen.height;

			if (height > width)
			{
				height = [width, width = height][0];
			}

			this.game = new Phaser.Game(width, height, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });
			//this.game = new Phaser.Game(640, 360, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });
		}

		game: Phaser.Game;
		logo: Phaser.Sprite;
		backBMD: Phaser.BitmapData;
		startAngle: number;
		lastPixels: Array<Array<number>>;

		preload()
		{
			//this.game.load.image('logo', 'phaser/phaser.png');
		}

		create()
		{
			//this.logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
			//this.logo.anchor.setTo(0.5, 0.5);

			
			//this.backBMD.fill(255, 0, 0);
			//this.backBMD.setPixel
			//this.backBMD.strokeStyle('#fff');
			//this.backBMD.beginPath();
			//this.backBMD.moveTo(0, 0);
			//this.backBMD.lineTo(100, 100);
			//this.backBMD.add(new Phaser.Sprite(this.game, 50, 50, 'ball_blue'));

			this.backBMD = this.game.add.bitmapData(this.game.width, this.game.height);
			this.logo = this.game.add.sprite(0, 0, this.backBMD);

			this.startAngle = 0;

			this.lastPixels = new Array<Array<number>>();

			this.game.time.advancedTiming = true;
		}

		update()
		{
			//this.backBMD.fill(0, Math.floor(Math.random() * 255), 0);
			//for (var y = 0; y < this.backBMD.height; y++)
			//{
			//	for (var x = 0; x < this.backBMD.width; x++)
			//	{
			//		this.backBMD.setPixel32(x, y, 0, 0, 0, 0, false);
			//	}
			//}
			//this.backBMD.setPixel(5, 5, 255, 0, 0, true);
			//this.backBMD.context.beginPath();
			//this.backBMD.context.lineTo(100, 100);
			//this.backBMD.context.stroke();
			//this.backBMD.context.fillText("test", 0, 0);



			for (var i = 0; i < this.lastPixels.length; i++)
			{
				this.backBMD.setPixel(this.lastPixels[i][0], this.lastPixels[i][1], 0, 0, 0, false);
			}

			var centerHeight = this.game.height / 2;
			for (var currentAngle = this.startAngle, index = 0; currentAngle < 1000; currentAngle++, index++)
			{
				var angleRadians = toRadians(currentAngle);
				var offset = Math.floor(Math.sin(angleRadians) * 100);

				var x = index;
				var y = centerHeight + offset;
				this.backBMD.setPixel(x, y, 255, 0, 0, false);
				this.lastPixels[index] = [x, y];
			}

			this.lastPixels.length = index;

			this.backBMD.context.putImageData(this.backBMD.imageData, 0, 0);
			this.backBMD.dirty = true;

			this.startAngle += (this.game.time.elapsed / 1000) * 50;	
			if (this.startAngle > 360)
			{
				this.startAngle -= 360;
			}

			//console.log("fps: " + this.game.time.fps);
		}
	}

	export module Application
	{
		export function initialize()
		{
			document.addEventListener('deviceready', onDeviceReady, false);
		}

		function onDeviceReady()
		{
			// Handle the Cordova pause and resume events
			document.addEventListener('pause', onPause, false);
			document.addEventListener('resume', onResume, false);

			// TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
			new AndroidGame();
		}

		function onPause()
		{
			// TODO: This application has been suspended. Save application state here.
		}

		function onResume()
		{
			// TODO: This application has been reactivated. Restore application state here.
		}

	}

	window.onload = function ()
	{
		Application.initialize();
	}
}
