import { bindActionCreators } from 'redux';
import { Action, StoreState  } from '../../types/';
import { connect, Dispatch } from 'react-redux';
import Settings from '../../components/settings';
import { settingsSaveConfig, settingParams } from '../../actions/settings';
import { normalizeNumber } from '../../utils/render-utils';

const mapStateToProps = (state: StoreState) => {
  return {
    account: state.settings.account,
    network: state.settings.network,
    balance: state.settings.balance,
    colorConfig: state.configuration.display.color,
    isSuccess: state.settings.isSuccess,
    initialValues: {
      address: state.settings.address,
      gasLimit: state.settings.gasLimit ? normalizeNumber(state.settings.gasLimit) : '',
      gasPrice: state.settings.gasPrice,
    },
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onSaveSettings: bindActionCreators(
    (data: settingParams) => settingsSaveConfig({
      ...data,
      gasLimit: data.gasLimit.replace(/[.,]/g, ''),
    }),
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings as any);
