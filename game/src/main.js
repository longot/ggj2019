import BootState from './state/boot'
import PreloadState from './state/preload'
import GameState from './state/game'

import './fonts.css'
import config from './config'
// import utils from './utils'

class SampleGame extends Phaser.Game {
  constructor (configs) {
    super(configs)

    this.state.add('Boot', BootState, false)
    this.state.add('Preload', PreloadState, false)
    // this.state.add('Menu', MenuState, false)
    this.state.add('Game', GameState, false)
    // this.state.add('Finish', FinishState, false)
  }
}

const THIS_GAME = new SampleGame(config)

THIS_GAME.state.start('Boot');

if (__DEV__) {
  console.log(`Build hash: ${__webpack_hash__}`)
}

