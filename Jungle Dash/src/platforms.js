class MovingPlatform extends Phaser.GameObjects.Sprite {
	constructor(config) {
		super(config.scene, config.x, config.y, 'movingp')
		config.scene.add.existing(this);
		config.scene.physics.add.existing(this);

		this.setScale(0.4);
		this.allowGravity = false;

		config.scene.tweens.add({
			targets : this.body.velocity,
			y : {from: -150, to: 150},
			ease: Phaser.Math.Easing.Quadratic.InOut,
			yoyo: true,
			repeat: -1,
			duration: 1000,
			onUpdate: () => {
                this.vx = this.body.position.x - this.previousX;
                this.vy = this.body.position.y - this.previousY;
                this.previousX = this.body.position.x; 
                this.previousY = this.body.position.y;
              },
			delay: Phaser.Math.Between(0,6) * 200
		})
	}
}