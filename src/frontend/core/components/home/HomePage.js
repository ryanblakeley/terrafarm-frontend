import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import HomeTagline from './components/HomeTagline';

import transitionNames from '../../../shared/styles/transitions.css';
import classNames from './styles/HomePageStylesheet.css';
/* eslint react/prop-types: 0 */
const HomePage = (props) => <CSSTransitionGroup
  transitionName={transitionNames}
  transitionAppear
  transitionAppearTimeout={350}
  transitionEnterTimeout={350}
  transitionLeave={false}
>
  <div className={classNames.this} >
    <HomeTagline />
    {props.children}
  </div>
</CSSTransitionGroup>;

export default HomePage;
