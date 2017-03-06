import React from 'react';
import {MoreIcon, BarnIcon} from 'shared/components/Icons';
import Layout from 'shared/components/Layout';
import {H3} from 'shared/components/Typography';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import Menu from 'shared/components/Menu';
import BrowseContentWrapper from './BrowseContentWrapper';

const BrowsePage = (props, context) => <TransitionWrapper>
  <Layout>
    <Menu
      baseUrl={'/browse'}
      header={{icon: <MoreIcon />, title: 'Browse'}}
      disabled
      list={[
        { icon: <BarnIcon />, title: 'Farms', url: 'farms' },
      ]}
    />
    <H3>{context.location.pathname.split('/')[2]}</H3>
    <BrowseContentWrapper children={props.children} />
  </Layout>
</TransitionWrapper>;

BrowsePage.propTypes = {
  query: React.PropTypes.object,
  children: React.PropTypes.oneOfType([
    React.PropTypes.object, React.PropTypes.array,
  ]),
};

BrowsePage.contextTypes = {
  location: React.PropTypes.object,
  router: React.PropTypes.object,
};

export default BrowsePage;
