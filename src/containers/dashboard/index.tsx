import { bindActionCreators } from 'redux';
import { Action, StoreState  } from '../../types/';
import { connect, Dispatch } from 'react-redux';
import {
  dashboardCallFunction,
} from '../../actions/dashboard';
import Dashboard, { Props, DispProps } from '../../components/dashboard';

const mapStateToProps = (state: StoreState): Props => ({
  abiLists: state.dashboard.abiList,
  address: state.settings.account,
  contract: state.settings.address,
  gasLimit: state.settings.gasLimit,
  gasPrice: state.settings.gasPrice,
  loadingAbi: state.dashboard.loading,
  scaffoldConfigs: state.configuration.scaffold,
  displayConfig: state.configuration.display,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispProps => ({
  onCallFunction: bindActionCreators(dashboardCallFunction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard as any);
