import React from 'react';
import classNames from '../styles/FormErrorStylesheet.css';

const FormError = props => <div className={classNames.this}>
  <p className={classNames.text}>
    {props.text}
  </p>
</div>;

FormError.propTypes = {
  text: React.PropTypes.string,
};

FormError.defaultProps = {
  text: 'Form error.',
};

export default FormError;
