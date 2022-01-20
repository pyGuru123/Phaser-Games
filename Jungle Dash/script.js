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
var level = 1;
var gameover = false;

function preload() {
	this.load.image('bg', 'assets/BG1.png');
	this.load.image('sun', 'assets/sun.png');
	this.load.image('fire1', 'tiles/15.png');
	this.load.image('fire2', 'tiles/16.png');
	this.load.image('water1', 'tiles/19.png');
	this.load.image('water2', 'tiles/20.png');
	this.load.spritesheet('dude' ,'assets/player.png', {
		frameWidth: 32, frameHeight: 48
	})

	for (let i=0; i<13; i++) {
		// loading platforms
		this.load.image(`tile${i+1}`, `tiles/${i+1}.png`);
	}

	for (let i=0; i<4; i++) {
		// loading diamonds
		this.load.image(`d${i+1}`, `assets/d${i+1}.png`);
	}

	// this.load.json('levels', 'https://raw.githubusercontent.com/pyGuru123/Phaser-Games/main/Jungle%20Dash/levels/level1_data.json')
	this.load.json('levels', 'levels/level.json')
}

function create() {
	// draw background
	this.add.image(0, 0, 'bg').setOrigin(0);
	this.add.image(100, 120, 'sun');

	// draw grid
	for (let i=0; i<ROWS; i++) {
		this.add.line(0, 0, 0, TILESIZE*i, WIDTH, TILESIZE*i, 0x1a65ac).setOrigin(0);
	}
	for (let j=0; j<COLS; j++) {
		this.add.line(0, 0, TILESIZE*j, 0, TILESIZE*j, HEIGHT, 0x1a65ac).setOrigin(0);
	}

	// keypress Events
	cursor = this.input.keyboard.createCursorKeys();

	// create groups
	platforms = this.physics.add.staticGroup();
	diamonds = this.physics.add.staticGroup();
	firewater = this.physics.add.staticGroup();

	// loading levels
	var levels = this.cache.json.get('levels');
	loadLevelSetup(levels, level);

	// creating player
	player = this.physics.add.sprite(100, 300, 'dude');
	player.body.setGravityY(300);
	player.setBounce(0.2);
	player.setCollideWorldBounds(true);

	// player animations
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'turn',
        frames: [{key: 'dude', frame: 4}],
        frameRate: 20
    })

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1
    })

	// Collision Detection
	this.physics.add.collider(player, platforms);
	this.physics.add.collider(player, diamonds, collectDiamonds, null, this);
	this.physics.add.collider(player, firewater, gameOver, null, this);


	// draw border
	var rect = this.add.rectangle(0, 0, WIDTH, HEIGHT).setOrigin(0);
	rect.setStrokeStyle(4, 0x1a65ac)
}

function update() {
	if (!gameover) {
		if (cursor.left.isDown) {
			player.setVelocityX(-100);
			player.anims.play('left', true);
		}
		else if (cursor.right.isDown) {
			player.setVelocityX(100);
			player.anims.play('right', true);
		}
		else {
			player.setVelocityX(0);
			player.anims.play('turn', true);
		}

		if (cursor.up.isDown && player.body.touching.down) {
			player.setVelocityY(-300)
		}
	}

}

function loadLevelSetup(levels, level) {
	level_data = levels[level];
	for (let i=0; i<level_data.length; i++) {
		for (let j=0; j<level_data[0].length; j++) {
			data = level_data[i][j];
			if (data && data <= 13) {
				platforms.create(TILESIZE*(j+1)-24, TILESIZE*(i+1)-24,
								`tile${data}`).setScale(0.4).refreshBody();
			}

			if (data && data == 17) {
				diamonds.create(TILESIZE*(j+1)-24, TILESIZE*(i+1)-24,
								`d${randint(1, 4)}`).setScale(0.4).refreshBody();

			}

			if (data == 15 || data == 16) {
				[x, y] = getPos(i, j);
				firewater.create(x, y,`fire${data-14}`).setScale(0.4).refreshBody();
			}

			if (data == 19 || data == 20) {
				offy = data == 19 ? 10 : 0;
				[x, y] = getPos(i, j, 0, offy);
				firewater.create(x, y,`water${data-18}`).setScale(0.4).refreshBody();
			}
		}
	}
}

function getPos(i, j, offsetx=0, offsety=0) {
	return [TILESIZE*(j+1)-24+offsetx, TILESIZE*(i+1)-24+offsety];
}

function collectDiamonds(player, diamond){
	diamond.disableBody(true, true);
}

function gameOver(player, tile) {
	player.setTint(0xff0000);
	// this.physics.pause();
	gameover = true;
}

function randint(a, b) {
	return Math.floor(Math.random() * b + a);
}