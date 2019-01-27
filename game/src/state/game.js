import utils from '../utils'

export default class extends Phaser.State {
  init () {
    this.game.time.advancedTiming = true;
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.setShowAll();
    this.game.scale.refresh();
    this.game.renderer.renderSession.roundPixels = true;
    this.game.stage.backgroundColor = '#000000';
    if (window.replace && window.replace.hasOwnProperty('disableVisibilityChange')) {
      this.game.stage.disableVisibilityChange = true;
    }
  }
  preload () {
  }
  create () {
    this.gameElements = {};
    this.gameElements.background = this.game.add.image(0, 0, 'background');
    this.gameElements.background.name = 'background';
    this.gameElements.background.width = this.game.width;
    this.gameElements.background.height = this.game.height;

    this.gameElements.startGameButton = {
      state: this,
      init: function() {
        this.button = this.state.add.button(this.state.world.centerX - 500, 400, 'button_start', this.state.gameElements.startGameButton.startGame, this.state);
        this.button.scale.setTo(5);
      },
      startGame: function() {
        this.gameElements.door.init();
        this.gameElements.person.init();
        this.gameElements.person.firsstwalk();
        this.gameElements.startGameButton.button.destroy();
      }
    };
    this.gameElements.startGameButton.init();

    this.gameElements.fx = {};

    this.gameElements.fx.door_open = this.add.audio('door_open');
    this.gameElements.fx.door_open.allowMultiple = true;


    this.gameElements.door = {
      state: this,
      init: function() {
        this.door = this.state.make.sprite(0, 0, 'doors', 'door_1.png');
        this.door.x = 740;
        this.door.y = 1060;
        this.door.name = 'Doors';
        this.door.scale.setTo(4);
        this.door.anchor.setTo(1)
        this.door.animations.add('door1', Phaser.Animation.generateFrameNames('door_', 1, 3, '.png'), 3, false);
        this.state.game.world.add(this.door);
      },
      open: function() {
        this.door.animations.play('door1', 20);
        this.state.gameElements.fx.door_open.play();
      }
    }

    this.gameElements.person = {
      state: this,
      curentPos: '0',
      steps: [],
      movieStatus: false,
      movieTween: null,
      animationState: {
        frame: '',
        position: 'F',
        idleState: 'idle'
      },
      person: this.game.make.sprite(0, 0, 'person', 'C2.9.png'),

      init: function () {
        this.person.name = 'Person';
        this.person.scale.setTo(3);
        this.person.anchor.setTo(1)
        this.person.animations.add('step_l', Phaser.Animation.generateFrameNames('C2.', 4, 7, '.png'), 3, true);
        this.person.animations.add('step_r', Phaser.Animation.generateFrameNames('C2.', 8, 11, '.png'), 3, true);
        this.person.animations.add('step_up', Phaser.Animation.generateFrameNames('C2.', 0, 3, '.png'), 3, true);
        this.person.animations.add('action_B', Phaser.Animation.generateFrameNames('C2.', 1, 6, '.png'), 6, true);
        this.state.game.world.add(this.person);
      },
      firsstwalk: function () {
        this.person.x = 50;
        this.person.y = 1090;
        this.person.animations.play('step_r');
        this.movieTween = this.state.game.add.tween(this.person);
        this.movieTween.onComplete.add(function(){
          this.person.animations.play('step_up');
          this.state.gameElements.door.open();
          this.enterTween = this.state.game.add.tween(this.person);
          this.enterTween.to({y: 1000}, 3000, Phaser.Easing.Linear.None);
          this.enterTween.onComplete.add(function(){
            this.state.gameElements.door.door.destroy();
            this.person.animations.paused = true;
            this.person.visible = false;
            this.person.scale.setTo(5);
            this.state.gameElements.rooms.changeKitchen();
          }, this);
          this.enterTween.start();
          this.enterTween2 = this.state.game.add.tween(this.person.scale);
          this.enterTween2.to({x: 2, y: 2}, 2800, Phaser.Easing.Linear.None);
          this.enterTween2.start();
        }, this);
        this.movieTween.to({x: 800}, 3000, Phaser.Easing.Linear.None);
        this.movieTween.start();
      },
    }

    this.gameElements.rooms = {
      state: this,
      rooms: ['bathroom', 'bedroom', 'emptyroom', 'kitchen', 'living_z', 'livingroom'],
      items: {},
      itemCounter: 0,
      sicretCounter: 0,
      findItem: [],
      changeKitchen: function() {
        this.state.gameElements.background.destroy();
        this.state.gameElements.background = this.state.game.add.image(0, 0, 'kitchen');

        this.state.gameElements.person.person.bringToTop();
        this.state.gameElements.person.person.scale.setTo(5);
        this.state.gameElements.person.person.x = 300;
        this.state.gameElements.person.person.y = 1090;
        this.state.gameElements.person.person.visible = true;
        this.state.gameElements.person.person.animations.play('step_r');
        this.state.gameElements.person.person.animations.paused = true;

        this.itemGroup = this.state.game.make.group();
        this.itemGroup.name = 'kitchenItemGroup';
        this.itemGroup.centerX = this.state.game.world.centerX;
        this.itemGroup.centerY = this.state.game.world.centerY;
        this.state.game.world.add(this.itemGroup);
  
        this.itemCounter = 3;
        this.findItem = [];
        this.items.rectangular = this.state.game.add.image(-400, 350, 'item_rectangular');
        this.items.rectangular.height = 200;
        this.itemGroup.add(this.items.rectangular);

        this.items.beer_mask =  this.state.make.image(-300, 380, 'item_beer_mask');
        this.items.beer_mask.scale.setTo(0.5);
        this.items.bread_mask = this.state.make.image(-50, 400, 'item_bread_mask');
        this.items.bread_mask.scale.setTo(0.5);
        this.items.blade_mask = this.state.make.image(200, 430, 'item_blade_mask');
        this.items.blade_mask.scale.setTo(0.5);
        this.itemGroup.add(this.items.beer_mask);
        this.itemGroup.add(this.items.bread_mask);
        this.itemGroup.add(this.items.blade_mask);

        this.items.beer =  this.state.make.image(500, -190, 'item_beer');
        this.items.bread = this.state.make.image(-620, -300, 'item_bread');
        this.items.blade = this.state.make.image(0, -55, 'item_blade');
        this.itemGroup.add(this.items.beer);
        this.itemGroup.add(this.items.bread);
        this.itemGroup.add(this.items.blade);

        this.items.beer.inputEnabled = true;
        this.items.beer.events.onInputDown.add(function (e) {
          this.touchItem(e);
        }, this);
        this.items.bread.inputEnabled = true;
        this.items.bread.events.onInputDown.add(function (e) {
          this.touchItem(e);
        }, this);
        this.items.blade.inputEnabled = true;
        this.items.blade.events.onInputDown.add(function (e) {
          this.touchItem(e);
        }, this);
      },
      touchItem(e) {
        var name = e.key.slice(5);
        console.log(name)
        if (name === 'blade') {
          this.sicretCounter ++;
          console.log(this.sicretCounter);
          if (this.sicretCounter >= 3) {
            this.changmeEptyroom();  
          }
        }
        if (this.findItem.indexOf(name) > -1) {
          return;
        }
        this.findItem.push(name);

        this.items[name + '_mask'].visible = false;
        this.itemCounter --;
        if (this.itemCounter <= 0) {
          this.finishKitchen();
        }
      },
      finishKitchen: function() {
        this.itemGroup.destroy();

        this.itemGroup = this.state.game.make.group();
        this.itemGroup.name = 'FinishText';
        this.itemGroup.centerX = this.state.game.world.centerX;
        this.itemGroup.centerY = this.state.game.world.centerY;
        this.state.game.world.add(this.itemGroup);

        this.items.rectangular = this.state.game.add.image(-500, 0, 'item_rectangular');
        this.items.rectangular.height = 200;
        this.itemGroup.add(this.items.rectangular);

        var style = { font: "bold 132px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        this.items.text = this.state.game.add.text(-380, 20, "Good work!", style);
        this.itemGroup.add(this.items.text);


        this.state.gameElements.person.person.animations.play('step_r');
        this.state.gameElements.person.person.animations.paused = false;
        this.movieTween = this.state.game.add.tween(this.state.gameElements.person.person);
        this.movieTween.onComplete.add(function(){
          this.state.gameElements.person.person.animations.paused = true;
          this.itemGroup.destroy();
          this.state.gameElements.rooms.changeBedroom();
        }, this);
        this.movieTween.to({x: 2000}, 3000, Phaser.Easing.Linear.None);
        this.movieTween.start();
      },
      changeBedroom: function() {
        this.state.gameElements.background.destroy();
        this.state.gameElements.background = this.state.game.add.image(0, 0, 'bedroom');

        this.state.gameElements.person.person.bringToTop();
        this.state.gameElements.person.person.scale.setTo(5);
        this.state.gameElements.person.person.x = 300;
        this.state.gameElements.person.person.y = 1090;
        this.state.gameElements.person.person.visible = true;
        this.state.gameElements.person.person.animations.play('step_r');
        this.state.gameElements.person.person.animations.paused = true;

        this.state.gameElements.weapon = this.state.add.weapon(10, 'bullet');
        this.state.gameElements.weapon.setBulletFrames(0, 80, true);
        this.state.gameElements.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.state.gameElements.weapon.bulletSpeed = 500;
        this.state.gameElements.weapon.fireRate = 10;

        this.state.gameElements.machinegun = this.state.game.add.sprite(150, 1000, 'machinegun');
        this.state.gameElements.machinegun.anchor.set(0.5);
        this.state.gameElements.machinegun.scale.setTo(0.25);
        this.state.physics.arcade.enable(this.state.gameElements.machinegun);
        this.state.gameElements.machinegun.body.drag.set(70);
        this.state.gameElements.machinegun.body.maxVelocity.set(200);
        this.state.gameElements.weapon.trackSprite(this.state.gameElements.machinegun, 100, 0, true);
        this.state.gameElements.cursors = this.state.input.keyboard.createCursorKeys();
        this.state.gameElements.fireButton = this.state.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);


        this.sheep = this.state.add.image(1000, 200, 'sheep');
        this.sheep.scale.setTo(0.5);


      },
      hitSheep: function() {
      },
      changmeEptyroom: function() {
        this.state.gameElements.background.destroy();
        this.state.gameElements.background = this.state.game.add.image(0, 0, 'emptyroom');

        this.state.gameElements.person.person.bringToTop();
        this.state.gameElements.person.person.scale.setTo(5);
        this.state.gameElements.person.person.x = 300;
        this.state.gameElements.person.person.y = 1090;
        this.state.gameElements.person.person.visible = true;
        this.state.gameElements.person.person.animations.play('step_r');
        this.state.gameElements.person.person.animations.paused = true;

        this.itemGroup = this.state.game.make.group();
        this.itemGroup.name = 'FinishText';
        this.itemGroup.centerX = this.state.game.world.centerX;
        this.itemGroup.centerY = this.state.game.world.centerY;
        this.state.game.world.add(this.itemGroup);


        this.items.rectangular = this.state.game.add.image(-500, 0, 'item_rectangular');
        this.items.rectangular.height = 200;
        this.itemGroup.add(this.items.rectangular);

        var style = { font: "bold 132px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        this.items.text = this.state.game.add.text(-380, 20, "Sicret Room!", style);
        this.itemGroup.add(this.items.text);


        this.state.gameElements.person.person.animations.play('step_r');
        this.state.gameElements.person.person.animations.paused = false;
        this.movieTween = this.state.game.add.tween(this.state.gameElements.person.person);
        this.movieTween.onComplete.add(function(){
          this.state.gameElements.person.person.animations.paused = true;
          this.itemGroup.destroy();
          this.state.gameElements.rooms.changeBedroom();
        }, this);
        this.movieTween.to({x: 2000}, 5000, Phaser.Easing.Linear.None);
        this.movieTween.start();
      
      }
    }
    // this.gameElements.person.init();
    // this.gameElements.rooms.changeBedroom();
  }
  update () {
    if (this.gameElements.hasOwnProperty('cursors') && this.gameElements.cursors) {
      // if (this.gameElements.cursors.up.isDown) {
      //   this.game.physics.arcade.accelerationFromRotation(this.gameElements.machinegun.rotation, 300, this.gameElements.machinegun.body.acceleration);
      // } else {
        this.gameElements.machinegun.body.acceleration.set(0);
      // }
      if (this.gameElements.cursors.left.isDown) {
        this.gameElements.machinegun.body.angularVelocity = -60;
      } else if (this.gameElements.cursors.right.isDown) {
        this.gameElements.machinegun.body.angularVelocity = 60;
      } else {
        this.gameElements.machinegun.body.angularVelocity = 0;
      }
      
      if (this.gameElements.fireButton.isDown) {
        this.gameElements.weapon.fire();

        // console.log(this.gameElements.weapon);
      }
      this.game.world.wrap(this.gameElements.machinegun, 16);
    }

  }
  render() {
  }
}