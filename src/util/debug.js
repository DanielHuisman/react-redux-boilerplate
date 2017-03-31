import debug from 'debug';

const getDebugger = () => {
    if (process.env.NODE_ENV === 'production') {
        return () => () => {};
    }

    debug.enable('*');
    return debug;
};

export default getDebugger();
