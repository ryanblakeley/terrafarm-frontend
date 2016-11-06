import React from 'react';
import FormsyRadio from 'formsy-material-ui/lib/FormsyRadio';
import classNames from '../styles/RadioStylesheet.css';

const Radio = props => <FormsyRadio
  value={props.value}
  label={props.label}
  className={classNames.this}
/>;

Radio.propTypes = {
  value: React.PropTypes.string,
  label: React.PropTypes.string,
};

export default Radio;
