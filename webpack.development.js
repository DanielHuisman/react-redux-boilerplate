import webpack from 'webpack';

import base from './webpack.base';

export default {
    ...base,
    devtool: 'source-map',
    entry: {
        main: [
            'react-hot-loader/patch',
            'webpack-hot-middleware/client',
            ...base.entry.main
        ]
    },
    plugins: [
        ...base.plugins,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    devServer: {
        host: 'localhost',
        port: 4000,
        historyApiFallback: true,
        hot: true
    }
};
