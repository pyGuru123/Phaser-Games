import Phaser from './lib/phaser.js'
import GameScene from './scenes/gameScene.js'
import GameOverScene from './scenes/gameOverScene.js'

const config  = {
	type: Phaser.AUTO,
	width: 640,
	height: 480,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {
				y: 200
			},
			debug: true
		}
	},
	scene: [GameScene, GameOverScene]
}

const game = new Phaser.Game(config);
export default game;