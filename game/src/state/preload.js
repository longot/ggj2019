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
    // this.load.image('bathroom', utils.fixFilePath(require('../../assets/images/room/bathroom.jpg')));
    this.load.image('bedroom', utils.fixFilePath(require('../../assets/images/room/bedroom.jpg')));
    this.load.image('emptyroom', utils.fixFilePath(require('../../assets/images/room/empty.jpg')));
    this.load.image('kitchen', utils.fixFilePath(require('../../assets/images/room/kitchen.jpg')));
    // this.load.image('living_z', utils.fixFilePath(require('../../assets/images/room/living_z.jpg')));
    // this.load.image('livingroom', utils.fixFilePath(require('../../assets/images/room/living-room.jpg')));
    this.load.image('item_rectangular', utils.fixFilePath(require('../../assets/images/item/rectangular.png')));
    this.load.image('item_beer', utils.fixFilePath(require('../../assets/images/item/beer.png')));
    this.load.image('item_bread', utils.fixFilePath(require('../../assets/images/item/bread.png')));
    this.load.image('item_blade', utils.fixFilePath(require('../../assets/images/item/blade.png')));
    this.load.image('item_beer_mask', utils.fixFilePath(require('../../assets/images/item/beer_mask.png')));
    this.load.image('item_bread_mask', utils.fixFilePath(require('../../assets/images/item/bread_mask.png')));
    this.load.image('item_blade_mask', utils.fixFilePath(require('../../assets/images/item/blade_mask.png')));
    this.load.spritesheet('button_start', utils.fixFilePath(require('../../assets/sprite/buttons/button_sprite_start.png')), 247, 62);

    this.load.image('sheep', utils.fixFilePath(require('../../assets/images/sheep.png')));
    this.load.image('bullet', utils.fixFilePath(require('../../assets/images/shmup-bullet.png')));
    // this.load.spritesheet('bullet', utils.fixFilePath(require('../../assets/images/rgblaser.png')), 10, 10);
    this.load.image('machinegun', utils.fixFilePath(require('../../assets/images/machine-gun.png')));

    this.load.atlas(
      'person',
      utils.fixFilePath(require('../../assets/sprite/.build/sprite_person.png')),
      utils.fixFilePath(require('../../assets/sprite/.build/sprite_person.json'))
    );
    this.load.atlas(
      'doors',
      utils.fixFilePath(require('../../assets/sprite/.build/sprite_doors.png')),
      utils.fixFilePath(require('../../assets/sprite/.build/sprite_doors.json'))
    );
    // this.load.audio('sound_final', utils.fixFilePath(require('../../assets/sound/sound_final.mp3')));
    this.load.audio('door_open', utils.fixFilePath(require('../../assets/sound/door_open.mp3')));
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
