import PropTypes from 'prop-types';
import React from 'react';
import Layout from 'shared/components/Layout';
import { H2, P } from 'shared/components/Typography';
import { FlatButton } from 'shared/components/Material';
// import {ReloadIcon} from 'shared/components/Icons';

const propTypes = {
  message: PropTypes.string,
  retry: PropTypes.func,
};

const defaultProps = {
  message: null,
  retry: () => {
    console.warn('No retry method provided.');
  },
};

const ErrorComponent = props => <Layout page>
  <H2>API Error</H2>
  <Layout center>
    {props.message && <P>{props.message}</P>}
    <FlatButton onClick={() => props.retry()} label={'Retry'} />
  </Layout>
</Layout>;

ErrorComponent.propTypes = propTypes;
ErrorComponent.defaultProps = defaultProps;

export default ErrorComponent;
