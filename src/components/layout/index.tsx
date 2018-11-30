
// tslint:disable:no-string-literal

import * as React from 'react';
import { List, ListItem } from 'material-ui/List';
import { CircularProgress } from 'material-ui';
import { Link } from 'react-router-dom';
import './index.css';
import { abiList } from '../../types/api';
import { ColorConfig } from '../../types';
// import { PROJECT_NAME } from '../../config';

export type Props = {
  children: React.ReactNode,
  location: Location,
  networkId: string,
  address: string, // wallet address
  contract: string, // contract address
  abiLists: abiList,
  settingError: Error | null,
  name: string,
  title: string,
  logo: string,
  colorConfig: ColorConfig,
  loadingConfig: boolean,
};

export type DispProps = {
  loadConfig: () => void,
};

type State = {
};

type IProps = Props & DispProps;

class Layout extends React.Component<IProps, State> {
  constructor(props: IProps) {
    super(props);
  }

  get errorView() {
    return (
      <p className="error-text">
        Web3 is not injected.
      </p>
    );
  }

  renderTitle(path: string) {
    switch (path) {
      case '/':
        return 'Dashboard';
      case '/settings':
        return 'Settings';
      case '/store':
        return 'Store';
      default:
        return undefined;
    }
  }

  render() {
    // set title
    document.title = this.props.title;

    const { location, settingError, colorConfig, loadingConfig } = this.props;
    if (loadingConfig) {
      return <CircularProgress size={50} thickness={5} />;
    }
    return (
      <div className="row">
        <div className="slider-bar" style={{backgroundColor: colorConfig.main}}>
          <List>
            <div className="project-title">
              <img className="logo" src={this.props.logo} />
              <p className="project-name">{this.props.name}</p>
            </div>
            <Link to="/"><ListItem primaryText="DASHBOARD"  className="item-slide-bar" /></Link>
            <Link to="/settings"><ListItem primaryText="SETTINGS" className="item-slide-bar" /></Link>
            <Link to="/store"><ListItem primaryText="STORE" className="item-slide-bar" /></Link>
          </List>
        </div>
        <div className="main">
          <h3 style={{color: colorConfig.main}} >{this.renderTitle(location.pathname)}</h3>
          {!settingError ? this.props.children : this.errorView}
        </div>
      </div>
    );
  }

  componentDidMount() {

    window.addEventListener('load', () => {
      this.props.loadConfig();
    });
  }

  componentDidUpdate(prevProps: IProps) {
    const { networkId } = prevProps;
    const networkRinkebyId = '4';
    if (this.props.networkId !== networkId && this.props.networkId !== networkRinkebyId) {
      alert('Please change network on MetaMask to Rinkeby!');
    }
  }
 }

export default Layout;
