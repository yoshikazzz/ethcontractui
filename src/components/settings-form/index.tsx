import * as React from 'react';
import { Field, reduxForm, InjectedFormProps, WrappedFieldProps } from 'redux-form';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {
  createRequiredValidator,
  createNumberValidator,
  createAddressValidator,
} from '../../validators';
import { normalizeNumber } from '../../utils/render-utils';
import { ColorConfig } from '../../types';

type TextInputProps = {
  label?: string,
  className?: string,
  hintText?: string,
} & WrappedFieldProps;

const Input: React.StatelessComponent<TextInputProps> = ({
  input, meta: { touched, error, warning }, ...otherProps
}) => {
  return (
    <TextField
      hintStyle={{ color: '#72c0ff', fontSize: '13px' }}
      underlineShow={false}
      className="input"
      errorText={touched && error}
      {...input}
      {...otherProps}
    />
  );
};

export type Props = {
  className?: string,
  handleSubmit: () => void,
  colorConfig: ColorConfig,
} & InjectedFormProps;

const requiredValidator = createRequiredValidator();
const numberValidator = createNumberValidator();
const addressValidator = createAddressValidator();

function SettingsFormComponet(props: Props) {
  const textStyle = {color: props.colorConfig.main};
  return (
    <Card className="box">
      <CardHeader
        title="Transaction"
        className="box-header"
        style={{backgroundColor: props.colorConfig.box}}
        titleStyle={{color: props.colorConfig.main, fontWeight: 'bold'}}
      />
      <CardText className="box-main">
        <form onSubmit={props.handleSubmit}>
          <div className="box-main-item">
            <h3 style={textStyle}>Contract address</h3>
            <Field
              name="address"
              component={Input}
              hintText="address"
              validate={[requiredValidator, addressValidator]}
            />
          </div>
          <div className="box-main-item">
            <h3 style={textStyle}>gas limit</h3>
            <div className="box-main-item-input">
              <Field
                name="gasLimit"
                component={Input}
                validate={[requiredValidator, numberValidator]}
                normalize={normalizeNumber}
              />
              <p className="unit" style={textStyle}>Gas</p>
            </div>
            
          </div>
          <div className="box-main-item">
            <h3 style={textStyle}>gas price</h3>
            <div className="box-main-item-input">
              <Field
                name="gasPrice"
                component={Input}
                validate={[requiredValidator, numberValidator]}
              />
              <p className="unit" style={textStyle}>Gwei</p>
            </div>
          </div>
          <div className="box-main-item">
            <RaisedButton label="SAVE" className="btnSave" type="submit" buttonStyle={{backgroundColor: props.colorConfig.main}} />
          </div>
        </form>
      </CardText>
    </Card>
  );
}

const SettingsForm = reduxForm({
  form: 'settingsForm',
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
})(SettingsFormComponet);

export default SettingsForm as any;