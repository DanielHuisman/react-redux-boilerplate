import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';

import history from './history';
import rootReducer from './reducers';

// Apply Redux middleware
const middleware = applyMiddleware(
    routerMiddleware(history)
);

let enhancer = null;
if (process.env.NODE_ENV === 'production') {
    enhancer = middleware;
} else {
    // Inject Redux Dev Tools if the client has the Chrome extension installed
    enhancer = compose(
        middleware,
        window.devToolsExtension ? window.devToolsExtension() : (f) => f
    );
}

const store = createStore(
    rootReducer,
    {},
    enhancer
);

export default store;
