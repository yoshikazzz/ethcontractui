
import { Action } from '../types';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import {
  bookListContentsType,
  bookListContentsSuccess,
  bookListContentsFail,
  bookTransferType,
  bookTransferSuccess,
  bookTransferFail,
} from '../actions/book';

import SmartContracts from '../services/contract';

export const listContents = () => {
  return Observable.of({})
    .switchMap(() => SmartContracts.getMyBooks())
    .map((contents) => bookListContentsSuccess(contents))
    .catch((reason: Error) => {
      return Observable.of(
        bookListContentsFail(reason),
      );
    });
};

export const transferBook = (to, hash) => {
  return Observable.of({})
    .switchMap(() => SmartContracts.tranferContent(to, hash))
    .map((res) => bookTransferSuccess())
    .catch((reason: Error) => {
      return Observable.of(
        bookTransferFail(reason),
      );
    });
};

// Epics
export const bookListContentsEpic = (action$: ActionsObservable<Action>): Observable<Action> => {
  return action$
    .ofType(bookListContentsType)
    .switchMap(() => listContents());
};

export const bookTransferEpic = (action$: ActionsObservable<Action>): Observable<Action> => {
  return action$
    .ofType(bookTransferType)
    .switchMap(({payload}) => transferBook(payload.to, payload.contentHash));
};
