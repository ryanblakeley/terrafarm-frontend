import PropTypes from 'prop-types';
import React from 'react';
import Layout from 'shared/components/Layout';
import { H2 } from 'shared/components/Typography';
import { FlatButton } from 'shared/components/Material';
// import {ReloadIcon} from 'shared/components/Icons';

const propTypes = {
  retry: PropTypes.func,
};

const defaultProps = {
  retry: () => {
    console.warn('No retry method provided.');
  },
};

const ErrorComponent = props => <Layout page>
  <H2>API Error</H2>
  <Layout center>
    <FlatButton onClick={() => props.retry()} label={'Retry'} />
  </Layout>
</Layout>;

ErrorComponent.propTypes = propTypes;
ErrorComponent.defaultProps = defaultProps;

export default ErrorComponent;
