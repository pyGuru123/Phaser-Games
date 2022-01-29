import Phaser from './lib/phaser.js'
import GameScene from './scenes/game.js'

export default new Phaser.Game({
	type: Phaser.AUTO,
	width: 288,
	height: 512,
	scene: GameScene,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {
				y: 200
			},
			debug: true
		}
	}
})