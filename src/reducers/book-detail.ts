import {
  bookDetailGetBookType,
  bookDetailGetBookSuccessType,
  bookDetailGetBookFailType,
  bookDetailTransferType,
  bookDetailTransferFailType,
  bookDetailTransferSuccessType,
  bookDetailPurchaseType,
  Content,
  bookDetailPurchaseSuccessType,
  bookDetailPurchaseFailType,
} from '../actions/book-detail';
import { Action } from '../types'; 

export type State = {
  book: Content,
  isMyBook: boolean,
  loading: boolean,
  transfering: boolean,
  purchasing: boolean,
  error: string,
};

const initialState: State = {
  book: {
    author: '',
    title: '',
    totalSupply: -1,
    contentPath: '',
    contentHash: '',
    thumbnail: '',
    price: -1,
  },
  isMyBook: false,
  loading: false,
  transfering: false,
  purchasing: false,
  error: '',
};

export function bookDetail(state: State = initialState, action: Action): State {
  switch (action.type) {
    case bookDetailGetBookType: {
      return {
        ...state,
        loading: true,
      };
    }

    case bookDetailGetBookSuccessType: {
      return {
        ...state,
        loading: false,
        book: action.payload.book,
        isMyBook: action.payload.isMyBook,
      };
    }

    case bookDetailGetBookFailType: {
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    }

    case bookDetailTransferType: {
      return {
        ...state,
        transfering: true,
        error: '',
      };
    }

    case bookDetailTransferSuccessType: {
      return {
        ...state,
        transfering: false,
        error: '',
      };
    }

    case bookDetailTransferFailType: {
      return {
        ...state,
        transfering: false,
        error: action.payload.message,
      };
    }

    case bookDetailPurchaseType: {
      return {
        ...state,
        purchasing: true,
        error: ''
      };
    }

    case bookDetailPurchaseSuccessType: {
      return {
        ...state,
        purchasing: false,
        error: ''
      };
    }

    case bookDetailPurchaseFailType: {
      return {
        ...state,
        purchasing: false,
        error: action.payload.message
      };
    }

    default:
      return {
        ...state
      };
  }
}