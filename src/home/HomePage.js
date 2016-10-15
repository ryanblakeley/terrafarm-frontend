import React from 'react';
import TransitionWrapper from '../shared/components/TransitionWrapper';
import HomeTagline from './components/HomeTagline';
import LoginLinks from './components/LoginLinks';
import classNames from './styles/HomePageStylesheet.css';

const HomePage = props => <TransitionWrapper>
  <div className={classNames.this} >
    <HomeTagline />
    <LoginLinks />
  </div>
</TransitionWrapper>;

export default HomePage;
