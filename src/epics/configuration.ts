
import { Action } from '../types';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import {
  configurationInitActionType,
  configurationInitSuccess,
  configurationInitFail,
} from '../actions/configuration';
import Config from '../services/config';
import Contract from '../services/contract';

export const configLoad = () => {
  return Observable.of({})
    .switchMap(() =>
      Promise.all([
        Contract.getNetwork(),
        Config.getConfig(),
        Config.getScaffoldConfig(),
      ]),
    )
    .map(([resNetwork, displayConfig, abiConfig]) => {
      return configurationInitSuccess({
        networkId: resNetwork,
        display: displayConfig.data,
        abi: abiConfig.data,
      });
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
