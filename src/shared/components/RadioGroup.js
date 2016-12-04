import React from 'react';
import FormsyRadioGroup from 'formsy-material-ui/lib/FormsyRadioGroup';
import classNames from '../styles/RadioGroupStylesheet.css';

const styles = {
  radioButton: {
    marginBottom: 16,
  },
};

const RadioGroup = props => <FormsyRadioGroup
  className={classNames.this}
  name={props.name}
  required={props.required}
  defaultSelected={props.defaultSelected}
  valueSelected={props.valueSelected}
  onChange={props.onChange}
>
  {props.children.map((child, i) => (
    React.cloneElement(child, {
      style: styles.radioButton,
      key: i,
    })
  ))}
</FormsyRadioGroup>;

RadioGroup.propTypes = {
  name: React.PropTypes.string,
  required: React.PropTypes.bool,
  children: React.PropTypes.array,
  defaultSelected: React.PropTypes.string,
  valueSelected: React.PropTypes.string,
  onChange: React.PropTypes.func,
};

export default RadioGroup;
