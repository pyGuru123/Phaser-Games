import Phaser from '../lib/phaser.js'

class Carrot extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, texture) {
		super(scene, x, y, textture);
		scene.add.existing(this);
		this.setScale(0.4);
	}
}

export default Carrot;