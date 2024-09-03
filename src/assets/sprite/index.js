const svgSpriteInjector = require('svg-sprite-injector');
const svgFiles = require.context('../sprite', true, /\.svg$/);
svgFiles.keys().forEach(key => svgFiles(key));
svgSpriteInjector('assets/img/sprite.svg');
