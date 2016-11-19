import React from 'react';
import Relay from 'react-relay';
import IoBriefcase from 'react-icons/lib/io/briefcase';
import IoCube from 'react-icons/lib/io/cube';
import IoPerson from 'react-icons/lib/io/person';
import IoIosSearch from 'react-icons/lib/io/ios-search';
import IoIosPaperOutline from 'react-icons/lib/io/ios-paper-outline';
import TransitionWrapper from '../shared/components/TransitionWrapper';
import Menu from '../shared/components/Menu';
import BrowseContentWrapper from './components/BrowseContentWrapper';
import BrowsePageHeading from './components/BrowsePageHeading';
import classNames from './styles/BrowseContainerStylesheet.css';

const BrowseContainer = (props, context) => <TransitionWrapper>
  <div className={classNames.this} >
    <Menu
      baseUrl={'/browse'}
      header={{icon: <IoIosSearch />, title: 'Browse'}}
      disabled={false}
      list={[
        { icon: <IoCube />, title: 'Resources', url: 'resources' },
        { icon: <IoIosPaperOutline />, title: 'Tasks', url: 'tasks' },
        { icon: <IoBriefcase />, title: 'Organizations', url: 'organizations' },
        { icon: <IoPerson />, title: 'Users', url: 'users' },
      ]}
    />
    <BrowsePageHeading />
    <BrowseContentWrapper children={props.children} />
  </div>
</TransitionWrapper>;

BrowseContainer.propTypes = {
  query: React.PropTypes.object,
  relay: React.PropTypes.object,
  children: React.PropTypes.oneOfType([
    React.PropTypes.object, React.PropTypes.array,
  ]),
};

BrowseContainer.contextTypes = {
  location: React.PropTypes.object,
  router: React.PropTypes.object,
};

export default Relay.createContainer(BrowseContainer, {
  initialVariables: {
    search: '',
  },
  fragments: {
    query: () => Relay.QL`
      fragment on Query {
        id,
      }
    `,
  },
});
