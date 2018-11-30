import * as React from 'react';
import { Route, Switch } from 'react-router';
import Layout from '../containers/layout/index';
import SettingsContainer from '../containers/settings';
import DashboardContainer from '../containers/dashboard';
import StoreContainer from '../containers/store';
import BookContainer from '../containers/book';

export default function AppRouting() {
  return (
    <Route
      render={({ location }) => (
        // @ts-ignore
        <Layout location={location} >
          <Switch>
            <Route exact={true} path="/" component={DashboardContainer} />
            <Route exact={true} path="/settings" component={SettingsContainer} />
            <Route exact={true} path="/store" component={StoreContainer} />
            <Route exact={true} path="/book" component={BookContainer} />
          </Switch>
        </Layout>
      )}
    />
  );
}