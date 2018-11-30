import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';

import Layout, { Props, DispProps } from '../../components/layout';
import { Action, StoreState } from '../../types/';

import { dashboardLoadContract } from '../../actions/dashboard';
import { settingsInit } from '../../actions/settings';
import { configurationInit } from '../../actions/configuration';

const mapStateToProps = (state: StoreState): Partial<Props> => ({
  address: state.configuration.currentAddress,
  contract: state.settings.address,
  abiLists: state.dashboard.abiList,
  networkId: state.configuration.networkId,
  settingError: state.settings.settingError,
  name: state.configuration.display.name,
  title: state.configuration.display.title,
  logo: state.configuration.display.logo,
  colorConfig: state.configuration.display.color,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispProps => ({
  loadAbi: bindActionCreators(dashboardLoadContract, dispatch),
  loadSetting: bindActionCreators(settingsInit, dispatch),
  loadConfig: bindActionCreators(configurationInit, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout as any);
