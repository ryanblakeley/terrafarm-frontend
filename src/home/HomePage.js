import React from 'react';
import TransitionWrapper from '../shared/components/TransitionWrapper';
import Tagline from './components/Tagline';
import LoginLinks from './components/LoginLinks';
import QuickIntro from './components/QuickIntro';
import classNames from './styles/HomePageStylesheet.css';

const HomePage = props => <TransitionWrapper>
  <div className={classNames.this} >
    <Tagline />
    <LoginLinks />
    <QuickIntro />
  </div>
</TransitionWrapper>;

export default HomePage;
