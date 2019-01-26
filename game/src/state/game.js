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
          console.log('11111111111');
          // this.movieStatus = false;
          // if (this.state.gameElements.fx) {
          //   this.state.gameElements.fx.nickirun.stop();
          // }
          // var curentPos = this.state.gameElements.gameMap[this.curentPos];
          // if (curentPos.hasOwnProperty('finalCource')) {
          //   this.setMoveAnimations(curentPos.finalCource);
          // }
          // if (curentPos.hasOwnProperty('idleState')) {
          //   this.setAnimations(curentPos.idleState);
          // } else {
          //   this.setAnimations(this.animationState.idleState);
          // }
        }, this);
        this.movieTween.to({x: 800}, 2000, Phaser.Easing.Linear.None);
        this.movieTween.start();

      },
    }

    this.gameElements.person.init();
    this.gameElements.person.firsstwalk();

  }
  update () {
  }
}