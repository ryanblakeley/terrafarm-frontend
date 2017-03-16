import React from 'react';
import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import FormsySelect from 'formsy-material-ui/lib/FormsySelect';
import FormsyCheckbox from 'formsy-material-ui/lib/FormsyCheckbox';
import {blueGrey900} from 'shared/utils/colors';
import classNames from '../styles/FormStylesheet.css';

const Form = props => <Formsy.Form {...props} />;
const TextInput = props => {
  const {label, placeholder, ...rest} = props;

  return <FormsyText
    floatingLabelText={label}
    hintText={placeholder}
    floatingLabelStyle={{color: blueGrey900}}
    underlineFocusStyle={{borderColor: blueGrey900}}
    {...rest}
  />;
};
const SelectInput = props => {
  const {label, placeholder, ...rest} = props;

  return <div className={classNames.selectInput}>
    <FormsySelect
      floatingLabelText={label}
      hintText={placeholder}
      floatingLabelStyle={{color: blueGrey900}}
      underlineFocusStyle={{borderColor: blueGrey900}}
      {...rest}
    />
  </div>;
};
const Checkbox = props => <FormsyCheckbox {...props} />;
const validationErrors = {
  url: 'Should be a url, e.x. http://imgur.com/abc123',
  maxLength: 'Character limit reached.',
  textArea: '500 character limit.',
  location: 'Should be a valid address',
};

Form.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.array,
  ]),
};
TextInput.propTypes = {
  name: React.PropTypes.string,
  style: React.PropTypes.object,
  label: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  value: React.PropTypes.string,
  validations: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]),
  required: React.PropTypes.bool,
  updateImmediately: React.PropTypes.bool,
  validationError: React.PropTypes.string,
  maxLength: React.PropTypes.number,
};
SelectInput.propTypes = {
  name: React.PropTypes.string,
  style: React.PropTypes.object,
  label: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string, React.PropTypes.number,
  ]),
  validations: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]),
  required: React.PropTypes.bool,
  children: React.PropTypes.array,
};
Checkbox.propTypes = {
  name: React.PropTypes.string,
  style: React.PropTypes.object,
  label: React.PropTypes.string,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string, React.PropTypes.number,
  ]),
};

TextInput.defaultProps = {
  required: false,
  style: {
    display: 'block',
    margin: '0 auto',
    fontFamily: 'Simonetta, serif',
  },
  maxLength: 60,
};
SelectInput.defaultProps = {
  required: false,
  style: {
    fontFamily: 'Simonetta, serif',
  },
};
Checkbox.defaultProps = {
  style: {
    fontFamily: 'Simonetta, serif',
  },
};

export {Form, TextInput, SelectInput, Checkbox, validationErrors};
