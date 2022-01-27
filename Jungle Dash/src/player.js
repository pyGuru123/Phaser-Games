class Player extends Phaser.GameObjects.Sprite {
	constructor(config) {
		super(config.scene, config.x, config.y, 'dude');
		config.scene.add.existing(this);
		config.scene.physics.add.existing(this);

		this.body.setGravityY(300);
		this.body.setBounce(0.2);
		this.body.setCollideWorldBounds(true);

		this.isOnPlatform = false;
		this.currentPlatform = null;

		config.scene.anims.create({
	        key: 'left',
	        frames: config.scene.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
	        frameRate: 10,
	        repeat: -1
	    })

	    config.scene.anims.create({
	        key: 'turn',
	        frames: [{key: 'dude', frame: 4}],
	        frameRate: 20
	    })

	    config.scene.anims.create({
	        key: 'right',
	        frames: config.scene.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
	        frameRate: 10,
	        repeat: -1
	    })
	}

	preUpdate() {
		if  (player.isOnPlatform && player.currentPlatform) {
		    player.body.position.x += player.currentPlatform.vx;
		    player.body.position.y += player.currentPlatform.vy;
		    player.isOnPlatform = false;
		    player.currentPlatform = null;
	    }
	}
}