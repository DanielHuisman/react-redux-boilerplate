import path from 'path';

const outputDir = path.join(__dirname, 'dist', 'client');

export default {
    devtool: 'source-map',
    entry: {
        main: [
            'babel-polyfill',
            './src/client/index.js'
        ]
    },
    output: {
        path: outputDir,
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    resolve: {
        modules: [
            'src',
            'node_modules'
        ],
        extensions: ['.json', '.js', '.jsx']
    },
    plugins: [],
    module: {
        rules: [{
            test: /\.jsx?/,
            exclude: /node_modules/,
            enforce: 'pre',
            loader: 'eslint-loader'
        }, {
            test: /\.jsx?/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
};
