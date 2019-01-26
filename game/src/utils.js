import config from './config'

const windowSize = {
  width: window.innerWidth,
  height: window.innerHeight
};
const gameSize = {
  width: config.width,
  height: config.height
};

window.PhaserGlobal = {
};

let isGameDisplayed = false

function runWhenWindowRightSize (gameInstance) {
  if (!runWhenWindowRightSize.timer) {
    runWhenWindowRightSize.timer = setInterval(() => {
      if (window.innerHeight > 10) {
        setGameSize(gameInstance)
        clearInterval(runWhenWindowRightSize.timer)
        runWhenWindowRightSize.timer = null
      }
    }, 50)
  }
}
runWhenWindowRightSize.timer = null

function setGameSize (gameInstance) {
  windowSize.width  = window.innerWidth,
  windowSize.height = window.innerHeight
  windowSize.gameWidth  = Math.min(Math.round(windowSize.height * 16 / 9), windowSize.width);
  windowSize.gameHeight = Math.min(Math.round(windowSize.width * 9 / 16), windowSize.height);

  let margin = Math.max(10, Math.round(windowSize.width * 2.5 / 100))
  let ws = (windowSize.width - margin * 2) / windowSize.width

  gameSize.width = Math.round(windowSize.gameWidth * ws)
  gameSize.height = Math.round(windowSize.gameHeight * ws)

  let divWrapper = document.getElementById('game')
  divWrapper.style.top = Math.round((windowSize.height - gameSize.height) / 2) + 'px'
  divWrapper.style.left = Math.round((windowSize.width - gameSize.width) / 2) + 'px'
  divWrapper.style.width = gameSize.width + 'px'
  divWrapper.style.height = gameSize.height + 'px'
}

function fixFilePath (filePath) {
  if (filePath.indexOf('./') === 0) {
    filePath = filePath.slice(2, filePath.length)
  }
  return filePath;
}

function validateImages (game, keys) {
  if (keys) {
    keys.forEach(key => {
      let img = game.cache.getImage(key, true);
      if (!img.base.hasLoaded && img.data.complete) {
        game.cache.addImage(key, null, img.data)
      }
    })
  }
}

function getInvalidImageKeys (game) {
  let keys = game.cache.getKeys();
  let invalidKeys = [];
  if (keys) {
    keys.forEach(key => {
      let img = game.cache.getImage(key, true);
      if (!img.base.hasLoaded) {
        invalidKeys.push(key);
      }
    });
  }
  return invalidKeys;
}

// define global functions
export default {
  runWhenWindowRightSize,
  setGameSize,
  fixFilePath,
  getInvalidImageKeys,
  validateImages
}
