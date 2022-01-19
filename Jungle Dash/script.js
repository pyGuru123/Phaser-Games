const WIDTH=800, HEIGHT=600;

var config = {
	type: Phaser.AUTO,
	width: WIDTH,
	height: HEIGHT,
	physics: {
		default: 'arcade',
		arcade: {
			gravity : {y:300},
			debug: false
		}
	},
	scene: {
		preload: preload,
		create: create,
		update:update
	}
}

function preload() {

}

function create() {

}

function update() {
	
}