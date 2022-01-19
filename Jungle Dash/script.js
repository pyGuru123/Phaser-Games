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

	for (let i=0; i<13; i++) {
		image = this.load.image(`tile${i+1}`, `tiles/${i+1}.png`);
	}

	var level = this.load.json('levels', 'https://raw.githubusercontent.com/pyGuru123/Phaser-Games/main/Jungle%20Dash/levels/level1_data.json')
}

function create() {
	// draw background
	bg = this.add.image(0, 0, 'bg').setOrigin(0);

	// draw border
	var rect = this.add.rectangle(0, 0, WIDTH, HEIGHT).setOrigin(0);
	rect.setStrokeStyle(4, 0x1a65ac)

	// draw grid
	for (let i=0; i<ROWS; i++) {
		this.add.line(0, 0, 0, TILESIZE*i, WIDTH, TILESIZE*i, 0x1a65ac).setOrigin(0);
	}
	for (let j=0; j<COLS; j++) {
		this.add.line(0, 0, TILESIZE*j, 0, TILESIZE*j, HEIGHT, 0x1a65ac).setOrigin(0);
	}

	// create groups
	platforms = this.physics.add.staticGroup();

	// loading levels
	var levels = this.cache.json.get('levels')
	for (let i=0; i<levels.length; i++) {
		for (let j=0; j<levels[0].length; j++) {
			data = levels[i][j];
			if (data && data <= 13) {
				platforms.create(TILESIZE*(j+1)-24, TILESIZE*(i+1)-24, `tile${data}`).setScale(0.4);
			}
		}
	}
}

function update() {

}

function drawGrid() {

}