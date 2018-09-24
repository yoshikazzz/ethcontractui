
import { $ActionType } from '../types/';

export const initActionType: 'INIT' = 'INIT';

export type InitAction = $ActionType<typeof initActionType, null>;

export const initialize = (): InitAction => {
  return {
    type: initActionType,
    payload: null,
  };
};
