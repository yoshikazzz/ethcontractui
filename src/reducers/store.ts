import {
  storeListContentsType,
  storeListContentsSuccessType,
  storeListContentsFailType,
  Content,
} from '../actions/store';
import { Action } from '../types'; 

export type State = {
  contents: Content[],
  loading: boolean,
  error: string,
};

const initialState: State = {
  contents: [],
  loading: false,
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
  
    default:
      return {
        ...state
      };
  }
}