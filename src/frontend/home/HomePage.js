import React from 'react';
import TransitionWrapper from '../shared/components/TransitionWrapper';
import HomeTagline from './components/HomeTagline';

import classNames from './styles/HomePageStylesheet.css';

const HomePage = (props) => <TransitionWrapper>
  <div className={classNames.this} >
    <HomeTagline />
    {props.children}
  </div>
</TransitionWrapper>;

HomePage.propTypes = {
  children: React.PropTypes.object,
};

export default HomePage;
