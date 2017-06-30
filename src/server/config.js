import path from 'path';
import dotenv from 'dotenv';

// Determine root directory
const rootDir = path.join(__dirname, '..', '..');

// Load environment variables
const clientConfig = dotenv.load({
    path: path.join(rootDir, '.env.client')
}).parsed;
const serverConfig = dotenv.load({
    path: path.join(rootDir, '.env.server')
}).parsed;

// Load environment variables passed by the OS
for (const [key, value] of Object.entries(process.env)) {
    if (key.indexOf('CLIENT_') === 0) {
        clientConfig[key.substring(7)] = value;
    } else if (key.indexOf('SERVER_') === 0) {
        serverConfig[key.substring(7)] = value;
    }
}

export {clientConfig, serverConfig};

export default {
    port: serverConfig.PORT ? parseInt(serverConfig.PORT) : 4000,

    log: path.join(__dirname, '..', '..', 'logs', 'server.log'),

    static: {}
};
