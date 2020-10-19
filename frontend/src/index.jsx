import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects';

import Repositories from './components/forms/repositories/repositoriesListContainer';
import repositoriesListReducer from './components/forms/repositories/repositoriesListReducer';
import repositoriesClient from './sagas/repositoriesClient';

import Users from './components/forms/users/usersListContainer';
import usersListReducer from './components/forms/users/usersListReducer';

import Statistic from './components/statistic/statisticContainer';
import statisticReducer from './components/statistic/statisticReducer';

import './index.scss';
import statisticClient from './sagas/statisticClient';

const rootReducer = combineReducers({
    repositories: repositoriesListReducer,
    users: usersListReducer,
    statistic: statisticReducer
});

const temp = [];
if (typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'function') {
    temp.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

const sagaMiddleware = createSagaMiddleware()

let store = createStore(
    rootReducer,
    {},
    compose(
        applyMiddleware(sagaMiddleware),
        ...temp
    )
);

function* rootSaga() {
    yield all([
        repositoriesClient(),
        statisticClient()
    ])
  }

sagaMiddleware.run(rootSaga);

const App = () => (
    <Provider store={store}>
        <div className="config-container"> 
            <div className="repositories-container">
                <div className="info">
                    Please add repositories for which you want to get statistic
                </div>
                <Repositories />
            </div>
            <div className="users-container">
                <div className="info">
                    Please add users for which you want to get statistic
                </div>
                <Users />
            </div>
        </div>
        <Statistic />
        
    </Provider>
);

render(<App />, document.getElementById('root'))