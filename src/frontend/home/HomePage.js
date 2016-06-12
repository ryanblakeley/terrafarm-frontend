import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import HomeTagline from './components/HomeTagline';

import transitionNames from '../shared/styles/transitions.css';
import classNames from './styles/HomePageStylesheet.css';

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

HomePage.propTypes = {
  children: React.PropTypes.object,
};

export default HomePage;
