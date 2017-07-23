import PropTypes from 'prop-types';
import React from 'react';
import { MuiThemeProvider, getMuiTheme } from 'shared/components/Material';
import terrafarmRawTheme from 'tools/terrafarmRawTheme';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import Banner from './Banner';
import classNames from '../styles/CorePageStylesheet.css';

const propTypes = {
  children: PropTypes.object.isRequired,
};

export const CorePageComponent = props => <div className={classNames.this}>
  <div className={classNames.main}>
    <Banner />
    <AppHeader />
    {props.children}
  </div>
  <AppFooter />
</div>;

CorePageComponent.propTypes = propTypes;

/* eslint-disable new-cap */
export const CorePage = props => (
  <MuiThemeProvider muiTheme={getMuiTheme(terrafarmRawTheme)}>
    <CorePageComponent {...props} />
  </MuiThemeProvider>
);
