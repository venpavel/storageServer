const path = require('path');

module.exports = {
    entry: {
        app: './server.js',
    },
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js',
        clean: true,
    },
    resolve: {
        extensions: ['.js'],
    },
};
