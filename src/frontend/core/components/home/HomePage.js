import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Colors from 'material-ui/lib/styles/colors';
import HomeLinks from './components/HomeLinks';

import transitionNames from '../../../shared/styles/transitions.css';
import classNames from './styles/HomePageStylesheet.css';
const styles = {
  warning: {
    color: Colors.blueGrey500,
    display: 'none',
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
        <div className={classNames.tagline}>
          Strategize and collaborate<br />
          around healthy farming.
        </div>
        <HomeLinks />
        <h6
          className={classNames.warning}
          style={styles.warning}
        >
          Prototype
        </h6>
      </div>
    </CSSTransitionGroup>;
  }
}
