import path from 'path';
import dotenv from 'dotenv';
import doT from 'dot';

// Determine root directory
const rootDir = path.join(__dirname, '..', '..');

// Load environment variables
dotenv.config({
    path: path.join(rootDir, '.env.server')
});

// Load templates
doT.log = false;
const templates = doT.process({
    path: path.join(__dirname, 'views')
});

export {rootDir, templates};
