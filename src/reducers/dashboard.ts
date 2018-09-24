
import {
  dashboardInitSuccessActionType,
  dashboardLoadContractActionType,
  dashboardLoadContractSuccessActionType,
  dashboardLoadContractFailActionType,
} from '../actions/dashboard';

import { Action } from '../types';

export type State = {
  abiList: any,
  loading: boolean,
};

const initialState: State = {
  abiList: null,
  loading: false,
};

export function dashboard(state: State = initialState, action: Action): State {
  switch (action.type) {
    case dashboardInitSuccessActionType:
      return {
        ...state,
        abiList: action.payload,
      };
    case dashboardLoadContractActionType: {
      return {
        ...state,
        loading: true,
        abiList: null,
      };
    }
    case dashboardLoadContractSuccessActionType: {
      return {
        ...state,
        loading: false,
        abiList: action.payload,
      };
    }
    case dashboardLoadContractFailActionType:
      return {
        ...state,
        loading: false,
        abiList: null,
      };
    default:
      return {
        ...state,
      };
  }
}