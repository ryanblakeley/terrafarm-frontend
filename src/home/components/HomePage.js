import React from 'react';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import Tagline from './Tagline';
import HowItWorks from './HowItWorks';
import classNames from '../styles/HomePageStylesheet.css';

const HomePage = props => <TransitionWrapper>
  <div className={classNames.this} >
    <Tagline />
    <HowItWorks />
  </div>
</TransitionWrapper>;

export default HomePage;
