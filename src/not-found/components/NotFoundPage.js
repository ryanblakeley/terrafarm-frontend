import PropTypes from 'prop-types';
import React from 'react';
import Layout from 'shared/components/Layout';
import { H2, H3, P } from 'shared/components/Typography';
import TransitionWrapper from 'shared/components/TransitionWrapper';

const propTypes = {
  message: PropTypes.string,
};

const defaultProps = {
  message: 'Page not found.',
};

/* eslint no-useless-escape: 0 */
const NotFoundPage = props => <TransitionWrapper>
  <Layout page>
    <H2>404</H2>
    <H3>¯\_(ツ)_/¯</H3>
    <Layout center>
      <P>{props.message}</P>
    </Layout>
  </Layout>
</TransitionWrapper>;

NotFoundPage.propTypes = propTypes;
NotFoundPage.defaultProps = defaultProps;

export default NotFoundPage;
