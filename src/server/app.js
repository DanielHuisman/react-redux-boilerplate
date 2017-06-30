import path from 'path';
import zlib from 'zlib';
import Koa from 'koa';
import convert from 'koa-convert';
import Router from 'koa-router';
import helmet from 'koa-helmet';
import responseTime from 'koa-response-time';
import conditionalGet from 'koa-conditional-get';
import etag from 'koa-etag';
import compress from 'koa-compress';
import serveStatic from 'koa-static-server';

import config, {clientConfig} from './config';
import {templates} from './common';
import {middleware as logMiddleware} from './logger';

// Initialize Koa application
const app = new Koa();
const router = new Router();

// Register middleware
app.use(logMiddleware);
app.use(helmet());
app.use(responseTime());
app.use(conditionalGet());
app.use(etag());
app.use(compress({
    flush: zlib.Z_SYNC_FLUSH
}));

// Define default GET route
router.get('*', async (ctx, next) => {
    await next();

    const data = {
        staticUrl: '/static',
        bundleUrl: '/dist',
        config: JSON.stringify(clientConfig)
    };

    // Render the template
    ctx.body = templates.index(data);
});

// Register static file middleware
app.use(convert(serveStatic({
    rootDir: path.join(__dirname, '..', 'static'),
    rootPath: '/static',
    ...config.static
})));
app.use(convert(serveStatic({
    rootDir: path.join(__dirname, '..', 'client'),
    rootPath: '/dist',
    ...config.static
})));

// Register router middleware
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
