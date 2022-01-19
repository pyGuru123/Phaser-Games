const WIDTH=864, HEIGHT=576;
const TILESIZE = 48;
const ROWS = HEIGHT / TILESIZE;
const COLS = WIDTH / TILESIZE; 

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

var game = new Phaser.Game(config);

function preload() {
	this.load.image('bg', 'assets/BG1.png');

	for (let i=0; i<9; i++) {
		image = this.load.image(`tile${i+1}`, `tiles/${i+1}.png`);
	}
}

function create() {
	bg = this.add.image(0, 0, 'bg').setOrigin(0);

	var rect = this.add.rectangle(0, 0, WIDTH, HEIGHT).setOrigin(0);
	rect.setStrokeStyle(4, 0x1a65ac)

	for (let i=0; i<ROWS; i++) {
		this.add.line(0, 0, 0, TILESIZE*i, WIDTH, TILESIZE*i, 0x1a65ac).setOrigin(0);
	}
	for (let j=0; j<COLS; j++) {
		this.add.line(0, 0, TILESIZE*j, 0, TILESIZE*j, HEIGHT, 0x1a65ac).setOrigin(0);
	}

	platforms = this.physics.add.staticGroup();
	platforms.create(TILESIZE/2, TILESIZE*10-24, 'tile2').setScale(0.4);
	platforms.create(TILESIZE*2-24, TILESIZE*10-24, 'tile2').setScale(0.4);
	platforms.create(TILESIZE*3-24, TILESIZE*10-24, 'tile3').setScale(0.4);
	platforms.create(TILESIZE*3-24, TILESIZE*11-24, 'tile9').setScale(0.4);
	platforms.create(TILESIZE*3-24, TILESIZE*12-24, 'tile9').setScale(0.4);
	platforms.create(TILESIZE/2, TILESIZE*11-24, 'tile7').setScale(0.4);
	platforms.create(TILESIZE/2, TILESIZE*12-24, 'tile7').setScale(0.4);
	platforms.create(TILESIZE*2-24, TILESIZE*11-24, 'tile7').setScale(0.4);
	platforms.create(TILESIZE*2-24, TILESIZE*12-24, 'tile7').setScale(0.4);
}

function update() {

}

function drawGrid() {

}