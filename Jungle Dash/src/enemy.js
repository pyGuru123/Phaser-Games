class Bee extends Phaser.GameObjects.Sprite {
	constructor(config) {
		super(config.scene, config.x, config.y, 'bee');
		config.scene.add.existing(this);
		config.scene.physics.add.existing(this);

		this.x = config.x;
		this.y = config.y;

		config.scene.tweens.add({
			targets : this.body.velocity,
			y : {from: -150, to: 150},
			ease: Phaser.Math.Easing.Quadratic.InOut,
			yoyo: true,
			repeat: -1,
			duration: 1000,
			delay: Phaser.Math.Between(0,6) * 200
		})
	}
}