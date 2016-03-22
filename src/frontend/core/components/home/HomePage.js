import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Colors from 'material-ui/lib/styles/colors';
import HomeLinks from './components/HomeLinks';

import transitionNames from '../../../shared/styles/transitions.css';
import classNames from './styles/HomePageStylesheet.css';
const styles = {
  warning: {
    color: Colors.blueGrey500,
  },
};

export default class HomePage extends React.Component {
  render () {
    return <CSSTransitionGroup
      transitionName={transitionNames}
      transitionAppear
      transitionAppearTimeout={350}
      transitionEnterTimeout={350}
      transitionLeave={false}
    >
      <div className={classNames.this} >
        <h1 className={classNames.appTitle}>Terrafarm</h1>
        <div className={classNames.tagline}>Cultivate good food close to home.</div>
        <HomeLinks />
        <p
          className={classNames.warning}
          style={styles.warning}
        >
          Prototype
        </p>
      </div>
    </CSSTransitionGroup>;
  }
}
