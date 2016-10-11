import React from 'react';
import Relay from 'react-relay';
import TransitionWrapper from '../shared/components/TransitionWrapper';
import BrowsePanel from './components/BrowsePanel';
import BrowseResults from './components/BrowseResults';

import classNames from './styles/BrowseContainerStylesheet.css';

const BrowseContainer = props => <TransitionWrapper>
  <div className={classNames.this} >
    <BrowsePanel />
    <BrowseResults master={props.master} />
  </div>
</TransitionWrapper>;

BrowseContainer.propTypes = {
  master: React.PropTypes.object,
};

export default Relay.createContainer(BrowseContainer, {
  fragments: {
    master: () => Relay.QL`
      fragment on Master {
        ${BrowseResults.getFragment('master')}
      }
    `,
  },
});
