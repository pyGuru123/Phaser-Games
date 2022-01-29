const WIDTH=864, HEIGHT=576;
const TILESIZE = 48;
const ROWS = HEIGHT / TILESIZE;
const COLS = WIDTH / TILESIZE;
const MAX_LEVEL = 6;

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
	this.load.image('tree', 'tiles/21.png');
	this.load.image('mushroom', 'tiles/22.png');
	this.load.image('bee', 'tiles/23.png');
	this.load.image('exit', 'tiles/24.png');
	this.load.image('movingp', 'assets/moving.png');
	this.load.image('flower', 'tiles/27.png');
	this.load.image('slime', 'tiles/29.png');
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

	this.load.json('levels', 'levels/level.json')
}

function create() {
	// draw background
	this.add.image(0, 0, 'bg').setOrigin(0);
	this.add.image(100, 120, 'sun');

	// draw grid
	// drawGrid(this);

	// keypress Events
	cursor = this.input.keyboard.createCursorKeys();

	// create groups
	platforms = this.physics.add.staticGroup();
	diamonds = this.physics.add.staticGroup();
	firewater = this.physics.add.staticGroup();
	greens = this.physics.add.staticGroup();
	exits = this.physics.add.staticGroup();
	bees = this.physics.add.group({allowGravity:false});
	slimes = this.physics.add.group({allowGravity:false});
	movingPlatforms = this.physics.add.group({allowGravity:false, immovable:true});

	// loading levels
	var levels = this.cache.json.get('levels');
	loadLevelSetup(levels, level, this);

	// creating player
	player = new Player({scene:this, x: 100, y:300});

	// Collision Detection
	this.physics.add.collider(player, platforms);
	this.physics.add.collider(player, firewater, gameOver, null, this);
	this.physics.add.collider(player, bees, gameOver, null, this);
	this.physics.add.collider(player, slimes, gameOver, null, this);
	this.physics.add.collider(player, movingPlatforms, collisionMovingPlatform, null, this);
	this.physics.add.overlap(player, diamonds, collectDiamonds, null, this);
	this.physics.add.overlap(player, exits, gameWon, null, this);

	// Text Objects
	levelText = this.add.text(WIDTH-200, 20, `Level : ${level}`, {fontSize:'32px', fill:'#000'})

	// draw border
	var rect = this.add.rectangle(0, 0, WIDTH, HEIGHT).setOrigin(0);
	rect.setStrokeStyle(4, 0x1a65ac)
}

function update() {
	if (!gameover) {
		if (cursor.left.isDown) {
			player.body.setVelocityX(-100);
			player.anims.play('left', true);
		}
		else if (cursor.right.isDown) {
			player.body.setVelocityX(100);
			player.anims.play('right', true);
		}
		else {
			player.body.setVelocityX(0);
			player.anims.play('turn', true);
		}

		if (cursor.up.isDown && player.body.touching.down) {
			player.body.setVelocityY(-350)
		}
	}
}

function loadLevelSetup(levels, level, scene) {
	level_data = levels[level];
	for (let i=0; i<level_data.length; i++) {
		for (let j=0; j<level_data[0].length; j++) {
			data = level_data[i][j];
			[x, y] = getPos(i, j);

			if (data && data <= 13) {
				platforms.create(x, y,`tile${data}`).setScale(0.4).refreshBody();
			}

			if (data && data == 17) {
				diamonds.create(x, y,`d${randint(1, 4)}`).setScale(0.4).refreshBody();
			}

			if (data == 15 || data == 16) {
				offy = data == 15 ? 10 : 0;
				[x, y] = getPos(i, j, 0, offy);
				firewater.create(x, y,`fire${data-14}`).setScale(0.4).refreshBody();
			}

			if (data == 19 || data == 20) {
				offy = data == 19 ? 10 : 0;
				[x, y] = getPos(i, j, 0, offy);
				firewater.create(x, y,`water${data-18}`).setScale(0.4).refreshBody();
			}

			if (data == 21) {
				greens.create(x, y-34, 'tree');
			}

			if (data == 22) {
				greens.create(x, y+12, 'mushroom');
			}

			if (data == 23) {
				var bee = new Bee({scene:scene, x: x, y:y})
				bee.setScale(0.5);
				bees.add(bee);
			}

			if (data == 24) {
				exits.create(x, y, 'exit');
			}

			if (data == 25 || data == 26) {
				type = data == 25 ? 'side' : 'up';
				var movingp = new MovingPlatform({scene:scene, x:x, y:y, key:'movingp', type:type})
				movingPlatforms.add(movingp);
			}

			if (data == 27) {
				var flower = greens.create(x, y+14, 'flower');
				flower.setScale(0.2);
			}

			if (data == 29) {
				var slime = new Slime({scene:scene, x: x, y:y+15, distance:50});
				slime.setScale(0.5);
				slimes.add(slime);
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
	this.physics.pause();
	this.scene.restart();
}

function gameWon(player, tile) {
	if (level < MAX_LEVEL) {
		level += 1;
		this.scene.restart();
	}
}

function collisionMovingPlatform(player, platform) {
	if (platform.body.touching.up && player.body.touching.down){
		if (platform.body.y > player.body.y) {
		    player.body.x += platform.vx;
		    player.body.y += platform.vy;
	    }
	}
}

function drawGrid(scene) {
	for (let i=0; i<ROWS; i++) {
		scene.add.line(0, 0, 0, TILESIZE*i, WIDTH, TILESIZE*i, 0x1a65ac).setOrigin(0);
	}
	for (let j=0; j<COLS; j++) {
		scene.add.line(0, 0, TILESIZE*j, 0, TILESIZE*j, HEIGHT, 0x1a65ac).setOrigin(0);
	}
}

function randint(a, b) {
	return Math.floor(Math.random() * b + a);
}