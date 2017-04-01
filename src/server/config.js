import path from 'path';

export default {
    port: process.env.PORT ? parseInt(process.env.PORT) : 4000,

    log: path.join(__dirname, '..', '..', 'logs', 'server.log'),

    static: {}
};
