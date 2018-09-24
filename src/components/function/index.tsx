
import * as React from 'react';
import Web3 from 'web3';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './index.css';

import {
  abiItem,
} from '../../types/api';
import {
  AbiConfigParam,
  PromiseCancelable,
  ColorConfig,
} from '../../types';
import {
  makeCancelable,
} from '../../utils/render-utils';

export type Props = {
  abiLists: abiItem[];
  abi: abiItem,
  key: string,
  contract: string,
  gasPrice: string,
  gasLimit: string,
  scaffoldConfig?: AbiConfigParam,
  colorConfig: ColorConfig,
};

type State = {
  result: any,
  params: Array<string>,
  isLoading: boolean,
  error: Array<boolean>,
  isError: boolean,
};

export default class Function extends React.Component<Props, State> {
  public params: Array<string>;
 
  private web3 = new Web3('');
  private sendFunction: PromiseCancelable<any>;
  constructor(props: Props) {
    super(props);
    // tslint:disable-next-line:no-string-literal
    const injectWeb3 = global['web3'] as Web3;
    this.web3.setProvider(injectWeb3.currentProvider);
    this.state = {
      result: null,
      params: new Array((props.abi.inputs || []).length).fill(''),
      isLoading: false,
      error: Array((props.abi.inputs || []).length).fill(false),
      isError: false,
    };
  }

  handleOnchange = (key: number) => (e, value: string) => {
    this.state.error[key] = false;
    this.state.params[key] = value;
    this.setState(this.state);
  }

  handleOnClick = (functionName: string, isCall: boolean, numberInputs: number) => () => {
    let isError = false;
    const abi = this.props.abiLists;
    if (numberInputs !== 0) {
      const func: any = abi.filter(item => item.name === functionName);
      if (func) {
        this.state.params.map((value, key) => {
          if (!value) {
            isError = true;
            this.state.error[key] = true;
            this.setState(this.state);
          } else {
            if (func[0].inputs[key].type === 'address' && !this.web3.utils.isAddress(value)) {
              isError = true;
              this.state.error[key] = true;
              this.setState(this.state);
            }

            if (func[0].inputs[key].type === 'uint256' && !/^[0-9]*$/.test(value)) {
              isError = true;
              this.state.error[key] = true;
              this.setState(this.state);
            }
          }
        });
      } else {
        isError = true;
      }
    }

    if (!isError) {
      this.setState({
        isLoading: true
      });
     
      const contract = new this.web3.eth.Contract(abi, this.props.contract);
      // tslint:disable-next-line:no-string-literal
      const injectWeb3 = global['web3'] as Web3;
      this.sendFunction = makeCancelable(contract.methods[functionName](...this.state.params)[isCall ? 'call' : 'send']({
        from: injectWeb3.eth.defaultAccount,
        gasPrice: this.web3.utils.toWei(parseInt(this.props.gasPrice || '21', 10).toString(), 'nano'),
        gas: this.web3.utils.toHex(parseInt(this.props.gasLimit || '3000000', 10)),
      }));
      this.sendFunction.promise.then((result) => {
        this.setState({
          result: typeof result === 'string' ? result : JSON.stringify(result, null, '\t'),
          isLoading: false,
        }, () => {
          // tslint:disable-next-line:no-string-literal
          window['autosize'](document.getElementById(`result_field_${this.props.key}`));
        });
      })
      .catch((error) => {
        if (error && error.isCanceled) {
          console.log('Promise canceled');
          return;
        }
        this.setState({
          result: error.message === `Couldn't decode bool from ABI: 0x` ? '0x' : error.message,
          isLoading: false,
        });
      });
    }
  }

  componentWillUnmount() {
    if (this.sendFunction) {
      this.sendFunction.cancel();
    }
  }

  componentDidMount() {
    const { abi, abiLists } = this.props;
    if (abi.constant === true && (abi.inputs === undefined || abi.inputs.length === 0)) {
      const contract = new this.web3.eth.Contract(abiLists, this.props.contract);
      // tslint:disable-next-line:no-string-literal
      const injectWeb3 = global['web3'] as Web3;
      // tslint:disable-next-line:no-string-literal
      contract.methods[abi.name || ''](...this.state.params)['call']({ from: injectWeb3.eth.defaultAccount })
      .then((result: any) => {
        this.setState({
          result: typeof result === 'string' ? result : JSON.stringify(result),
          isLoading: false,
        }, () => {
          // tslint:disable-next-line:no-string-literal
          window['autosize'](document.getElementById(`result_field_${this.props.key}`));
        });
      })
      .catch((error: Error) => {
        this.setState({
          result: error.message === `Couldn't decode bool from ABI: 0x` ? '0x' : error.message,
          isLoading: false,
        });
      });
    }
  }

