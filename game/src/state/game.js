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
        // this.gameElements.door.init();
        // this.gameElements.person.init();
        // this.gameElements.person.firsstwalk();
        this.gameElements.startGameButton.button.destroy();
        this.gameElements.rooms.change();
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
      init: function () {
        
        this.group = this.state.game.make.group();
        this.group.name = 'Person';
        this.group.centerX = this.state.game.world.centerX;
        this.group.centerY = this.state.game.world.centerY;
        this.state.game.world.add(this.group);
    

        this.person = this.state.make.sprite(0, 0, 'person', 'C2.9.png');
        this.person.name = 'Person';
        this.person.scale.setTo(3);
        this.person.anchor.setTo(1)
        this.person.animations.add('step_l', Phaser.Animation.generateFrameNames('C2.', 4, 7, '.png'), 3, true);
        this.person.animations.add('step_r', Phaser.Animation.generateFrameNames('C2.', 8, 11, '.png'), 3, true);
        this.person.animations.add('step_up', Phaser.Animation.generateFrameNames('C2.', 0, 3, '.png'), 3, true);
        this.person.animations.add('action_B', Phaser.Animation.generateFrameNames('C2.', 1, 6, '.png'), 6, true);
        
        this.group.add(this.person);
      },
      firsstwalk: function () {
        this.group.x = 50;
        this.group.y = 1090;
        this.person.animations.play('step_r');
        this.movieTween = this.state.game.add.tween(this.group);
        this.movieTween.onComplete.add(function(){
          this.person.animations.play('step_up');
          this.state.gameElements.door.open();
          this.enterTween = this.state.game.add.tween(this.group);
          this.enterTween.to({y: 1000}, 3000, Phaser.Easing.Linear.None);
          this.enterTween.onComplete.add(function(){
            this.state.gameElements.door.door.destroy();
            // this.state.gameElements.person.animations.stop();
            this.state.gameElements.person.visible = false;
            this.state.gameElements.rooms.change();
          }, this);
          this.enterTween.start();
          this.enterTween2 = this.state.game.add.tween(this.person.scale);
          this.enterTween2.to({x: 2, y: 2}, 3000, Phaser.Easing.Linear.None);
          this.enterTween2.start();
        }, this);
        this.movieTween.to({x: 800}, 3000, Phaser.Easing.Linear.None);
        this.movieTween.start();

      },
    }

    this.gameElements.rooms = {
      state: this,
      rooms: ['bathroom', 'bedroom', 'emptyroom', 'kitchen', 'living_z', 'livingroom'],
      change: function() {
        this.state.gameElements.background.destroy();
        this.state.gameElements.background = this.state.game.add.image(0, 0, 'kitchen');

      }
    }


  }
  update () {
  }
}