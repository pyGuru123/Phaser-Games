import Phaser from '../lib/phaser.js'

class Platform extends Phaser.GameObjects.Sprite {
	constructor(config) {
		super(config.scene, config.x, config.y, config.texture);
		config.scene.add.existing(this);
		config.scene.physics.add.existing(this);

		this.setScale(0.4);
		this.allowGravity = false;

		this.initialX = config.x;
	}
}

export default Platform