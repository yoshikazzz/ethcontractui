import {
  storeListContentsType,
  storeListContentsSuccessType,
  storeListContentsFailType,
  storePurchaseContentType,
  storePurchaseContentSuccessType,
  storePurchaseContentFailType,
  Content,
} from '../actions/store';
import { Action } from '../types'; 

export type State = {
  contents: Content[],
  loading: boolean,
  purchasing: boolean;
  error: string,
};

const initialState: State = {
  contents: [],
  loading: false,
  purchasing: false,
  error: '',
};

export function store(state: State = initialState, action: Action): State {
  switch (action.type) {
    case storeListContentsType: {
      return {
        ...state,
        loading: true
      };
    }

    case storeListContentsSuccessType: {
      return {
        ...state,
        loading: false,
        contents: action.payload
      };
    }

    case storeListContentsFailType: {
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    }

    case storePurchaseContentType: {
      return {
        ...state,
        purchasing: true,
        error: '',
      };
    }

    case storePurchaseContentSuccessType: {
      return {
        ...state,
        purchasing: false,
        error: '',
      };
    }

    case storePurchaseContentFailType: {
      return {
        ...state,
        purchasing: false,
        error: action.payload.message,
      };
    }
  
    default:
      return {
        ...state
      };
  }
}
