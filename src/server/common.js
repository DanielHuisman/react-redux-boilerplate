import path from 'path';
import doT from 'dot';

// Determine root directory
const rootDir = path.join(__dirname, '..', '..');

// Load templates
doT.log = false;
const templates = doT.process({
    path: path.join(__dirname, 'views')
});

export {rootDir, templates};
