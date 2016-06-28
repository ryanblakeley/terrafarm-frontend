import React from 'react';
import Relay from 'react-relay';
import TransitionWrapper from '../shared/components/TransitionWrapper';
import BrowsePanel from './components/BrowsePanel';
import BrowseResults from './components/BrowseResults';

import classNames from './styles/BrowseContainerStylesheet.css';

class BrowseContainer extends React.Component {
  static propTypes = {
    master: React.PropTypes.object,
  };
  render () {
    const {master} = this.props;

    return <TransitionWrapper>
      <div className={classNames.this} >
        <BrowsePanel />
        <BrowseResults master={master} />
      </div>
    </TransitionWrapper>;
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
