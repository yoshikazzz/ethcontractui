import { $ActionType } from '../types';
import { Content } from '../services/contract';

export type Content = Content;

export type TransferParams = {
  to: string;
  contentHash: string;
};

export const bookInitActionType: 'BOOK_INIT' = 'BOOK_INIT';
export type BookInitAction = $ActionType<typeof bookInitActionType, null>;

export const bookListContentsType: 'BOOK_LIST_CONTENTS' = 'BOOK_LIST_CONTENTS';
export type BookListContents = $ActionType<typeof bookListContentsType, null>;

export const bookListContentsSuccessType: 'BOOK_LIST_CONTENTS_SUCCESS' = 'BOOK_LIST_CONTENTS_SUCCESS';
export type BookListContentsSuccess = $ActionType<typeof bookListContentsSuccessType, Content[]>;

export const bookListContentsFailType: 'BOOK_LIST_CONTENTS_FAIL' = 'BOOK_LIST_CONTENTS_FAIL';
export type BookListContentsFail = $ActionType<typeof bookListContentsFailType, Error>;

export const bookTransferType: 'BOOK_TRANSFER' = 'BOOK_TRANSFER';
export type BookTransfer = $ActionType<typeof bookTransferType, TransferParams>;

export const bookTransferSuccessType: 'BOOK_TRANSFER_SUCCESS' = 'BOOK_TRANSFER_SUCCESS';
export type BookTransferSuccess = $ActionType<typeof bookTransferSuccessType, null>;

export const bookTransferFailType: 'BOOK_TRANSFER_FAIL' = 'BOOK_TRANSFER_FAIL';
export type BookTransferFail = $ActionType<typeof bookTransferFailType, Error>;

export type BookActions = 
  | BookInitAction
  | BookListContents
  | BookListContentsSuccess
  | BookListContentsFail
  | BookTransfer
  | BookTransferSuccess
  | BookTransferFail;

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

export const transferBook = (params: TransferParams): BookTransfer => {
  return {
    type: bookTransferType,
    payload: params,
  };
};

export const bookTransferSuccess = (): BookTransferSuccess => {
  return {
    type: bookTransferSuccessType,
    payload: null,
  };
};

export const bookTransferFail = (error: Error): BookTransferFail => {
  return {
    type: bookTransferFailType,
    payload: error,
  };
};
