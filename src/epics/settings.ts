
import { Action } from '../types';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { destroy } from 'redux-form';
import {
  settingsSaveConfigActionType,
  settingsSaveConfigSuccess,
  settingsInitFail,
  settingsInitActionType,
  settingsInitSuccess,
  settingParams,
} from '../actions/settings';
import {
  remove,
  save as saveLocalStorage,
  load,
} from '../storage/expiration-storage';
import Contract from '../services/contract';
import Dashboard from '../services/dashboard';

export const saveConfig = (params: settingParams) => {
  return Observable.of({})
    .switchMap(() =>
      Promise.all([
        Dashboard.getABI(params),
      ]),
    )
    .map(([res]) => {
      destroy('settingsForm');
      return settingsSaveConfigSuccess(params);
    })
    .catch((reason: Error) => {
      return Observable.of(
        settingsInitFail(reason),
      );
    });
};

export const settingsSaveConfigEpic = (action$: ActionsObservable<Action>): Observable<Action> => {
  return action$
    .ofType(settingsSaveConfigActionType)
    .switchMap(({ payload }) => {
      remove('contract');
      saveLocalStorage('contract', payload);
      
      return saveConfig(payload);
    });
};

export const init = () => {
  return Observable.of({})
    .switchMap(() =>
      Promise.all([
        Contract.getAccount(),
        Contract.getNetwork(),
        Contract.getBalance(),
        load('contract'),
      ]),
    )
    .map(([resAccount, resNetwork, resBalance, resContract]) => {
      return settingsInitSuccess({
        network: resNetwork,
        account: resAccount,
        balance: resBalance,
        address: resContract ? resContract.address : '',
        gasLimit: resContract ? resContract.gasLimit : '',
        gasPrice: resContract ? resContract.gasPrice : '',
      });
    })
    .catch((reason: Error) => {
      return Observable.of(
        settingsInitFail(reason),
      );
    });
};

export const settingsInitEpic = (action$: ActionsObservable<Action>): Observable<Action> => {
  return action$
    .ofType(settingsInitActionType)
    .switchMap(() => {
      return init();
    });
};