import React from 'react';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import LogoLarge from './LogoLarge';
import Tagline from './Tagline';
import HowItWorks from './HowItWorks';
import LoginLinks from './LoginLinks';
import classNames from '../styles/HomePageStylesheet.css';

const HomePage = props => <TransitionWrapper>
  <div className={classNames.this} >
    <LogoLarge />
    <Tagline />
    <HowItWorks />
    <LoginLinks />
  </div>
</TransitionWrapper>;

export default HomePage;
