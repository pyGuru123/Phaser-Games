import Phaser from '../lib/phaser.js'

class GameOverScene extends Phaser.Scene {
	constructor() {
		super('gameover');
	}

	create() {
		this.width = this.scale.width;
		this.height = this.scale.height;

		this.add.image(0, 0, 'bg').setOrigin(0,0);

		const style = {color: '#000', fontSize:48}
		this.add.text(this.width/2, this.height/2, 'Game Over!', style);

		this.input.keyboard.once('keydown-SPACE', () => {
			this.scene.start('gamescene');
		})
	}

	update() {

	}
}

export default GameOverScene