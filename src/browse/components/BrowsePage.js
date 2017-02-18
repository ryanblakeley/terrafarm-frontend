import React from 'react';
import IoPerson from 'react-icons/lib/io/person';
import IoIosMore from 'react-icons/lib/io/ios-more';
import BarnIcon from 'organization/components/BarnIcon';
import WheatIcon from 'product/components/WheatIcon';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import Menu from 'shared/components/Menu';
import BrowseContentWrapper from './BrowseContentWrapper';
import BrowsePageHeading from './BrowsePageHeading';
import classNames from '../styles/BrowseContainerStylesheet.css';

const BrowseContainer = (props, context) => <TransitionWrapper>
  <div className={classNames.this} >
    <Menu
      baseUrl={'/browse'}
      header={{icon: <IoIosMore />, title: 'Browse'}}
      disabled={false}
      list={[
        { icon: <BarnIcon />, title: 'Farms', url: 'farms' },
        { icon: <WheatIcon />, title: 'Products', url: 'products' },
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
