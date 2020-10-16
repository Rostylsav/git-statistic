import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import Repositories from './components/forms/repositories/repositoriesListContainer';
import repositoriesListReducer from './components/forms/repositories/repositoriesListReducer';

const rootReducer = combineReducers({
    repositories: repositoriesListReducer
});

let store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const App = () => (
    <Provider store={store}>
        <Repositories />
    </Provider>
);

render(<App />, document.getElementById('root'))