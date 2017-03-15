import React from 'react';
import Relay from 'react-relay';
import {
  EditIcon,
  PersonIcon,
  PlusIcon,
  AsteriskIcon,
  BarnIcon,
  WheatIcon,
  LocationOutlineIcon,
} from 'shared/components/Icons';
import Layout from 'shared/components/Layout';
import {H3, P, WarningMessage} from 'shared/components/Typography';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import MainContentWrapper from 'shared/components/MainContentWrapper';
import HeroImage from 'shared/components/HeroImage';
import RelationshipList from 'shared/components/RelationshipList';
import Menu from 'shared/components/Menu';
import ActionPanel from 'shared/components/ActionPanel';
import Accordion from 'shared/components/Accordion';
import ContentSubheader from 'shared/components/ContentSubheader';

const ProfileContainer = (props, context) => {
  const menuList = [
    { icon: <EditIcon />, title: 'Edit Profile', url: 'edit' },
  ];
  if (!props.currentPerson.organizationsByOwnerId.edges.length > 0) {
    menuList.push({ icon: <PlusIcon />, title: 'Create Farm', url: 'create-farm' });
  }
  let vouchersList = props.currentPerson.sharesByUserId.edges.map(edge => (
    edge.node.distributionsByShareId.edges.map(distributionEdge => ({
      id: distributionEdge.node.id,
      status: distributionEdge.node.status,
      name: distributionEdge.node.description
        || <WarningMessage>(No description)</WarningMessage>,
      itemId: distributionEdge.node.rowId,
      itemUrl: `/voucher/${distributionEdge.node.rowId}`,
      actionUrl: `/voucher/${distributionEdge.node.rowId}`,
    }))
  ));
  vouchersList = [].concat(...vouchersList);
  const sharesList = props.currentPerson.sharesByUserId.edges.map(edge => ({
    id: edge.node.id,
    name: edge.node.productName,
    itemId: edge.node.rowId,
    itemUrl: `/share/${edge.node.rowId}`,
  }));

  return <TransitionWrapper>
    <Layout page>
      <Menu
        baseUrl={'/profile'}
        header={{icon: <PersonIcon />, title: 'Profile'}}
        list={menuList}
      />
      <H3>{props.currentPerson.name}</H3>
      <MainContentWrapper
        right={<Accordion
          panels={[
            {
              header: {
                icon: <WheatIcon />,
                label: 'Shares',
              },
              body: <RelationshipList listItems={sharesList} />,
            },
            {
              header: {
                icon: <AsteriskIcon width={58} />,
                label: 'Vouchers',
              },
              body: <RelationshipList listItems={vouchersList} />,
            },
          ]}
        />}
        left={<div>
          <ActionPanel children={props.children} notifyClose={() => context.router.replace('/profile')} />
          <ContentSubheader
            icon={<LocationOutlineIcon />}
            text={props.currentPerson.placeByPlaceId && props.currentPerson.placeByPlaceId.address}
            light
          />
          {props.currentPerson.organizationsByOwnerId.edges.map(edge => <ContentSubheader
            icon={<BarnIcon />}
            text={edge.node.name}
            url={`/farm/${edge.node.rowId}`}
            key={edge.node.id}
          />)}
          <P>{props.currentPerson.description}</P>
          <HeroImage image={props.currentPerson.imageUrl} />
        </div>}
      />
    </Layout>
  </TransitionWrapper>;
};

ProfileContainer.propTypes = {
  currentPerson: React.PropTypes.object,
  children: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.array,
  ]),
};

ProfileContainer.contextTypes = {
  router: React.PropTypes.object,
};

export default Relay.createContainer(ProfileContainer, {
  initialVariables: {},
  fragments: {
    currentPerson: () => Relay.QL`
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
