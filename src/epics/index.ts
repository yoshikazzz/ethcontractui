import { combineEpics } from 'redux-observable';
import { dashboardLoadContractEpic } from './dashboard';
import { settingsSaveConfigEpic, settingsInitEpic } from './settings';
import { listContentsEpic, purchaseContentEpic } from './store';
import { configurationInitEpic } from './configuration';

import 'rxjs';

export default combineEpics(
  dashboardLoadContractEpic,
  settingsSaveConfigEpic,
  settingsInitEpic,
  listContentsEpic,
  purchaseContentEpic,
  configurationInitEpic,
);
