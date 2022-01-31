import Phaser from '../lib/phaser.js'

class Player extends Phaser.GameObjects.Sprite {
	constructor(config) {
		super(config.scene, config.x, config.y, config.texture);
		config.scene.add.existing(this);
		config.scene.physics.add.existing(this);

		this.setScale(0.5);
		this.body.setBounce(0.2);
		this.body.checkCollision.up = false;
		this.body.checkCollision.left = false;
		this.body.checkCollision.right = false;

		config.scene.anims.create({
			key: 'left',
			frames: [
				{key : 'bunny_walk1'},
				{key : 'bunny_walk2'}
			],
			frameRate: 10,
			repeat: -1
		})

		config.scene.anims.create({
			key: 'right',
			frames: [
				{key : 'bunny_walk1'},
				{key : 'bunny_walk2'}
			],
			frameRate: 10,
			repeat: -1
		})

		config.scene.anims.create({
			key: 'stand',
			frames: [
				{key: 'bunny_stand'}
			],
			frameRate: 10
		})
	}
}

export default Player;