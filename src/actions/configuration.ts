import { $ActionType } from '../types/';

export const configurationInitActionType: 'CONFIGURTION_INIT' = 'CONFIGURTION_INIT';
export const configurationInitSuccessActionType: 'CONFIGURTION_INIT_SUCCESS' = 'CONFIGURTION_INIT_SUCCESS';
export const configurationInitFailActionType: 'CONFIGURTION_INIT_FAIL' = 'CONFIGURTION_INIT_FAIL';

export type colorConfigs = {
  main: string,
  box: string,
  subtitle: string,
};
export type displayConfigParams = {
  name: string,
  logo: string,
  title: string,
  color: colorConfigs,
  contract: string,
};

export type abiConfigParam = {
  name: string,
  display_name: string,
  description: string,
  inputs?: [{
    name: string,
    display_name: string,
    description: string,
  }],
  outputs?: [{
    name: string,
    display_name: string,
    type: string,
  }],
};

export type configParams = {
  display: displayConfigParams,
  abi: abiConfigParam[],
};

export type ConfigurationInitAction = $ActionType<typeof configurationInitActionType, null>;
export type ConfigurationInitSuccessAction = $ActionType<typeof configurationInitSuccessActionType, configParams>;
export type ConfigurationInitFailAction = $ActionType<typeof configurationInitFailActionType, Error>;

export type ConfigurationActions =
  | ConfigurationInitAction
  | ConfigurationInitSuccessAction
  | ConfigurationInitFailAction; 

export const configurationInit = (): ConfigurationInitAction => {
  return {
    type: configurationInitActionType,
    payload: null,
  };
};

export const configurationInitSuccess = (payload: configParams): ConfigurationInitSuccessAction => {
  return {
    type: configurationInitSuccessActionType,
    payload,
  };
};

export const configurationInitFail = (reason: Error): ConfigurationInitFailAction => {
  return {
    type: configurationInitFailActionType,
    payload: reason,
  };
};