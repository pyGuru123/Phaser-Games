import Phaser from '../lib/phaser.js'
import Player from '../objects/player.js'
import Platform from '../objects/platform.js'

class GameScene extends Phaser.Scene {
	player;
	cursors;
	platforms

	constructor() {
		super('gamescene');
	}

	preload() {
		this.load.image('bg', 'assets/Background/bg_layer1.png');
		this.load.image('bglayer1', 'assets/Background/bg_layer2.png');
		this.load.image('bglayer2', 'assets/Background/bg_layer3.png');
		this.load.image('bglayer3', 'assets/Background/bg_layer4.png');

		this.load.image('bunny_stand', 'assets/Players/bunny2_stand.png');
		this.load.image('bunny_jump', 'assets/Players/bunny2_jump.png');

		this.load.image('ground1', 'assets/Environment/ground_grass.png');
		this.load.image('ground2', 'assets/Environment/ground_sand.png');
		this.load.image('ground3', 'assets/Environment/ground_snow.png');
		this.load.image('ground4', 'assets/Environment/ground_wood.png');
		this.load.image('ground5', 'assets/Environment/ground_stone.png');
	}

	create() {
		// setting width & height
		this.width = this.scale.width;
		this.height = this.scale.height;

		// setting backgrounds
		const bg = this.add.image(0, 0, 'bg').setOrigin(0, 0);
		const bg2 = this.add.image(0, -170, 'bglayer1').setOrigin(0, 0);
		const bg3 = this.add.image(0, -185, 'bglayer2').setOrigin(0, 0);
		const bg4 = this.add.image(0, -200, 'bglayer3').setOrigin(0, 0);
		bg2.setScale(0.4);
		bg3.setScale(0.4);
		bg4.setScale(0.4);

		// groups
		this.platforms = this.physics.add.group({allowGravity:false});

		// adding platforms
		var platform = new Platform({scene:this, x:50, y:300, texture:this.randomPlatform()});
		this.platforms.add(platform);

		// for (let i=0; i<5; i++) {
		// 	randint
		// }

		// adding player
		this.player  = new Player({scene:this, x:100, y:100, texture:'bunny_stand'});

		// adding keyboard inputs
		this.cursors = this.input.keyboard.createCursorKeys();
	}

	update() {
		if (this.cursors.up.isDown) {
			this.player.body.setVelocityY(-50);
			this.player.setTexture('bunny_jump');
		}
	}

	randomPlatform() {
		var type = randint(1, 5);
		return `ground${type}`;
	}
}

function randint(a, b) {
	return Phaser.Math.Between(a, b);
}

export default GameScene;