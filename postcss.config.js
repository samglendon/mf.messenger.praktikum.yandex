// const postcssPresetEnv = require('postcss-preset-env'); // поддерживает browserslist
const postcssUrl = require('postcss-url');
const autoprefixer = require('autoprefixer');
const postcssNested = require('postcss-nested');

module.exports = {
  plugins: [
    // postcssPresetEnv({
    //   stage: 0
    // }),
    postcssUrl(),
    autoprefixer(),
    postcssNested()
  ],
};
