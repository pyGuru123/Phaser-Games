class Bee extends Phaser.GameObjects.Sprite {
	constructor(config) {
		super(config.scene, config.x, config.y, 'bee');
		config.scene.add.existing(this);
		config.scene.physics.add.existing(this);

		this.initial = [config.x, config.y];
		this.x = config.x;
		this.y = config.y;
		this.speed = 5;
	}

	preUpdate() {
		if  (this.y < this.initial[1] - 100) {
			this.speed *= -1;
		}
		if (this.y > this.initial[1] + 100) {
			this.speed *= -1;
		}

		this.y += this.speed;
		this.setY(this.y);
	}
}