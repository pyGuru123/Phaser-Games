import Phaser from '../lib/phaser.js'

class Platform extends Phaser.GameObjects.Sprite {
	constructor(config) {
		super(config.scene, config.x, config.y, config.texture);

		this.setScale(0.5);
		this.allowGravity = false;
	}
}

export default Platform