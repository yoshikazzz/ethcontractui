import {
  bookListContentsType,
  bookListContentsSuccessType,
  bookListContentsFailType,
  Content,
} from '../actions/book';
import { Action } from '../types'; 

export type State = {
  books: Content[],
  loading: boolean,
  error: string,
};

const initialState: State = {
  books: [],
  loading: false,
  error: '',
};

export function book(state: State = initialState, action: Action): State {
  switch (action.type) {
    case bookListContentsType: {
      return {
        ...state,
        loading: true
      };
    }

    case bookListContentsSuccessType: {
      return {
        ...state,
        loading: false,
        books: action.payload
      };
    }

    case bookListContentsFailType: {
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