
import { Action } from '../types';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import {
  storeListContentsType,
  storeListContentsSuccess,
  storeListContentsFail,
  storePurchaseContentFail,
  storePurchaseContentSuccess,
  storePurchaseContentType,
} from '../actions/store';

import SmartContracts from '../services/contract';

export const listContents = () => {
  return Observable.of({})
    .switchMap(() => SmartContracts.getStoreContents())
    .map((contents) => {
      return storeListContentsSuccess(contents);
    })
    .catch((reason: Error) => {
      return Observable.of(
        storeListContentsFail(reason),
      );
    });
};

export const purchaseContent = (contentHash: string, price: number) => {
  return Observable.of({})
    .switchMap(() => SmartContracts.purchaseContent(contentHash, price))
    .map((hash) => {
      return storePurchaseContentSuccess(hash);
    })
    .catch((reason: Error) => {
      return Observable.of(
        storePurchaseContentFail(reason),
      );
    });
};

// Epics
export const listContentsEpic = (action$: ActionsObservable<Action>): Observable<Action> => {
  return action$
    .ofType(storeListContentsType)
    .switchMap(() => listContents());
};

export const purchaseContentEpic = (action$: ActionsObservable<Action>): Observable<Action> => {
  return action$
    .ofType(storePurchaseContentType)
    .switchMap(({ payload }) => purchaseContent(payload.contentHash, payload.price));
};
