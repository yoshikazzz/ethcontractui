
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
    .switchMap(() => SmartContracts.getMyBooks())
    .map((contents) => bookListContentsSuccess(contents))
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