import React from 'react';
import TransitionWrapper from '../shared/components/TransitionWrapper';
import Tagline from './components/Tagline';
import LoginLinks from './components/LoginLinks';
import AboutCopy from '../about/components/AboutCopy';
import classNames from './styles/HomePageStylesheet.css';

const HomePage = props => <TransitionWrapper>
  <div className={classNames.this} >
    <Tagline />
    <LoginLinks />
    <AboutCopy />
  </div>
</TransitionWrapper>;

export default HomePage;
