
import { Action } from '../types';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import {
  bookListContentsType,
  bookListContentsSuccess,
  bookListContentsFail,
} from '../actions/book';

import SmartContracts from '../services/contract';

export const listContents = () => {
  return Observable.of({})
    .switchMap(async () => {
      const num = await SmartContracts.getMyBooks();
      console.log(num);
      return SmartContracts.getStoreContents();
    })
    .map((contents) => {
      return bookListContentsSuccess(contents);
    })
    .catch((reason: Error) => {
      return Observable.of(
        bookListContentsFail(reason),
      );
    });
};

// Epics
export const bookListContentsEpic = (action$: ActionsObservable<Action>): Observable<Action> => {
  return action$
    .ofType(bookListContentsType)
    .switchMap(() => listContents());
};