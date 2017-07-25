import PropTypes from 'prop-types';
import React from 'react';
import Layout from './Layout';
import { P } from './Typography';
import classNames from '../styles/FormErrorStylesheet.css';

// Maybe instead of className on P use ErrorMessage

const propTypes = {
  text: PropTypes.string,
};

const defaultProps = {
  text: 'Form error.',
};

const FormError = props => <Layout center width={256}>
  <P className={classNames.text}>
    {props.text}
  </P>
</Layout>;

FormError.propTypes = propTypes;
FormError.defaultProps = defaultProps;

export default FormError;
