import PropTypes from 'prop-types';
import React from 'react';
import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import FormsySelect from 'formsy-material-ui/lib/FormsySelect';
import FormsyCheckbox from 'formsy-material-ui/lib/FormsyCheckbox';
import { blueGrey900 } from 'tools/colors';
import classNames from '../styles/FormStylesheet.css';

const formPropTypes = {
  children: PropTypes.node.isRequired,
};

const Form = props => <Formsy.Form {...props} />;

const textInputPropTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  updateImmediately: PropTypes.bool,
  validations: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  validationError: PropTypes.string,
  maxLength: PropTypes.number,
  style: PropTypes.object,
};

const textInputDefaultProps = {
  placeholder: null,
  value: null,
  required: false,
  updateImmediately: false,
  validations: null,
  validationError: null,
  maxLength: 60,
  style: {
    display: 'block',
    margin: '0 auto',
    fontFamily: 'Simonetta, serif',
  },
};

const TextInput = props => {
  const { label, placeholder, ...rest } = props;

  return <FormsyText
    floatingLabelText={label}
    hintText={placeholder}
    floatingLabelStyle={{ color: blueGrey900 }}
    underlineFocusStyle={{ borderColor: blueGrey900 }}
    {...rest}
  />;
};

const selectInputPropTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  validations: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  required: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.array.isRequired,
};

const selectInputDefaultProps = {
  placeholder: null,
  value: null,
  validations: null,
  required: false,
  style: {
    fontFamily: 'Simonetta, serif',
  },
};

const SelectInput = props => {
  const { label, placeholder, ...rest } = props;

  return <div className={classNames.selectInput}>
    <FormsySelect
      floatingLabelText={label}
      hintText={placeholder}
      floatingLabelStyle={{ color: blueGrey900 }}
      underlineFocusStyle={{ borderColor: blueGrey900 }}
      {...rest}
    />
  </div>;
};

const checkboxPropTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number,
  ]),
  style: PropTypes.object,
};

const checkboxDefaultProps = {
  value: null,
  style: {
    fontFamily: 'Simonetta, serif',
  },
};

const Checkbox = props => <FormsyCheckbox {...props} />;

const validationErrors = {
  url: 'Should be a url, e.x. http://imgur.com/abc123',
  maxLength: 'Character limit reached.',
  textArea: '500 character limit.',
  location: 'Should be a valid address',
  contact: 'Should be an email address or phone number.',
  token: 'Not a valid token.',
  date: 'Should be date in format YYYY-MM-DD',
  time: 'Should be a valid time.',
  number: 'Should be a number.',
  currency: 'Should be a dollar amount.',
};

Form.propTypes = formPropTypes;
TextInput.propTypes = textInputPropTypes;
SelectInput.propTypes = selectInputPropTypes;
Checkbox.propTypes = checkboxPropTypes;
TextInput.defaultProps = textInputDefaultProps;
SelectInput.defaultProps = selectInputDefaultProps;
Checkbox.defaultProps = checkboxDefaultProps;

export { Form, TextInput, SelectInput, Checkbox, validationErrors };
