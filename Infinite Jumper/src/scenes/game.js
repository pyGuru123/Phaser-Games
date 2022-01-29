import Phaser from '../lib/phaser.js'
import Carrot from './game/carrot.js'

const WIDTH = 288;
const HEIGHT = 512;

class GameScene extends Phaser.Scene {
	player;
	cursors;
	platforms;

	constructor() {
		super('game');
	}

	preload() {
		this.load.image('bg', 'assets/Background/bg_layer1.png');
		this.load.image('platform', 'assets/Environment/ground_grass.png');
		this.load.image('bunny_stand', 'assets/Players/bunny2_stand.png');
		this.load.image('carrot', 'assets/Items/carrot.png');
	}

	create() {
		// adding background
		var bg = this.add.image(0, 0, 'bg');
		bg.setScrollFactor(1, 0);

		// creating groups
		this.platforms = this.physics.add.staticGroup();

		for (let i=0; i<5; i++) {
			var x = Phaser.Math.Between(80, WIDTH-80);
			var y = 50 + 100 * i;

			var platform = this.platforms.create(x, y, 'platform');
			platform.setScale(0.4);
			platform.refreshBody();
		}

		// creating player
		this.player = this.physics.add.sprite(WIDTH/2, HEIGHT-300, 'bunny_stand')
		this.player.setScale(0.4);
		this.player.body.checkCollision.up = false;
		this.player.body.checkCollision.left = false;
		this.player.body.checkCollision.right = false;

		// adding carrots
		var carrot = new Carrot(this, 240, 320, 'carrot');

		// adding collision detection
		this.physics.add.collider(this.platforms, this.player);

		// camera
		this.cameras.main.startFollow(this.player);
		this.cameras.main.setDeadzone(this.scale.width * 1.5);

		// keyboard controls
		this.cursors = this.input.keyboard.createCursorKeys();
	}

	update() {
		this.platforms.children.iterate(child => {
			const platform = child;
			const scrollY = this.cameras.main.scrollY;
			if (platform.y >= scrollY + 500) {
				platform.y = scrollY - randint(50, 100);
				platform.body.updateFromGameObject();
			}
		})

		var touchingDown = this.player.body.touching.down;

		if (touchingDown) {
			this.player.setVelocityY(-300);
		}

		if (this.cursors.left.isDown && !touchingDown) {
			this.player.setVelocityX(-200);
		}
		else if (this.cursors.right.isDown && !touchingDown) {
			this.player.setVelocityX(200);
		}
		else {
			this.player.setVelocityX(0);
		}

		this.horizontalWrapSprite(this.player);
	}

	horizontalWrapSprite(sprite) {
		var halfWidth = sprite.displayWidth * 0.5;
		var gameWidth = this.scale.width;
		if (sprite.x < -halfWidth) {
			sprite.x = gameWidth + halfWidth;
		}
		else if (sprite.x > gameWidth + halfWidth) {
			sprite.x = -halfWidth;
		}
	}
}

function randint(a, b) {
	return Phaser.Math.Between(a, b);
}

function getPosition(player) {
	console.log(player.body.position.x, player.body.position.y);
}

export default GameScene;