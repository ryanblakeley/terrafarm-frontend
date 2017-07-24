import PropTypes from 'prop-types';
import React from 'react';
import classNames from '../styles/FormErrorStylesheet.css';

const propTypes = {
  text: PropTypes.string,
};

const defaultProps = {
  text: 'Form error.',
};

const FormError = props => <div className={classNames.this}>
  <p className={classNames.text}>
    {props.text}
  </p>
</div>;

FormError.propTypes = propTypes;
FormError.defaultProps = defaultProps;

export default FormError;
