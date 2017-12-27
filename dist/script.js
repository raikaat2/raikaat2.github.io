'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Game = function (_Phaser$Game) {
		_inherits(Game, _Phaser$Game);

		function Game() {
				_classCallCheck(this, Game);

				var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, 800, 600, Phaser.AUTO, 'game'));

				_this.state.add('GameState', GameState, false);
				_this.state.start('GameState');

				return _this;
		}

		return Game;
}(Phaser.Game);

;

var GameState = function (_Phaser$State) {
		_inherits(GameState, _Phaser$State);

		function GameState() {
				_classCallCheck(this, GameState);

				return _possibleConstructorReturn(this, (GameState.__proto__ || Object.getPrototypeOf(GameState)).apply(this, arguments));
		}

		_createClass(GameState, [{
				key: 'preload',
				value: function preload() {

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
						this.game.world.setBounds(0, 0, 4000, 600);

						this.move = this.game.input.keyboard.createCursorKeys();
						this.movingSpeed = 100;
						this.jumpingSpeed = 500;
						this.bulletSpeed = 1000;
				}
		}, {
				key: 'create',
				value: function create() {
						var _this3 = this;

						this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
						this.scale.pageAlignHorizontally = true;

						var BACKGROUND_COORDINATES = [{ "x": 0, "y": 0 }, { "x": 800, "y": 0 }, { "x": 1600, "y": 0 }, { "x": 2400, "y": 0 }, { "x": 3200, "y": 0 }, { "x": 4000, "y": 0 }, { "x": 4800, "y": 0 }];

						this.backgrounds = this.add.group();

						BACKGROUND_COORDINATES.forEach(function (coordinate) {
								_this3.backgrounds.create(coordinate.x, coordinate.y, 'background');
						}, this);

						var WATER_COORDINATES = [{ "x": 0, "y": 550 }, { "x": 800, "y": 550 }, { "x": 1600, "y": 550 }, { "x": 2400, "y": 550 }, { "x": 3200, "y": 550 }, { "x": 4000, "y": 550 }, { "x": 4800, "y": 550 }];

						this.water = this.add.group();
						this.water.enableBody = true;

						WATER_COORDINATES.forEach(function (coordinate) {
								_this3.water.create(coordinate.x, coordinate.y, 'water');
						}, this);
						this.water.setAll('body.immovable', true);
						this.water.setAll('body.allowGravity', false);

						var GROUND_COORDINATES = [{ "x": 0, "y": 550 }, { "x": 800, "y": 550 }, { "x": 1600, "y": 550 }, { "x": 2400, "y": 550 }, { "x": 3200, "y": 550 }, { "x": 4000, "y": 550 }, { "x": 4800, "y": 550 }];

						this.ground = this.add.group();
						this.ground.enableBody = true;

						GROUND_COORDINATES.forEach(function (coordinate) {
								_this3.ground.create(coordinate.x, coordinate.y, 'ground');
						}, this);
						this.ground.setAll('body.immovable', true);
						this.ground.setAll('body.allowGravity', false);

						var FLYING_GROUND_COORDINATES = [{ "x": 0, "y": 100 }, { "x": 250, "y": 300 }, { "x": 450, "y": 400 }, { "x": 700, "y": 300 }, { "x": 850, "y": 400 }, { "x": 1100, "y": 350 }, { "x": 1250, "y": 300 }, { "x": 1500, "y": 200 }, { "x": 1750, "y": 150 }, { "x": 1900, "y": 300 }, { "x": 2150, "y": 400 }, { "x": 2300, "y": 350 }, { "x": 2550, "y": 300 }, { "x": 2800, "y": 400 }, { "x": 3050, "y": 300 }, { "x": 3700, "y": 380 }, { "x": 3850, "y": 230 }];

						this.flyingGrounds = this.add.group();
						this.flyingGrounds.enableBody = true;

						FLYING_GROUND_COORDINATES.forEach(function (coordinate) {
								_this3.flyingGrounds.create(coordinate.x, coordinate.y, 'flyingGround');
						}, this);
						this.flyingGrounds.setAll('body.immovable', true);
						this.flyingGrounds.setAll('body.allowGravity', false);

						var SPIKE_COORDINATES = [{ "x": 270, "y": 255 }, { "x": 480, "y": 355 }, { "x": 750, "y": 255 }, { "x": 870, "y": 355 }, { "x": 1150, "y": 305 }, { "x": 1280, "y": 255 }, { "x": 1550, "y": 155 }, { "x": 1780, "y": 105 }, { "x": 1940, "y": 255 }, { "x": 2150, "y": 355 }, { "x": 2300, "y": 305 }, { "x": 2580, "y": 255 }, { "x": 2850, "y": 355 }, { "x": 3090, "y": 255 }];

						this.spikes = this.add.group();
						this.spikes.enableBody = true;

						SPIKE_COORDINATES.forEach(function (coordinate) {
								_this3.spikes.create(coordinate.x, coordinate.y, 'spike');
						}, this);
						this.spikes.setAll('body.immovable', true);
						this.spikes.setAll('body.allowGravity', false);

						this.cannon = this.game.add.sprite(3800, 345, 'cannon');
						this.game.physics.arcade.enable(this.cannon);
						this.cannon.body.immovable = true;
						this.cannon.body.allowGravity = false;
						this.cannon.anchor.setTo(0.5, 0.5);

						this.bullets = this.add.group();
						this.bullets.enableBody = true;

						this.shooting = this.game.time.events.loop(Phaser.Timer.SECOND * 3, this.createBullets, this);

						this.player = this.game.add.sprite(50, 50, 'player', 1);
						this.player.anchor.setTo(0.5, 0.5);
						this.game.physics.arcade.enable(this.player);
						this.game.camera.follow(this.player);

						this.princess = this.game.add.sprite(3950, 150, 'princess');
						this.game.physics.arcade.enable(this.princess);
						this.princess.scale.setTo(-1, 1);
				}
		}, {
				key: 'update',
				value: function update() {

						var that = this;

						this.game.physics.arcade.collide(this.player, this.ground);
						this.game.physics.arcade.collide(this.player, this.flyingGrounds);
						this.game.physics.arcade.collide(this.player, this.cannon);
						this.game.physics.arcade.overlap(this.player, this.water, function () {
								return that.state.start('GameState');
						});
						this.game.physics.arcade.overlap(this.player, this.bullets, function () {
								return that.state.start('GameState');
						});
						this.game.physics.arcade.overlap(this.player, this.spikes, function () {
								return that.state.start('GameState');
						});
						this.game.physics.arcade.collide(this.princess, this.flyingGrounds);
						this.game.physics.arcade.overlap(this.player, this.princess, function () {
								alert("Try to save me again HAHAHAHA");
								that.state.start('GameState');
						});

						this.moveHero();

						this.bullets.forEach(function (bulletCoordinate) {
								if (bulletCoordinate.x < 50) {
										bulletCoordinate.kill();
								}
						});
				}
		}, {
				key: 'moveHero',
				value: function moveHero() {
						this.player.body.velocity.x = 0;

						if (this.move.left.isDown) {
								this.player.body.velocity.x = -this.movingSpeed;
								this.player.scale.setTo(-1, 1);
						}

						if (this.move.right.isDown) {
								this.player.body.velocity.x = +this.movingSpeed;
								this.player.scale.setTo(1, 1);
						}

						if (this.move.up.isDown && this.player.body.touching.down) {
								this.player.body.velocity.y = -this.jumpingSpeed;
						}
				}
		}, {
				key: 'createBullets',
				value: function createBullets() {
						var bullet = this.bullets.getFirstExists(false);

						if (!bullet) {
								bullet = this.bullets.create(0, 0, 'bullet');
						}

						bullet.reset(3730, 320);
						bullet.body.allowGravity = false;
						bullet.body.velocity.x = -this.bulletSpeed;
				}
		}]);

		return GameState;
}(Phaser.State);

new Game();