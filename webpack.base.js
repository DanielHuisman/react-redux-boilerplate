import path from 'path';
import dotenv from 'dotenv';
import webpack from 'webpack';

// Load configuration
const config = dotenv.config({
    path: path.join(__dirname, '.env.client')
});

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
        publicPath: '/static/'
    },
    resolve: {
        modules: [
            'src',
            'node_modules'
        ],
        extensions: ['.json', '.js', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
            CONFIG: JSON.stringify(config)
        })
    ],
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
