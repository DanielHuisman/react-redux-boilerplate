import path from 'path';
import http from 'http';
import Koa from 'koa';
import convert from 'koa-convert';
import Router from 'koa-router';
import serveStatic from 'koa-static-server';
import webpack from 'webpack';
import {devMiddleware, hotMiddleware} from 'koa-webpack-middleware';
import DashboardPlugin from 'webpack-dashboard/plugin';

import webpackConfig from '../../webpack.development';
import {rootDir, templates} from './common';
import config from './config';
import logger, {middleware as logMiddleware} from './logger';

logger.info('Server starting...');

// Compile Webpack config
const compiledWebpackConfig = webpack(webpackConfig);

// Apply Webpack Dashboard plugin
compiledWebpackConfig.apply(new DashboardPlugin());

// Initialize app and router
const app = new Koa();
const router = new Router();

// Register middleware
app.use(logMiddleware);

// Define default GET route
router.get('*', async (ctx, next) => {
    await next();

    const data = {
        staticUrl: '/static',
        bundleUrl: '/static'
    };

    // Render the template
    ctx.body = templates.index(data);
});

app.use(async (ctx, next) => {
    await next();

    // Ensure the initial response has HTML as content type (fix for https://github.com/leecade/koa-webpack-middleware/pull/38)
    if (!ctx.get('Content-Type') && ctx.get('Accept').indexOf('html') !== -1) {
        ctx.set('Content-Type', 'text/html');
    }
});

// Register webpack middleware
app.use(devMiddleware(compiledWebpackConfig, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: true,
    stats: {
        colors: true
    }
}));
app.use(hotMiddleware(compiledWebpackConfig));

// Register static file middleware
app.use(convert(serveStatic({
    rootDir: path.join(rootDir, 'static'),
    rootPath: '/static',
    ...config.static
})));

// Register router middleware
app.use(router.routes());
app.use(router.allowedMethods());

// Start server
const server = http.createServer(app.callback());
server.listen(config.port, () => {
    logger.info(`Server started listening on port ${config.port}`);
});
