import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'shared/components/Layout';
import AppLogo from './AppLogo';
import AppMenu from './AppMenu';
import classNames from '../styles/AppHeaderStylesheet.css';

const propTypes = {
  match: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

const AppHeader = (props) => <Layout page className={classNames.this} >
  <AppLogo />
  <AppMenu match={props.match} router={props.router} />
</Layout>;

AppHeader.propTypes = propTypes;

export default AppHeader;
