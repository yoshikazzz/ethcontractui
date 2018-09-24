
import * as React from 'react';
import { abiList } from '../../types/api';
import {
  load,
} from '../../storage/expiration-storage';
import {
  AbiConfigParam,
  DisplayConfigParams,
} from '../../types';
import { Link } from 'react-router-dom';
import './index.css';
import Function from '../function';

export type Props = {
  address: string;
  contract: string;
  gasPrice: string;
  gasLimit: string;
  abiLists?: abiList;
  loadingAbi: boolean;
  scaffoldConfigs: AbiConfigParam[],
  displayConfig: DisplayConfigParams,
};

export type DispProps = {
  onCallFunction: (payload: any) => void,
};

type IProps = Props & DispProps;

type State = {
  isExistsContract: boolean,
};
export default class Dashboard extends React.Component<IProps, State> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isExistsContract: false,
    };
  }
  componentWillMount() {
    const contract = load('contract');
    if (contract) {
      this.setState({
        isExistsContract: true,
      });
    }
  }

  get noContractView() {
    const style: any = {color: this.props.displayConfig.color.main, fontWeight: 'bold', textDecoration: 'underline'};
    return (
      <p style={{color: this.props.displayConfig.color.subtitle}}>
        No contract configuration. (Go to <Link style={style} to="/settings">SETTINGS</Link>)
      </p>
    );
  }

  get noAbiView() {
    const style: any = {color: this.props.displayConfig.color.main, fontWeight: 'bold', textDecoration: 'underline'};
    return (
      <p style={{color: this.props.displayConfig.color.subtitle}}>
        No ABI found. (Go to <Link style={style} to="/settings">SETTINGS</Link>)
      </p>
    );
  }

  get loadingView() {
    return <p style={{color: this.props.displayConfig.color.subtitle}}>Loading ABI. Please wait</p>;
  }

  get abiView() {
    const { contract, gasLimit, gasPrice, abiLists, scaffoldConfigs, displayConfig } = this.props;
    if (!abiLists) {
      return null;
    } else {
      return scaffoldConfigs
          .filter(config => abiLists.find(abi => abi.name === config.name && abi.type === 'function'))
          .map((config, key) => {
            const item = abiLists.find(abi => abi.name === config.name);
            return !item ? null : (
              <Function
                abi={item}
                key={`${contract}_${key}`}
                contract={contract}
                gasLimit={gasLimit}
                gasPrice={gasPrice}
                abiLists={abiLists}
                scaffoldConfig={config}
                colorConfig={displayConfig.color}
              />
            );
          })
          .filter(view => view);
    }
  }
  render() {
    const { contract, abiLists, loadingAbi } = this.props;
    const contractValid = contract && contract.length;
    return loadingAbi ? this.loadingView : (contractValid && abiLists && abiLists.length) ? this.abiView : !contractValid ? this.noContractView : this.noAbiView;
  }
}
