import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
// Icons
import IoEdit from 'react-icons/lib/io/edit';
import IoPerson from 'react-icons/lib/io/person';
import IoPlus from 'react-icons/lib/io/plus';
import IoAsterisk from 'react-icons/lib/io/asterisk';
import BarnIcon from 'organization/components/BarnIcon';
import WheatIcon from 'product/components/WheatIcon';
// Components
import TransitionWrapper from 'shared/components/TransitionWrapper';
import MainContentWrapper from 'shared/components/MainContentWrapper';
import ContentHeader from 'shared/components/ContentHeader';
import HeroImage from 'shared/components/HeroImage';
import RelationshipList from 'shared/components/RelationshipList';
import Menu from 'shared/components/Menu';
import ActionPanel from 'shared/components/ActionPanel';
import Accordion from 'shared/components/Accordion';
import ContentSubheader from 'shared/components/ContentSubheader';
import ContentBodyText from 'shared/components/ContentBodyText';

import classNames from '../styles/ProfileContainerStylesheet.css';

const ProfileContainer = (props, context) => {
  const menuList = [
    { icon: <IoEdit />, title: 'Edit Profile', url: 'edit' },
  ];
  if (!props.user.organizationsByOwnerId.edges.length > 0) {
    menuList.push({ icon: <IoPlus />, title: 'Create Farm', url: 'create-farm' });
  }
  let vouchersList = props.user.sharesByUserId.edges.map(edge => (
    edge.node.distributionsByShareId.edges.map(distributionEdge => ({
      id: distributionEdge.node.id,
      status: distributionEdge.node.status,
      name: distributionEdge.node.description || '(No description)',
      itemId: distributionEdge.node.rowId,
      itemUrl: `/voucher/${distributionEdge.node.rowId}`,
      actionUrl: `/voucher/${distributionEdge.node.rowId}`,
    }))
  ));
  vouchersList = [].concat(...vouchersList);

  return <TransitionWrapper>
    <div className={classNames.this}>
      <Menu
        baseUrl={'/profile'}
        header={{icon: <IoPerson />, title: 'Profile'}}
        list={menuList}
      />
      <ContentHeader text={props.user.name} />
      <MainContentWrapper
        right={<Accordion
          panels={[
            {
              header: {
                icon: <IoAsterisk width={58} />,
                label: 'Vouchers',
              },
              body: <RelationshipList listItems={vouchersList} />,
            },
            {
              header: {
                icon: <WheatIcon />,
                label: 'Shares',
              },
              body: <RelationshipList
                listItems={props.user.sharesByUserId.edges.length > 0
                  ? props.user.sharesByUserId.edges.map(edge => ({
                    id: edge.node.id,
                    name: edge.node.productName,
                    itemId: edge.node.rowId,
                    itemUrl: `/share/${edge.node.rowId}`,
                  }))
                  : []
                }
              />,
            },
          ]}
        />}
        left={<div>
          <ActionPanel children={props.children} notifyClose={() => context.router.replace('/profile')} />
          <ContentSubheader
            text={props.user.placeByPlaceId && props.user.placeByPlaceId.address}
            light
          />
          {props.user.organizationsByOwnerId.edges.map(edge => <Link
            to={`/farm/${edge.node.rowId}`}
            className={classNames.link}
            key={edge.node.id}
          >
            <ContentSubheader
              icon={<BarnIcon width={24} height={24} />}
              text={edge.node.name}
            />
          </Link>)}
          <ContentBodyText text={props.user.description} />
          <HeroImage image={props.user.imageUrl} />
        </div>}
      />
    </div>
  </TransitionWrapper>;
};

ProfileContainer.propTypes = {
  user: React.PropTypes.object,
  children: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.array,
  ]),
};

ProfileContainer.contextTypes = {
  router: React.PropTypes.object,
};

export default Relay.createContainer(ProfileContainer, {
  initialVariables: {
    userId: null,
  },
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        name,
        imageUrl,
        description,
        placeByPlaceId {
          address,
        },
        organizationsByOwnerId(first: 2) {
          edges {
            node {
              id,
              rowId,
              name,
            }
          }
        },
        sharesByUserId(first: 8) {
          edges {
            node {
              id,
              productName,
              rowId,
              distributionsByShareId(first: 8) {
                edges {
                  node {
                    id,
                    rowId,
                    status,
                    description,
                  }
                }
              },
            }
          }
        },
      }
    `,
  },
});
