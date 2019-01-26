import utils from '../utils.js'
import WebFont from 'webfontloader'

export default class extends Phaser.State {
  preload () {
    this.preload_bg = this.add.image(this.game.world.centerX, this.game.world.centerY, 'preload_bg');
    var bg_w = this.preload_bg.width;
    var bg_h = this.preload_bg.height;
    this.preload_bg.anchor.setTo(0.5);
    this.preload_bg.width = this.game.width;
    this.preload_bg.height = this.game.height;
    var scaleWidth = this.game.width / bg_w;
    var scaleHeight = this.game.height / bg_h;

    this.logo = this.add.image(0, 200, 'preload_logo');
    this.logo.width = 216;
    this.logo.height = 200;
    this.logo.centerX = this.game.world.centerX;
    // this.logo.alpha = 0.25;

    this.preloadBar = this.add.sprite(0, 0, 'preload_bar');
    this.preloadBar.scale.setTo(scaleWidth, scaleHeight);
    this.preloadBar.anchor.setTo(0, 0);
    this.preloadBar.x = this.game.world.centerX - this.preloadBar.width / 2;
    this.preloadBar.y = this.game.world.centerY + this.preloadBar.height - 8 * scaleHeight;

    this.load.setPreloadSprite(this.preloadBar);

    // Load Game Assets
    WebFont.load({
      custom: {
        families: [
          'Merriweather'
        ]
      },
      active: this.fontsLoaded.bind(this)
    })

    this.load.image('background', utils.fixFilePath(require('../../assets/images/background.jpg')));
    this.load.atlas(
      'person',
      utils.fixFilePath(require('../../assets/sprite/.build/sprite_person.png')),
      utils.fixFilePath(require('../../assets/sprite/.build/sprite_person.json'))
    );
    // this.load.atlas(
    //   'items',
    //   utils.fixFilePath(require('../../assets/sprite/.build/sprite_items.png')),
    //   utils.fixFilePath(require('../../assets/sprite/.build/sprite_items.json'))
    // );
    // this.load.audio('sound_final', utils.fixFilePath(require('../../assets/sound/sound_final.mp3')));
    // this.load.audio('sound_start', utils.fixFilePath(require('../../assets/sound/sound_start.mp3')));
    // this.load.audio('sound_tapitem', utils.fixFilePath(require('../../assets/sound/sound_tapitem.mp3')));
    // this.load.audio('sound_typewriter', utils.fixFilePath(require('../../assets/sound/sound_typewriter.mp3')));
  }
  update () {
    if (this.fontsReady && this.assetsLoaded) {
      var invalidImgKeys = utils.getInvalidImageKeys(this.game);
      if (invalidImgKeys.length) {
        utils.validateImages(this.game, invalidImgKeys)
      } else {
        this.state.start('Game');
      }
    }
  }

  fontsLoaded () {
    this.fontsReady = true
    let loadingTextStyle = {
      font: 'bold 57px Merriweather',
      fill: '#ffffff'
    }
    this.preload_text = this.add.text(
      this.game.world.centerX,
      this.game.world.centerY + this.game.height / 4,
      'loading',
      loadingTextStyle
    );
    this.preload_text.anchor.setTo(0.5);
  }

  create () {
    this.stage.disableVisibilityChange = true;
    this.assetsLoaded = true
  }
}
