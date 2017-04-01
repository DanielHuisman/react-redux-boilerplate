import http from 'http';
import 'babel-polyfill';

import app from './app';
import config from './config';
import logger from './logger';

// Start server
const server = http.createServer(app.callback());
server.listen(config.port, () => {
    logger.info(`Server started listening on port ${config.port}`);
});

export default server;
