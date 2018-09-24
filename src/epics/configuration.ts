
import { Action } from '../types';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import {
  configurationInitActionType,
  configurationInitSuccess,
  configurationInitFail,
} from '../actions/configuration';
import Config from '../services/config';

export const configLoad = () => {
  return Observable.of({})
    .switchMap(() =>
      Promise.all([
        Config.getConfig(),
        Config.getScaffoldConfig(),
      ]),
    )
    .map(([displayConfig, abiConfig]) => {
      return configurationInitSuccess({display: displayConfig.data, abi: abiConfig.data});
    })
    .catch((reason: Error) => {
      return Observable.of(
        configurationInitFail(reason),
      );
    });
};

export const configurationInitEpic = (action$: ActionsObservable<Action>): Observable<Action> => {
  return action$
    .ofType(configurationInitActionType)
    .switchMap(() => {
      return configLoad();
    });
};
