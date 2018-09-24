import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';

import { Provider } from 'react-redux';
import store, { history } from './store';
import {
  Route,
  Switch,
} from 'react-router-dom';

import { ConnectedRouter } from 'react-router-redux';

import AppRouting from './routes/app-routing';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" component={AppRouting} />
        </Switch>
      </ConnectedRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
