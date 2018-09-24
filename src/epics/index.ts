import { combineEpics } from 'redux-observable';
import { dashboardLoadContractEpic } from './dashboard';
import { settingsSaveConfigEpic, settingsInitEpic } from './settings';
import { configurationInitEpic } from './configuration';

import 'rxjs';

export default combineEpics(
  dashboardLoadContractEpic,
  settingsSaveConfigEpic,
  settingsInitEpic,
  configurationInitEpic,
);
