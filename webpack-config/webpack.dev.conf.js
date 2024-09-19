const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const devip = require('dev-ip');

const { PATHS } = require('./webpack.pages');

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        hot: true,
        watchFiles: [`${PATHS.src}/**/*`],
        host: Array.isArray(devip()) ? devip()[0] : devip(),
        static: {
            directory: baseWebpackConfig.externals.paths.dist,
        },
        port: 8082,
        client: {
            overlay: {
                warnings: true,
                errors: true,
            },
        },
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
        }),
    ],
});

module.exports = new Promise((resolve) => {
    resolve(devWebpackConfig);
});
