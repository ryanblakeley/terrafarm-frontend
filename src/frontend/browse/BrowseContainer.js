import React from 'react';
import Relay from 'react-relay';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';
import BrowsePanel from './components/BrowsePanel';
import BrowseResults from './components/BrowseResults';

import transitionNames from '../shared/styles/transitions.css';
import classNames from './styles/BrowseContainerStylesheet.css';

class BrowseContainer extends React.Component {
  static propTypes = {
    master: React.PropTypes.object,
  };
  render () {
    const {master} = this.props;

    return <CSSTransitionGroup
      transitionName={transitionNames}
      transitionAppear
      transitionAppearTimeout={350}
      transitionEnterTimeout={350}
      transitionLeave={false}
    >
      <div className={classNames.this} >
        <h2 className={classNames.pageHeading}>Browse</h2>
        <BrowsePanel />
        <BrowseResults master={master} />
      </div>
    </CSSTransitionGroup>;
  }
}

export default Relay.createContainer(BrowseContainer, {
  fragments: {
    master: () => Relay.QL`
      fragment on Master {
        ${BrowseResults.getFragment('master')}
      }
    `,
  },
});
