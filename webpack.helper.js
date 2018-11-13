const path = require('path');

module.exports = function(libraryName, dirname) {

    var config = {
        mode: 'production',

        devtool:  'source-map',

        entry: {
            // 'space-groups': path.resolve(dirname, './src/index.ts')
        },

        output: {
            globalObject: 'typeof self !== \'undefined\' ? self : this',
            path: path.resolve(dirname, './dist'),
            libraryTarget: 'umd',
            library: libraryName,
            umdNamedDefine: true
        },

        module: {
            rules: [{
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader'
            }]
        },

        resolve: {
            extensions: ['.ts', '.tsx', ".js", ".jsx"]
        }
    };

    // Set Entry Point
    config['entry'][libraryName] = path.resolve(dirname, './src/index.ts');

    return config;
}
