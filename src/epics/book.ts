
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

import {
  bookDetailGetBookType,
  bookDetailGetBookSuccess,
  bookDetailGetBookFail,
  bookDetailTransferType,
  bookDetailTransferSuccess,
  bookDetailTransferFail
} from '../actions/book-detail';

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

export const transfeDetailBook = (to, hash) => {
  return Observable.of({})
    .switchMap(() => SmartContracts.tranferContent(to, hash))
    .map((res) => bookDetailTransferSuccess())
    .catch((reason: Error) => {
      return Observable.of(
        bookDetailTransferFail(reason),
      );
    });
};

export const getBookDetail = (hash) => {
  return Observable.of({})
    .switchMap(async () => {
      const bookList = await SmartContracts.getStoreContents();
      const myBooks = await SmartContracts.getMyBooks();
      let result: any = {};
      const bookResult = myBooks.find(book => book.contentHash === hash);
      if (bookResult === undefined) {
        const bookInStore = bookList.find(book => book.contentHash === hash);
        if (bookInStore === undefined) {
          throw new Error('This book not found');
        }
        result.book = bookInStore;
        result.isMyBook = false;
        return result;
      }
      result.book = bookResult;
      result.isMyBook = true;
      return result;
    })
    .map((book) => bookDetailGetBookSuccess(book))
    .catch((reason: Error) => {
      return Observable.of(
        bookDetailGetBookFail(reason),
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

export const bookDetailGetBookEpic = (action$: ActionsObservable<Action>): Observable<Action> => {
  return action$
  .ofType(bookDetailGetBookType)
  .switchMap(({payload}) => getBookDetail(payload));
};

export const bookDetailTransferEpic = (action$: ActionsObservable<Action>): Observable<Action> => {
  return action$
    .ofType(bookDetailTransferType)
    .switchMap(({payload}) => transfeDetailBook(payload.to, payload.contentHash));
};