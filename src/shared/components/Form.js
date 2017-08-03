import PropTypes from 'prop-types';
import React from 'react';
import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import FormsySelect from 'formsy-material-ui/lib/FormsySelect';
import FormsyCheckbox from 'formsy-material-ui/lib/FormsyCheckbox';
import FormsyDate from 'formsy-material-ui/lib/FormsyDate';
import { blueGrey900 } from 'tools/colors';
import classNames from '../styles/FormStylesheet.css';

const commonStyle = {
  field: {
    display: 'block',
    margin: '0 auto',
    fontFamily: 'Simonetta, serif',
  },
  font: {
    fontFamily: 'Simonetta, serif',
  },
};

const formPropTypes = {
  children: PropTypes.node.isRequired,
};

const Form = props => <Formsy.Form {...props} />;

const textInputPropTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
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
  style: commonStyle.field,
};

const TextInput = props => {
  const { label, placeholder, style, ...rest } = props;

  return <FormsyText
    floatingLabelText={label}
    hintText={placeholder}
    floatingLabelStyle={{ color: blueGrey900 }}
    underlineFocusStyle={{ borderColor: blueGrey900 }}
    style={Object.assign({}, commonStyle.field, style)}
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
  style: commonStyle.field,
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
  style: commonStyle.font,
};

const Checkbox = props => <FormsyCheckbox {...props} />;

const datePickerPropTypes = {
  defaultDate: PropTypes.object,
  name: PropTypes.string.isRequired,
  requiredError: PropTypes.string,
  validationError: PropTypes.string,
  validationErrors: PropTypes.object,
  validations: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  value: PropTypes.object,
  style: PropTypes.object,
};

const datePickerDefaultProps = {
  defaultDate: {},
  required: false,
  requiredError: 'Field is required',
  validationError: null,
  validationErrors: {},
  validations: null,
  value: null,
  style: commonStyle.font,
};

const DatePicker = props => <FormsyDate {...props} />;

Form.propTypes = formPropTypes;
TextInput.propTypes = textInputPropTypes;
SelectInput.propTypes = selectInputPropTypes;
Checkbox.propTypes = checkboxPropTypes;
DatePicker.propTypes = datePickerPropTypes;

TextInput.defaultProps = textInputDefaultProps;
SelectInput.defaultProps = selectInputDefaultProps;
Checkbox.defaultProps = checkboxDefaultProps;
DatePicker.defaultProps = datePickerDefaultProps;

export { Form, TextInput, SelectInput, Checkbox, DatePicker };
