
import { Action } from '../types';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import {
  dashboardLoadContractActionType,
  dasboardLoadContractSuccess,
  dasboardLoadContractFail,
  getAbiParams,
} from '../actions/dashboard';
import Dashboard from '../services/dashboard';

export const loadAbi = (params: getAbiParams) => {
  return Observable.of({})
    .switchMap(() =>
      Promise.all([
        Dashboard.getABI(params),
      ]),
    )
    .map(([res]) => {
      return dasboardLoadContractSuccess(res);
    })
    .catch((reason: Error) => {
      return Observable.of(
        dasboardLoadContractFail(reason),
      );
    });
};

export const dashboardLoadContractEpic = (action$: ActionsObservable<Action>): Observable<Action> => {
  return action$
    .ofType(dashboardLoadContractActionType)
    .switchMap(({ payload }) => {
      return loadAbi(payload);
    });
};
