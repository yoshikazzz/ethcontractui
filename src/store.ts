import { applyMiddleware, createStore, combineReducers } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
// import { enthusiasm } from './reducers/index';
import { StoreState } from './types/index';
import rootEpic from './epics';

import createHistory from 'history/createHashHistory';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { dashboard as dashboardReducer } from './reducers/dashboard';
import { settings as settingsReducer } from './reducers/settings';
import { configuration as configurationReducer } from './reducers/configuration';

export const history = createHistory();

// Logger with default options
// import logger from 'redux-logger';
const epicMiddleware = createEpicMiddleware(rootEpic);

const middlewares = [epicMiddleware, routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

const store = createStore<StoreState>(
  combineReducers({
    // enthusiasm,
    router: routerReducer,
    form: formReducer,
    dashboard: dashboardReducer,
    settings: settingsReducer,
    configuration: configurationReducer,
  }),
  applyMiddleware(...middlewares)
);

export default store;
