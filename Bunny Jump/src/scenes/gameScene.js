import Phaser from '../lib/phaser.js'
import Player from '../objects/player.js'
import Platform from '../objects/platform.js'

class GameScene extends Phaser.Scene {
	player;
	cursors;
	platforms

	init() {
		this.counter = 0;
	}

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
		this.load.image('bunny_ready', 'assets/Players/bunny2_ready.png');
		this.load.image('bunny_walk1', 'assets/Players/bunny2_walk1.png');
		this.load.image('bunny_walk2', 'assets/Players/bunny2_walk2.png');

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
		const bg = this.add.image(-this.width/2, 0, 'bg').setOrigin(0, 0);
		const bg2 = this.add.image(0, -170, 'bglayer1').setOrigin(0, 0);
		const bg3 = this.add.image(0, -185, 'bglayer2').setOrigin(0, 0);
		const bg4 = this.add.image(0, -200, 'bglayer3').setOrigin(0, 0);
		bg2.setScale(0.4);
		bg3.setScale(0.4);
		bg4.setScale(0.4);
		bg.setScrollFactor(1, 0);
		// bg2.setScrollFactor(1, 0);
		// bg3.setScrollFactor(1, 0);
		// bg4.setScrollFactor(1, 0);

		// groups
		this.platforms = this.physics.add.group({allowGravity:false, immovable:true});

		// adding platforms
		// var platform = new Platform({scene:this, x:50, y:300, texture:this.randomPlatform()});
		// this.platforms.add(platform);

		for (let i=0; i<2; i++) {
			var x = 50 + 300 * i;
			var y = randint(100, this.height-50);
			var platform = new Platform({scene:this, x:x, y:y, texture:this.randomPlatform()});
			platform.body.updateFromGameObject();
			this.platforms.add(platform);
		}

		// adding player
		this.player  = new Player({scene:this, x:50, y:100, texture:'bunny_stand'});

		// adding Camera
		this.cameras.main.startFollow(this.player);
		// this.cameras.main.setDeadzone(this.width, this.height)

		// adding keyboard inputs
		this.cursors = this.input.keyboard.createCursorKeys();

		// adding collision handlers
		this.physics.add.collider(this.player, this.platforms);
	}

	update() {
		const touchingDown = this.player.body.touching.down;
		const vy = this.player.body.velocity.y;

		if (this.cursors.up.isDown && touchingDown) {
			this.player.body.setVelocityY(-250);
			this.player.setTexture('bunny_jump');
		}

		if (this.cursors.left.isDown) {
			this.player.body.setVelocityX(-100);
			this.player.anims.play('left', true);
			this.player.flipX = true;
		}
		else if (this.cursors.right.isDown) {
			this.player.body.setVelocityX(100);
			this.player.anims.play('right', true);
			this.player.flipX = false;
		}
		else if (touchingDown) {
			this.player.body.setVelocityX(0);
			this.player.anims.play('stand', true);
		}

		if (this.player.body.position.y > this.height + 100) {
			this.scene.start('gameover');
		}

		if (this.player.body.x <= 0) {
			this.player.body.x = 0;
		}

		this.removePlatform();
	}

	randomPlatform(x, y) {
		var type = randint(1, 5);
		return `ground${type}`;
	}
	
	removePlatform() {
		const allPlatforms = this.platforms.getChildren();
		for (let i=0; i<allPlatforms.length; i++) {
			const platform = allPlatforms[i];
			// if (!this.counter) {
			// 	console.log(platform.body.x, this.player.body.x)
			// }
			if (platform.body.x - this.player.body.x > 300) {
				this.platforms.killAndHide(platform);
				this.physics.world.disableBody(platform.body);
			}
		}
		this.counter++;
	}
}

function randint(a, b) {
	return Phaser.Math.Between(a, b);
}

export default GameScene;