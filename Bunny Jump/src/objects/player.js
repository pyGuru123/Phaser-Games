import Phaser from '../lib/phaser.js'

class Player extends Phaser.GameObjects.Sprite {
	constructor(config) {
		super(config.scene, config.x, config.y, config.texture);
		config.scene.add.existing(this);
		config.scene.physics.add.existing(this);

		this.setScale(0.5);
		this.body.setBounce(0.2);
		// this.body.setAllowGravity(false);

	}
}

export default Player;