import path from 'path';
import mkdirp from 'mkdirp';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import chalk from 'chalk';

import config from './config';

// Create log directories
mkdirp.sync(path.dirname(config.log));

// Create Winston instance
const log = new winston.Logger({
    transports: [
        new winston.transports.Console({
            colorize: true,
            timestamp: true,
            level: process.env.NODE_ENV === 'production' ? 'info' : 'debug'
        }),
        new DailyRotateFile({
            filename: config.log,
            timestamp: true,
            level: 'debug'
        })
    ]
});

const STATUS_COLORS = {
    error: 'red',
    warn: 'yellow',
    info: 'green'
};

export default log;

export const middleware = async (ctx, next) => {
    // Calculate response time
    const start = new Date();
    try {
        await next();
    } catch (err) {
        // Log the error message
        log.error(err.message);
    }
    const responseTime = new Date() - start;

    // Determine log level
    let level = 'info';
    if (ctx.status >= 500) {
        level = 'error';
    }
    if (ctx.status >= 400) {
        level = 'warn';
    }

    // Construct message
    const message = [
        chalk.gray(`${ctx.method} ${ctx.originalUrl}`),
        chalk[STATUS_COLORS[level]](`${ctx.status}`),
        chalk.gray(`${responseTime}ms`)
    ].join(' ');

    // Log the message
    log.log(level, message);
};
