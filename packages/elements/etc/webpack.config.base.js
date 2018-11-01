const path = require('path');

module.exports = {
    mode: 'production',

    devtool:  'source-map',

    entry: {
        'elements': path.resolve(__dirname, '../src/elements.ts')
    },

    output: {
        globalObject: 'typeof self !== \'undefined\' ? self : this',
        path: path.resolve(__dirname, '../dist'),
        libraryTarget: 'umd',
        library: 'elements',
        umdNamedDefine: true
    },

    module: {
        rules: [{
            test: /\.ts?$/,
            exclude: /node_modules/,
            loader: 'awesome-typescript-loader'
        }]
    },

    resolve: {
        extensions: ['.ts']
    }
};
