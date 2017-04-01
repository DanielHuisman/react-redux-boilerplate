import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import Root from './containers/Root';

// Render a component using React
const render = (Component) => {
    ReactDOM.render(
        <AppContainer component={Component} />,
        document.getElementById('root')
    );
};

// Render the initial root component
render(Root);

// Set up hot loading if enabled
if (module.hot) {
    module.hot.accept('./containers/Root', () => {
        const NewRoot = require('./containers/Root').default;
        render(NewRoot);
    });
}
