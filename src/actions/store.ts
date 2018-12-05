import { $ActionType } from '../types';
import { Content } from '../services/contract';

export type Content = Content;
export type PurchaseContentParams = {
  contentHash: string;
  price: number;
};

export type bookDetailSuccessParams = {
  book: Content;
  isMyBook: boolean;
};

export const storeInitActionType: 'STORE_INIT' = 'STORE_INIT';
export type StoreInitAction = $ActionType<typeof storeInitActionType, null>;

export const storeListContentsType: 'STORE_LIST_CONTENTS' = 'STORE_LIST_CONTENTS';
export type StoreListContents = $ActionType<typeof storeListContentsType, null>;

export const storeListContentsSuccessType: 'STORE_LIST_CONTENTS_SUCCESS' = 'STORE_LIST_CONTENTS_SUCCESS';
export type StoreListContentsSuccess = $ActionType<typeof storeListContentsSuccessType, Content[]>;

export const storeListContentsFailType: 'STORE_LIST_CONTENTS_FAIL' = 'STORE_LIST_CONTENTS_FAIL';
export type StoreListContentsFail = $ActionType<typeof storeListContentsFailType, Error>;

export const storePurchaseContentType: 'STORE_PURCHASE_CONTENT' = 'STORE_PURCHASE_CONTENT';
export type StorePurchaseContent = $ActionType<typeof storePurchaseContentType, PurchaseContentParams>;

export const storePurchaseContentSuccessType: 'STORE_PURCHASE_CONTENT_SUCCESS' = 'STORE_PURCHASE_CONTENT_SUCCESS';
export type StorePurchaseContentSuccess = $ActionType<typeof storePurchaseContentSuccessType, string>;

export const storePurchaseContentFailType: 'STORE_PURCHASE_CONTENT_FAIL' = 'STORE_PURCHASE_CONTENT_FAIL';
export type StorePurchaseContentFail = $ActionType<typeof storePurchaseContentFailType, Error>;

export type StoreActions = 
  | StoreInitAction
  | StoreListContents
  | StoreListContentsSuccess
  | StoreListContentsFail
  | StorePurchaseContent
  | StorePurchaseContentSuccess
  | StorePurchaseContentFail;

export const storeInit = (): StoreInitAction => {
  return {
    type: storeInitActionType,
    payload: null,
  };
};

export const storeListContents = (): StoreListContents => {
  return {
    type: storeListContentsType,
    payload: null,
  };
};

export const storeListContentsSuccess = (contents: Content[]): StoreListContentsSuccess => {
  return {
    type: storeListContentsSuccessType,
    payload: contents,
  };
};

export const storeListContentsFail = (error: Error): StoreListContentsFail => {
  return {
    type: storeListContentsFailType,
    payload: error,
  };
};

export const storePurchaseContent = (params: PurchaseContentParams): StorePurchaseContent => {
  return {
    type: storePurchaseContentType,
    payload: params,
  };
};

export const storePurchaseContentSuccess = (txHash: string): StorePurchaseContentSuccess => {
  return {
    type: storePurchaseContentSuccessType,
    payload: txHash,
  };
};

export const storePurchaseContentFail = (error: Error): StorePurchaseContentFail => {
  return {
    type: storePurchaseContentFailType,
    payload: error,
  };
};
