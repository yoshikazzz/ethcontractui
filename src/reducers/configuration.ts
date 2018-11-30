import { Map } from 'immutable';
import {
  configurationInitActionType,
  configurationInitFailActionType,
  configurationInitSuccessActionType,
  displayConfigParams,
} from '../actions/configuration';

import { Action } from '../types';

export type AbiConfigParam = {
  name: string,
  display_name: string,
  description: string,
  inputs?: Map<string, { name: string, display_name: string, description: string }>,
  outputs?: Map<string, { name: string, display_name: string, type: string }>,
};

export type State = {
  loading: boolean;
  networkId: string,
  currentAddress: string,
  error: string,
  display: displayConfigParams,
  scaffold: AbiConfigParam[],
};

const initialState: State = {
  loading: false,
  networkId: '',
  error: '',
  currentAddress: '',
  display: {
    name: '',
    title: '',
    logo: 'images/apps.png',
    color: {
      main: 'transparent',
      box: 'transparent',
      subtitle: 'transparent',
    },
    contract: '',
  },
  scaffold: [],
};

export function configuration(state: State = initialState, action: Action): State {
  switch (action.type) {
    case configurationInitActionType: {
      return {
        ...state,
        loading: true,
      };
    }
    case configurationInitSuccessActionType:
      const scaffold = action.payload.abi.map(item => {
        let inputConfig = Map<string, { name: string, display_name: string, description: string }>();
        if (item.inputs) {
          item.inputs.forEach(input => inputConfig = inputConfig.set(input.name || '', input));
        }
        let outputConfig = Map<string, { name: string, display_name: string, type: string }>();
        if (item.outputs) {
          item.outputs.forEach(output => outputConfig = outputConfig.set(output.name || '', output));
        }
        const config = {
          ...item,
          inputs: inputConfig,
          outputs: outputConfig,
        };
        return config;
      });
      return {
        ...state,
        loading: false,
        networkId: action.payload.networkId,
        currentAddress: action.payload.address,
        display: Object.assign({}, state.display, action.payload.display),
        scaffold: scaffold,
      };
    case configurationInitFailActionType: {
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
