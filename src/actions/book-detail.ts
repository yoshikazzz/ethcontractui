import { $ActionType } from '../types';
import { Content } from '../services/contract';
import { PurchaseContentParams } from './store';

export type Content = Content;

export type TransferParams = {
  to: string;
  contentHash: string;
};

export const bookDetailInitActionType: 'BOOK_DETAIL_INIT' = 'BOOK_DETAIL_INIT';
export type BookDetailInitAction = $ActionType<typeof bookDetailInitActionType, null>;

export const bookDetailGetBookType: 'BOOK_DETAIL_GET_BOOK' = 'BOOK_DETAIL_GET_BOOK';
export type BookDetailGetBook = $ActionType<typeof bookDetailGetBookType, string>;

export const bookDetailGetBookSuccessType: 'BOOK_DETAIL_GET_BOOK_SUCCESS' = 'BOOK_DETAIL_GET_BOOK_SUCCESS';
export type BookDetailGetBookSuccess = $ActionType<typeof bookDetailGetBookSuccessType, Content>;

export const bookDetailGetBookFailType: 'BOOK_DETAIL_GET_BOOK_FAIL' = 'BOOK_DETAIL_GET_BOOK_FAIL';
export type BookDetailGetBookFail = $ActionType<typeof bookDetailGetBookFailType, Error>;

export const bookDetailTransferType: 'BOOK_DETAIL_TRANSFER' = 'BOOK_DETAIL_TRANSFER';
export type BookDetailTransfer = $ActionType<typeof bookDetailTransferType, TransferParams>;

export const bookDetailTransferSuccessType: 'BOOK_DETAIL_TRANSFER_SUCCESS' = 'BOOK_DETAIL_TRANSFER_SUCCESS';
export type BookDetailTransferSuccess = $ActionType<typeof bookDetailTransferSuccessType, null>;

export const bookDetailTransferFailType: 'BOOK_DETAIL_TRANSFER_FAIL' = 'BOOK_DETAIL_TRANSFER_FAIL';
export type BookDetailTransferFail = $ActionType<typeof bookDetailTransferFailType, Error>;

export const bookPurchaseType: 'STORE_PURCHASE_CONTENT' = 'STORE_PURCHASE_CONTENT';
export type StorePurchaseContent = $ActionType<typeof bookPurchaseType, PurchaseContentParams>;

export const bookPurchaseSuccessType: 'STORE_PURCHASE_CONTENT_SUCCESS' = 'STORE_PURCHASE_CONTENT_SUCCESS';
export type StorePurchaseContentSuccess = $ActionType<typeof bookPurchaseSuccessType, string>;

export const bookPurchaseFailType: 'STORE_PURCHASE_CONTENT_FAIL' = 'STORE_PURCHASE_CONTENT_FAIL';
export type StorePurchaseContentFail = $ActionType<typeof bookPurchaseFailType, Error>;

export type BookDetailActions = 
  | BookDetailInitAction
  | BookDetailGetBook
  | BookDetailGetBookSuccess
  | BookDetailGetBookFail
  | BookDetailTransfer
  | BookDetailTransferSuccess
  | BookDetailTransferFail;

export const bookDetailInit = (): BookDetailInitAction => {
  return {
    type: bookDetailInitActionType,
    payload: null,
  };
};

export const getBook = (contentHash: string): BookDetailGetBook => {
  return {
    type: bookDetailGetBookType,
    payload: contentHash,
  };
};

export const bookDetailGetBookSuccess = (book: Content): BookDetailGetBookSuccess => {
  return {
    type: bookDetailGetBookSuccessType,
    payload: book,
  };
};

export const bookDetailGetBookFail = (error: Error): BookDetailGetBookFail => {
  return {
    type: bookDetailGetBookFailType,
    payload: error,
  };
};

export const transferBook = (params: TransferParams): BookDetailTransfer => {
  return {
    type: bookDetailTransferType,
    payload: params,
  };
};

export const bookDetailTransferSuccess = (): BookDetailTransferSuccess => {
  return {
    type: bookDetailTransferSuccessType,
    payload: null,
  };
};

export const bookDetailTransferFail = (error: Error): BookDetailTransferFail => {
  return {
    type: bookDetailTransferFailType,
    payload: error,
  };
};

export const bookPurchase = (params: PurchaseContentParams): StorePurchaseContent => {
  return {
    type: bookPurchaseType,
    payload: params,
  };
};

export const bookPurchaseSuccess = (txHash: string): StorePurchaseContentSuccess => {
  return {
    type: bookPurchaseSuccessType,
    payload: txHash,
  };
};

export const bookPurchaseFail = (error: Error): StorePurchaseContentFail => {
  return {
    type: bookPurchaseFailType,
    payload: error,
  };
};
