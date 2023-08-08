const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    externals: [nodeExternals()],
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, '.env'), to: '.' },
                { from: path.resolve(__dirname, 'prod_package_json.json'), to: 'package.json' },
            ],
        }),
    ],
});
