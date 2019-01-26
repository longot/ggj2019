import utils from '../utils'

export default class extends Phaser.State {
  init () {
    // this.game.pdebug = this.game.plugins.add(Phaser.Plugin.Debug);

    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.setShowAll();
    this.game.scale.refresh();

    utils.setGameSize(this.game)
    window.addEventListener('resize', utils.setGameSize.bind(null, this.game))
  }
  preload () {
    this.load.image('preload_bg', utils.fixFilePath(require('../../assets/images/background_boot.jpg')));
    this.load.image('preload_bar', utils.fixFilePath(require('../../assets/images/loader.png')));
    this.load.image('preload_logo', utils.fixFilePath(require('../../assets/images/logo.png')));
  }
  update () {
    var invalidImgKeys = utils.getInvalidImageKeys(this.game);
    if (invalidImgKeys.length) {
      utils.validateImages(this.game, invalidImgKeys)
    } else {
      this.state.start('Preload');
    }
  }
  create () { }
}