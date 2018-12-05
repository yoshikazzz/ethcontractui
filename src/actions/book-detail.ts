import { $ActionType } from '../types';
import { Content } from '../services/contract';
import { PurchaseContentParams, bookDetailSuccessParams } from './store';

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
export type BookDetailGetBookSuccess = $ActionType<typeof bookDetailGetBookSuccessType, bookDetailSuccessParams>;

export const bookDetailGetBookFailType: 'BOOK_DETAIL_GET_BOOK_FAIL' = 'BOOK_DETAIL_GET_BOOK_FAIL';
export type BookDetailGetBookFail = $ActionType<typeof bookDetailGetBookFailType, Error>;

export const bookDetailTransferType: 'BOOK_DETAIL_TRANSFER' = 'BOOK_DETAIL_TRANSFER';
export type BookDetailTransfer = $ActionType<typeof bookDetailTransferType, TransferParams>;

export const bookDetailTransferSuccessType: 'BOOK_DETAIL_TRANSFER_SUCCESS' = 'BOOK_DETAIL_TRANSFER_SUCCESS';
export type BookDetailTransferSuccess = $ActionType<typeof bookDetailTransferSuccessType, null>;

export const bookDetailTransferFailType: 'BOOK_DETAIL_TRANSFER_FAIL' = 'BOOK_DETAIL_TRANSFER_FAIL';
export type BookDetailTransferFail = $ActionType<typeof bookDetailTransferFailType, Error>;

export const bookDetailPurchaseType: 'STORE_PURCHASE_CONTENT' = 'STORE_PURCHASE_CONTENT';
export type BookDetailPurchase = $ActionType<typeof bookDetailPurchaseType, PurchaseContentParams>;

export const bookDetailPurchaseSuccessType: 'STORE_PURCHASE_CONTENT_SUCCESS' = 'STORE_PURCHASE_CONTENT_SUCCESS';
export type BookDetailPurchaseSuccess = $ActionType<typeof bookDetailPurchaseSuccessType, string>;

export const bookDetailPurchaseFailType: 'STORE_PURCHASE_CONTENT_FAIL' = 'STORE_PURCHASE_CONTENT_FAIL';
export type BookDetailPurchaseFail = $ActionType<typeof bookDetailPurchaseFailType, Error>;

export type BookDetailActions = 
  | BookDetailInitAction
  | BookDetailGetBook
  | BookDetailGetBookSuccess
  | BookDetailGetBookFail
  | BookDetailTransfer
  | BookDetailTransferSuccess
  | BookDetailTransferFail
  | BookDetailPurchase
  | BookDetailPurchaseSuccess
  | BookDetailPurchaseFail;

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

export const bookDetailGetBookSuccess = (params: bookDetailSuccessParams): BookDetailGetBookSuccess => {
  return {
    type: bookDetailGetBookSuccessType,
    payload: params,
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

export const bookDetailPurchase = (params: PurchaseContentParams): BookDetailPurchase => {
  return {
    type: bookDetailPurchaseType,
    payload: params,
  };
};

export const bookDetailPurchaseSuccess = (txHash: string): BookDetailPurchaseSuccess => {
  return {
    type: bookDetailPurchaseSuccessType,
    payload: txHash,
  };
};

export const bookDetailPurchaseFail = (error: Error): BookDetailPurchaseFail => {
  return {
    type: bookDetailPurchaseFailType,
    payload: error,
  };
};
