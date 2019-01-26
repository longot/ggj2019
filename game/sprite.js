const spritesheet = require('spritesheet-js');
const path = require('path');
const spritepath = path.resolve(__dirname, './assets/sprite')
const spritefolder = require(path.resolve(spritepath, 'sprite.json'));

spritefolder.forEach(
  (folder) => {
    spritesheet(
      path.resolve(spritepath, folder, '*.png'),
      {
        trim: true,
        format: 'jsonarray',
        padding: 5,
        path: `${spritepath}/.build`,
        name: `sprite_${folder}`
      },
      function (err) {
        if (err) {
          throw err;
          console.log(err)
        };
        console.log('spritesheet successfully generated');
      }
    );
  }
);
