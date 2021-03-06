
class Game extends Phaser.Game {

	constructor() {

		super(800, 600, Phaser.AUTO);
		this.state.add('GameState', GameState, false);
		this.state.start('GameState');

	}


};

class GameState extends Phaser.State {

	preload() {

		this.load.image('background', 'img/background.png');
		this.load.spritesheet('player', 'img/player.png', 50, 55);
		this.load.image('water', 'img/water.png');
		this.load.image('ground', 'img/ground.png');
		this.load.image('flyingGround', 'img/ground2.png');
		this.load.image('spike', 'img/spike.png');
		this.load.image('princess', 'img/princess.png');
		this.load.image('cannon', 'img/cannon.png');
		this.load.image('bullet', 'img/bullet.png');

		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.gravity.y = 700;
		this.game.world.setBounds(0,0, 4000, 600);

		this.move = this.game.input.keyboard.createCursorKeys();
		this.movingSpeed = 100;
		this.jumpingSpeed = 500;
		this.bulletSpeed = 1000;


	}

	create() {

		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;

		const BACKGROUND_COORDINATES = [
			{"x":0, "y":0},
			{"x":800, "y":0},
			{"x":1600, "y":0},
			{"x":2400, "y":0},
			{"x":3200, "y":0},
			{"x":4000, "y":0},
			{"x":4800, "y":0}
		]

		this.backgrounds = this.add.group();

		BACKGROUND_COORDINATES.forEach((coordinate)=>{
			this.backgrounds.create(coordinate.x, coordinate.y, 'background');
		}, this);

		const WATER_COORDINATES = [
			{"x":0, "y":550},
			{"x":800, "y":550},
			{"x":1600, "y":550},
			{"x":2400, "y":550},
			{"x":3200, "y":550},
			{"x":4000, "y":550},
			{"x":4800, "y":550}
		];

		this.water = this.add.group();
		this.water.enableBody = true;

		WATER_COORDINATES.forEach((coordinate)=>{
			this.water.create(coordinate.x, coordinate.y, 'water');
		}, this);
		this.water.setAll('body.immovable', true);
		this.water.setAll('body.allowGravity', false);

		const GROUND_COORDINATES = [
			{"x":0, "y":550},
			{"x":800, "y":550},
			{"x":1600, "y":550},
			{"x":2400, "y":550},
			{"x":3200, "y":550},
			{"x":4000, "y":550},
			{"x":4800, "y":550}
		]

		this.ground = this.add.group();
		this.ground.enableBody = true;

		GROUND_COORDINATES.forEach((coordinate)=>{
			this.ground.create(coordinate.x, coordinate.y, 'ground');
		}, this);
		this.ground.setAll('body.immovable', true);
		this.ground.setAll('body.allowGravity', false);


		const FLYING_GROUND_COORDINATES = [
			{"x":0, "y":100},
			{"x":250, "y":300},
			{"x":450, "y":400},
			{"x":700, "y":300},
			{"x":850, "y":400},
			{"x":1100, "y":350},
			{"x":1250, "y":300},
			{"x":1500, "y":200},
			{"x":1750, "y":150},
			{"x":1900, "y":300},
			{"x":2150, "y":400},
			{"x":2300, "y":350},
			{"x":2550, "y":300},
			{"x":2800, "y":400},
			{"x":3050, "y":300},
			{"x":3700, "y":380},
			{"x":3850, "y":230}
			];

		this.flyingGrounds = this.add.group();
		this.flyingGrounds.enableBody = true;

		FLYING_GROUND_COORDINATES.forEach((coordinate)=>{
			this.flyingGrounds.create(coordinate.x, coordinate.y, 'flyingGround');
		}, this);
		this.flyingGrounds.setAll('body.immovable', true);
		this.flyingGrounds.setAll('body.allowGravity', false);

		const SPIKE_COORDINATES = [
			{"x":270, "y":255},
			{"x":480, "y":355},
			{"x":750, "y":255},
			{"x":870, "y":355},
			{"x":1150, "y":305},
			{"x":1280, "y":255},
			{"x":1550, "y":155},
			{"x":1780, "y":105},
			{"x":1940, "y":255},
			{"x":2150, "y":355},
			{"x":2300, "y":305},
			{"x":2580, "y":255},
			{"x":2850, "y":355},
			{"x":3090, "y":255}
		];

		this.spikes = this.add.group();
		this.spikes.enableBody = true;

		SPIKE_COORDINATES.forEach((coordinate)=>{
			this.spikes.create(coordinate.x, coordinate.y, 'spike');
		}, this);
		this.spikes.setAll('body.immovable', true);
		this.spikes.setAll('body.allowGravity', false);

		this.cannon = this.game.add.sprite(3800,345, 'cannon');
		this.game.physics.arcade.enable(this.cannon);
		this.cannon.body.immovable = true;
		this.cannon.body.allowGravity = false;
		this.cannon.anchor.setTo(0.5,0.5);

		this.bullets = this.add.group();
		this.bullets.enableBody = true;

		this.shooting = this.game.time.events.loop(Phaser.Timer.SECOND*3, this.createBullets, this);



		this.player = this.game.add.sprite(50,50, 'player', 1);
        this.player.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(this.player);
        this.game.camera.follow(this.player);

        this.princess = this.game.add.sprite(3950, 150, 'princess');
        this.game.physics.arcade.enable(this.princess);
        this.princess.scale.setTo(-1,1);
	}

	update(){

		let that = this;
		
		this.game.physics.arcade.collide(this.player, this.ground);
		this.game.physics.arcade.collide(this.player, this.flyingGrounds);
		this.game.physics.arcade.collide(this.player, this.cannon);
		this.game.physics.arcade.overlap(this.player, this.water, () => that.state.start('GameState'));
		this.game.physics.arcade.overlap(this.player, this.bullets, () => that.state.start('GameState'));
		this.game.physics.arcade.overlap(this.player, this.spikes, () => that.state.start('GameState'));
		this.game.physics.arcade.collide(this.princess, this.flyingGrounds);
		this.game.physics.arcade.overlap(this.player, this.princess, () => { 
			alert("Try to save me again HAHAHAHA");
			that.state.start('GameState');
			});

		this.moveHero();

		this.bullets.forEach((bulletCoordinate)=>{
			if(bulletCoordinate.x < 50){
				bulletCoordinate.kill();
			}
		});

	}

	moveHero(){
		this.player.body.velocity.x = 0;

		if(this.move.left.isDown){
			this.player.body.velocity.x = -this.movingSpeed;
			this.player.scale.setTo(-1,1);
		}

		if(this.move.right.isDown){
			this.player.body.velocity.x = +this.movingSpeed;
			this.player.scale.setTo(1,1);
		}

		if(this.move.up.isDown && this.player.body.touching.down){
			this.player.body.velocity.y = -this.jumpingSpeed;
		}
	}

	createBullets(){
		let bullet = this.bullets.getFirstExists(false);

		if(!bullet){
			bullet = this.bullets.create(0,0, 'bullet');
		}

		bullet.reset(3730,320);
		bullet.body.allowGravity = false;
		bullet.body.velocity.x = -this.bulletSpeed;
	}

}


new Game()