  render() {
    const { abi, key, scaffoldConfig, colorConfig } = this.props;
    const { isLoading, error, isError, result } = this.state;
    const name = scaffoldConfig && scaffoldConfig.name === abi.name ? scaffoldConfig.display_name : abi.name;
    const description = scaffoldConfig && scaffoldConfig.name === abi.name ? scaffoldConfig.description : '';
    const inputConfigs = scaffoldConfig ? scaffoldConfig.inputs : undefined;

    let resultDisplay = this.formatResult(result);

    return (
      <div className="item-function" key={key}>
        {isLoading ? (<div className="loader">&nbsp;</div>) : null}
        <Card className="box">
          <CardHeader
            title={name}
            className="box-header"
            subtitle={description}
            titleStyle={{fontWeight: 'bold', color: colorConfig.main}}
            subtitleColor={colorConfig.subtitle}
            style={{backgroundColor: colorConfig.box}}
          />
          <CardText className="box-main">
            <div className="function">
              <div className="param">
              <div>
                {abi.inputs && abi.inputs.map((input, index) => (
                  <div className="item-param" key={index}>
                    <h3 style={{textTransform: 'none', color: colorConfig.main}}>
                      {inputConfigs && inputConfigs.get(input.name) ? inputConfigs.get(input.name).display_name : input.name}
                    </h3>
                    <TextField
                      hintText={input.type}
                      hintStyle={{fontSize: '13px', color: colorConfig.subtitle}}
                      underlineShow={false}
                      className="input"
                      name={`param${index}`}
                      onChange={this.handleOnchange(index)}
                      disabled={isLoading}
                    />
                    {error[index] ? (
                      <p className="error-text">{input.name} is missing or invalid</p>
                    ) : null}
                  </div>
                ))}
              </div>
                <div className="dashboard-btn">
                  <RaisedButton
                    label={abi.constant === true ? 'CALL' : 'SEND'}
                    className="btnSave"
                    onClick={this.handleOnClick(abi.name || '', abi.constant || false, abi.inputs ? abi.inputs.length : 0)}
                    disabled={isLoading || isError}
                    buttonStyle={{backgroundColor: colorConfig.main}}
                  />
                </div>
              </div>
              <div className="output">
                <div>
                  <h3 style={{color: colorConfig.main}}>Result</h3>
                  <TextField
                    underlineShow={false}
                    rows={1}
                    style={{maxHeight: '100px', overflowY: 'auto'}}
                    textareaStyle={{marginTop: 0, marginBottom: 0}}
                    multiLine={true}
                    className="textarea"
                    value={resultDisplay || ''}
                    name="result"
                    id={`result_field_${key}`}
                  /> 
                </div>
              </div>
            </div>
            
          </CardText>
        </Card>
      </div>
    );
  }

  private toJson = (input: string): object | string => {
    try {
      const output = JSON.parse(input);
      return typeof output === 'object' ? output : input;
    } catch (err) {
      return input;
    }
  }

  private formatResult = (result) => {
    const { scaffoldConfig } = this.props;
    const outputConfigs = scaffoldConfig ? scaffoldConfig.outputs : undefined;

    let resultDisplay = result;
    if (result && result.length && outputConfigs) {
      const resultObject = this.toJson(result);
      if (typeof resultObject === 'string' && outputConfigs.size === 1) {
        // Single output
        resultDisplay = `${outputConfigs.get('').display_name}: ${result}`;
      } else if (typeof resultObject === 'object' && outputConfigs.size >= 1) {
        const configKeys = Object.keys(outputConfigs.toObject());
        const displayKeys = configKeys.filter(_key => resultObject[_key]);
        if (displayKeys.length) {
          resultDisplay = displayKeys.map(_key => {
            let _result = resultObject[_key];
            if (outputConfigs.get(_key).type === 'boolean') {
              _result = parseInt(_result, 16) ? 'true' : 'false';
            }
            return outputConfigs.get(_key) ? `${outputConfigs.get(_key).display_name}: ${_result}` : `${_key}: ${_result}`;
          }).join('\n');
        }
      }
    }
    return resultDisplay;
  }
}
