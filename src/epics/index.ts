import { combineEpics } from 'redux-observable';
import { dashboardLoadContractEpic } from './dashboard';
import { settingsSaveConfigEpic, settingsInitEpic } from './settings';
import { listContentsEpic, purchaseContentEpic } from './store';
import { bookListContentsEpic, bookTransferEpic, bookDetailGetBookEpic, bookDetailTransferEpic } from './book';
import { configurationInitEpic } from './configuration';

import 'rxjs';

export default combineEpics(
  dashboardLoadContractEpic,
  settingsSaveConfigEpic,
  settingsInitEpic,
  listContentsEpic,
  purchaseContentEpic,
  bookListContentsEpic,
  bookTransferEpic,
  bookDetailGetBookEpic,
  bookDetailTransferEpic,
  configurationInitEpic,
);
