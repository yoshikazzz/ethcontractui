import { InitAction } from '../actions/init';
import { DashboardActions } from '../actions/dashboard';
import { SettingsActions } from '../actions/settings';
import { ConfigurationActions, displayConfigParams, colorConfigs } from '../actions/configuration';

import { RouterState } from 'react-router-redux';
import { FormState } from 'redux-form';
import { State as DashboardState } from '../reducers/dashboard';
import { State as SettingsState } from '../reducers/settings';
import { State as ConfigurationState, AbiConfigParam } from '../reducers/configuration';

import { Store as ReduxStore } from 'redux';

export interface StoreState {
  router: RouterState;
  form: FormState;
  dashboard: DashboardState;
  settings: SettingsState;
  configuration: ConfigurationState;
}

export type Action = 
  | InitAction
  | DashboardActions
  | SettingsActions
  | ConfigurationActions;

export type $ActionType<T, P> = {
  type: T,
  payload: P, 
};
  
export type Dispatcher<T> = {
  dispatch: (a: T | Promise<T>) => any,
};

export type Store = ReduxStore<StoreState>;

export type AbiConfigParam = AbiConfigParam;
export type DisplayConfigParams = displayConfigParams;
export type ColorConfig = colorConfigs;

export type PromiseCancelable<T> = {
  promise: Promise<T>,
  cancel: () => void,
};
