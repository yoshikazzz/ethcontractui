import { $ActionType } from '../types';
import { abiList } from '../types/api';
import { NetworkResponse } from '../services/api';

export const dashboardInitActionType: 'DASHBOARD_INIT' = 'DASHBOARD_INIT';
export type DashboardInitAction = $ActionType<typeof dashboardInitActionType, null>;

export const dashboardInitSuccessActionType: 'DASHBOARD_INIT_SUCCESS' = 'DASHBOARD_INIT_SUCCESS';
export type DashboardInitSuccessAction = $ActionType<typeof dashboardInitSuccessActionType, abiList>;

export const dashboardCallFunctionActionType: 'DASHBOARD_CALL_FUNCTION' = 'DASHBOARD_CALL_FUNCTION';
export type DashboardCallFunctionAction = $ActionType<typeof dashboardCallFunctionActionType, any>;

export const dashboardCallFunctionSuccessActionType: 'DASHBOARD_CALL_FUNCTION_SUCCESS' = 'DASHBOARD_CALL_FUNCTION_SUCCESS';
export type DashboardCallFunctionSuccessAction = $ActionType<typeof dashboardCallFunctionSuccessActionType, any>;

export const dashboardFailActionType: 'DASHBOARD_INIT_FAIL' = 'DASHBOARD_INIT_FAIL';
export type DashboardFailAction = $ActionType<typeof dashboardFailActionType, Error>;

export type getAbiParams = {
  network: string;
  address: string;
};

export const dashboardLoadContractActionType: 'DASHBOARD_LOAD_CONTRACT' = 'DASHBOARD_LOAD_CONTRACT';
export type DasboardLoadContractAction = $ActionType<typeof dashboardLoadContractActionType, getAbiParams>;

export const dashboardLoadContractSuccessActionType: 'DASHBOARD_LOAD_CONTRACT_SUCCESS' = 'DASHBOARD_LOAD_CONTRACT_SUCCESS';
export type DasboardLoadContractSuccessAction = $ActionType<typeof dashboardLoadContractSuccessActionType, NetworkResponse | undefined>;

export const dashboardLoadContractFailActionType: 'DASHBOARD_LOAD_CONTRACT_FAIL' = 'DASHBOARD_LOAD_CONTRACT_FAIL';
export type DasboardLoadContractFailAction = $ActionType<typeof dashboardLoadContractFailActionType, Error>;

export type DashboardActions =
  | DashboardInitAction
  | DashboardInitSuccessAction
  | DashboardFailAction
  | DashboardCallFunctionAction
  | DashboardCallFunctionSuccessAction
  | DasboardLoadContractAction
  | DasboardLoadContractSuccessAction
  | DasboardLoadContractFailAction;

export const dashboardInit = (): DashboardInitAction => {
  return {
    type: dashboardInitActionType,
    payload: null,
  };
};

export const dashboardInitSuccess = (payload: abiList): DashboardInitSuccessAction => {
  return {
    type: dashboardInitSuccessActionType,
    payload,
  };
};

export const dashboardFail = (reason: Error): DashboardFailAction => {
  return {
    type: dashboardFailActionType,
    payload: reason,
  };
};

export const dashboardCallFunction = (payload: any): DashboardCallFunctionAction => {
  return {
    type: dashboardCallFunctionActionType,
    payload,
  };
};

export const dashboardCallFunctionSuccess = (payload: any): DashboardCallFunctionSuccessAction => {
  return {
    type: dashboardCallFunctionSuccessActionType,
    payload,
  };
};

export const dashboardLoadContract = (payload: getAbiParams): DasboardLoadContractAction => {
  return {
    type: dashboardLoadContractActionType,
    payload: payload,
  };
};

export const dasboardLoadContractSuccess = (payload?: NetworkResponse): DasboardLoadContractSuccessAction => {
  return {
    type: dashboardLoadContractSuccessActionType,
    payload: payload,
  };
};

export const dasboardLoadContractFail = (error: Error): DasboardLoadContractFailAction => {
  return {
    type: dashboardLoadContractFailActionType,
    payload: error,
  };
};
