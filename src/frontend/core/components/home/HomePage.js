import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import HomeLinks from './components/HomeLinks';

import transitionNames from '../../../shared/styles/transitions.css';
import classNames from './styles/HomePageStylesheet.css';

const HomePage = () => <CSSTransitionGroup
  transitionName={transitionNames}
  transitionAppear
  transitionAppearTimeout={350}
  transitionEnterTimeout={350}
  transitionLeave={false}
>
  <div className={classNames.this} >
    <h1 className={classNames.appTitle}>Terrafarm</h1>
    <div className={classNames.tagline}>
      Collaborate, learn, and<br />
      strategize around farming.
    </div>
    <HomeLinks />
  </div>
</CSSTransitionGroup>;

export default HomePage;
