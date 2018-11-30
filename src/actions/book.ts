import { $ActionType } from '../types';
import { Content } from '../services/contract';

export type Content = Content;

export const bookInitActionType: 'BOOK_INIT' = 'BOOK_INIT';
export type BookInitAction = $ActionType<typeof bookInitActionType, null>;

export const bookListContentsType: 'BOOK_LIST_CONTENTS' = 'BOOK_LIST_CONTENTS';
export type BookListContents = $ActionType<typeof bookListContentsType, null>;

export const bookListContentsSuccessType: 'BOOK_LIST_CONTENTS_SUCCESS' = 'BOOK_LIST_CONTENTS_SUCCESS';
export type BookListContentsSuccess = $ActionType<typeof bookListContentsSuccessType, Content[]>;

export const bookListContentsFailType: 'BOOK_LIST_CONTENTS_FAIL' = 'BOOK_LIST_CONTENTS_FAIL';
export type BookListContentsFail = $ActionType<typeof bookListContentsFailType, Error>;

export type BookActions = 
  | BookInitAction
  | BookListContents
  | BookListContentsSuccess
  | BookListContentsFail;

export const bookInit = (): BookInitAction => {
  return {
    type: bookInitActionType,
    payload: null,
  };
};

export const listBooks = (): BookListContents => {
  return {
    type: bookListContentsType,
    payload: null,
  };
};

export const bookListContentsSuccess = (contents: Content[]): BookListContentsSuccess => {
  return {
    type: bookListContentsSuccessType,
    payload: contents,
  };
};

export const bookListContentsFail = (error: Error): BookListContentsFail => {
  return {
    type: bookListContentsFailType,
    payload: error,
  };
};