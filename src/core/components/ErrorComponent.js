import PropTypes from 'prop-types';
import React from 'react';
import Layout from 'shared/components/Layout';
import {H2} from 'shared/components/Typography';
import {FlatButton} from 'shared/components/Material';
// import {ReloadIcon} from 'shared/components/Icons';

const propTypes = {
  retry: PropTypes.func,
};

class ErrorComponent extends React.Component {
  handleRetry = () => {
    const {retry} = this.props;
    if (retry) retry();
  }
  render () {
    return <Layout page>
      <H2>API Error</H2>
      <Layout center>
        <FlatButton onClick={this.handleRetry} label={'Retry'} />
      </Layout>
    </Layout>;
  }
}

ErrorComponent.propTypes = propTypes;

export default ErrorComponent;
