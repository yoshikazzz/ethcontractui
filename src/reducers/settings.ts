
import {
  settingsInitSuccessActionType,
  settingsSaveConfigActionType,
  settingsSaveConfigSuccessActionType,
  settingsInitFailActionType,
} from '../actions/settings';
import {
  configurationInitSuccessActionType,
} from '../actions/configuration';

import {
  DEFAULT_GAS_PRICE,
  DEFAULT_GAS_LIMIT,
} from '../config';

import { Action } from '../types';

export type State = {
  network: string,
  account: string,
  balance: string,
  address: string,
  gasLimit: string,
  gasPrice: string,
  settingError: Error | null,
  actionError: Error | null,
  isSuccess: boolean,
};

const initialState: State = {
  network: '',
  account: '',
  balance: '',
  address: '',
  gasPrice: '',
  gasLimit: '',
  settingError: null,
  actionError: null,
  isSuccess: false,
};

export function settings(state: State = initialState, action: Action): State {
  switch (action.type) {
    case settingsInitSuccessActionType: {
      return {
        ...state,
        isSuccess: false,
        network: action.payload.network,
        account: action.payload.account,
        balance: action.payload.balance,
        address: action.payload.address || state.address,
        gasLimit: action.payload.gasLimit || DEFAULT_GAS_LIMIT,
        gasPrice: action.payload.gasPrice || DEFAULT_GAS_PRICE,
      };
    }
    case settingsInitFailActionType: {
      return {
        ...state,
        settingError: action.payload,
      };
    }
    case settingsSaveConfigActionType: {
      return {
        ...state,
        isSuccess: false,
      };
    }
    case settingsSaveConfigSuccessActionType: {
      return {
        ...state,
        isSuccess: true,
        address: action.payload.address,
        gasLimit: action.payload.gasLimit || DEFAULT_GAS_LIMIT,
        gasPrice: action.payload.gasPrice || DEFAULT_GAS_PRICE,
      };
    }
    case configurationInitSuccessActionType: {
      return {
        ...state,
        address: action.payload.display.contract,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
