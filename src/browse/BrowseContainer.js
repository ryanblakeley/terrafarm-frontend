import React from 'react';
import IoBriefcase from 'react-icons/lib/io/briefcase';
import IoPerson from 'react-icons/lib/io/person';
import IoIosSearch from 'react-icons/lib/io/ios-search';
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
  children: React.PropTypes.oneOfType([
    React.PropTypes.object, React.PropTypes.array,
  ]),
};

BrowseContainer.contextTypes = {
  location: React.PropTypes.object,
  router: React.PropTypes.object,
};

export default BrowseContainer;
