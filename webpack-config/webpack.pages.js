const path = require('path');
const fs = require('fs');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets',
};

const PAGES_DIR = `${PATHS.src}/pages/`;
const PAGES = fs
    .readdirSync(PAGES_DIR)
    .filter(fileName => fileName.endsWith('.pug'));

module.exports = { PATHS, PAGES_DIR, PAGES };
