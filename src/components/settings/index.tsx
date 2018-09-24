
import * as React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Snackbar from 'material-ui/Snackbar';
import SettingsForm from '../settings-form';
import { networkToString } from '../../utils/render-utils';
import { ColorConfig } from '../../types';
import './index.css';

export type Props = {
  account: string,
  network: string,
  balance: string,
  colorConfig: ColorConfig,
  onSaveSettings: (data: any) => void,
  init: () => void,
  isSuccess: boolean,
  initialValues: {
    address: string,
    gasPrice: string,
    gasLimit: string,
  },
};

type State = {
  isSaveSuccess: boolean;
};

export default class Settings extends React.Component<Props, State> {
  private timer;
  constructor(props: Props) {
    super(props);
    this.state = {
      isSaveSuccess: false,
    };
  }

  onSaveSettings = (params) => {
    clearInterval(this.timer);
    this.props.onSaveSettings(params);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!this.props.isSuccess && nextProps.isSuccess) {
      clearTimeout(this.timer);
      this.setState({
        isSaveSuccess: true,
      }, () => {
        this.timer = setTimeout(() => {
          this.setState({
            isSaveSuccess: false,
          });
        }, 4000);
      });
    }
  }

  render() {
    const { network, account, balance, colorConfig } = this.props;
    const textStyle = {color: colorConfig.main};
    return (
      <div>
        <Card className="box">
          <CardHeader
            title="Wallet"
            className="box-header"
            style={{backgroundColor: colorConfig.box}}
            titleStyle={{color: colorConfig.main, fontWeight: 'bold'}}
          />
          <CardText className="box-main">
            <div className="box-main-item">
              <h3 style={textStyle}>NETWORK</h3>
              <p style={textStyle}>{networkToString(network)}</p>
            </div>
            <div className="box-main-item">
              <h3 style={textStyle}>ACCOUNT</h3>
              <p style={textStyle}>{(account && account.length) ? account : '-'}</p>
            </div>
            <div className="box-main-item">
              <h3 style={textStyle}>BALANCE</h3>
              <p style={textStyle}>{balance && balance.length ? `${balance} ETH` : '-'}</p>
            </div>
          </CardText>
        </Card>
        <SettingsForm
          onSubmit={this.onSaveSettings}
          initialValues={this.props.initialValues}
          colorConfig={colorConfig}
        />
        <Snackbar
          open={this.state.isSaveSuccess}
          message="Contract has saved successfully"
        />
      </div>
    );
  }
}
