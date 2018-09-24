import { $ActionType } from '../types';

export type settingInit = {
  account: string,
  network: string,
  balance: string,
  address: string,
  gasLimit: string,
  gasPrice: string,
};

export type settingParams = {
  network: string,
  address: string,
  gasLimit: string,
  gasPrice: string,
};

export const settingsInitActionType: 'SETTINGS_INIT' = 'SETTINGS_INIT';
export type SettingsInitAction = $ActionType<typeof settingsInitActionType, null>;

export const settingsInitFailActionType: 'SETTINGS_INIT_FAIL' = 'SETTINGS_INIT_FAIL';
export type SettingsInitFailAction = $ActionType<typeof settingsInitFailActionType, Error>;

export const settingsInitSuccessActionType: 'SETTINGS_INIT_SUCCESS' = 'SETTINGS_INIT_SUCCESS';
export type SettingsInitSuccessAction = $ActionType<typeof settingsInitSuccessActionType, settingInit>;

export const settingsSaveConfigActionType: 'SETTING_SAVE_CONFIG' = 'SETTING_SAVE_CONFIG';
export type SettingsSaveConfigAction = $ActionType<typeof settingsSaveConfigActionType, settingParams>;

export const settingsSaveConfigSuccessActionType: 'SETTING_SAVE_CONFIG_SUCCESS' = 'SETTING_SAVE_CONFIG_SUCCESS';
export type SettingsSaveConfigSuccessAction = $ActionType<typeof settingsSaveConfigSuccessActionType, settingParams>;

export type SettingsActions = 
  | SettingsInitAction
  | SettingsInitSuccessAction
  | SettingsInitFailAction
  | SettingsSaveConfigAction
  | SettingsSaveConfigSuccessAction;

export const settingsInit = (): SettingsInitAction => {
  return {
    type: settingsInitActionType,
    payload: null,
  };
};

export const settingsInitSuccess = (payload: settingInit): SettingsInitSuccessAction => {
  return {
    type: settingsInitSuccessActionType,
    payload,
  };
};

export const settingsInitFail = (reason: Error): SettingsInitFailAction => {
  return {
    type: settingsInitFailActionType,
    payload: reason,
  };
};

export const settingsSaveConfig = (params: settingParams): SettingsSaveConfigAction => {
  return {
    type: settingsSaveConfigActionType,
    payload: params,
  };
};

export const settingsSaveConfigSuccess = (params: settingParams): SettingsSaveConfigSuccessAction => {
  return {
    type: settingsSaveConfigSuccessActionType,
    payload: params,
  };
};
