import React from 'react';
import Relay from 'react-relay';
import {
  EditIcon,
  PersonIcon,
  AsteriskIcon,
  BarnIcon,
  WheatIcon,
  LocationOutlineIcon,
} from 'shared/components/Icons';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import Menu from 'shared/components/Menu';
import {H3, P, Link} from 'shared/components/Typography';
import MainContentWrapper from 'shared/components/MainContentWrapper';
import HeroImage from 'shared/components/HeroImage';
import Accordion from 'shared/components/Accordion';
import RelationshipList from 'shared/components/RelationshipList';
import ActionPanel from 'shared/components/ActionPanel';
import ContentSubheader from 'shared/components/ContentSubheader';

import classNames from '../styles/OrganizationContainerStylesheet.css';

const OrganizationContainer = (props, context) => <TransitionWrapper>
  <div className={classNames.this}>
    <Menu
      baseUrl={`/farm/${props.organization.rowId}`}
      header={{icon: <BarnIcon />, title: 'Farm'}}
      disabled={props.organization.userByOwnerId.rowId !== context.userId}
      list={[
        {
          icon: <AsteriskIcon />,
          title: 'Accept Voucher',
          url: 'accept-voucher',
        },
        {
          icon: <WheatIcon />,
          title: 'Create Product',
          url: 'create-product',
        },
        {
          icon: <EditIcon />,
          title: 'Edit Farm',
          url: 'edit',
        },
      ]}
    />
    <H3>{props.organization.name}</H3>
    <MainContentWrapper
      right={<Accordion
        panels={[
          {
            header: {
              icon: <WheatIcon />,
              label: 'Products',
            },
            body: <RelationshipList
              listItems={props.organization.productsByOrganizationId
                .edges.map(edge => ({
                  id: edge.node.id,
                  name: edge.node.name,
                  itemUrl: `/product/${edge.node.rowId}`,
                }))
              }
            />,
          },
        ]}
      />}
      left={<div>
        <ActionPanel
          children={props.children}
          notifyClose={() => {
            context.router.replace(`/farm/${props.organization.rowId}`);
          }}
        />
        <ContentSubheader
          icon={<LocationOutlineIcon />}
          text={props.organization.placeByPlaceId
            && props.organization.placeByPlaceId.address}
          light
        />
        <Link
          to={`/user/${props.organization.userByOwnerId.rowId}`}
          className={classNames.link}
        >
          <ContentSubheader
            icon={<PersonIcon />}
            text={props.organization.userByOwnerId.name}
          />
        </Link>
        <P>{props.organization.description}</P>
        <HeroImage image={props.organization.imageUrl} />
      </div>}
    />
  </div>
</TransitionWrapper>;

OrganizationContainer.propTypes = {
  organization: React.PropTypes.object,
  children: React.PropTypes.object,
};

OrganizationContainer.contextTypes = {
  loggedIn: React.PropTypes.bool,
  router: React.PropTypes.object,
  userId: React.PropTypes.string,
};

export default Relay.createContainer(OrganizationContainer, {
  initialVariables: {
    organizationId: null,
  },
  fragments: {
    organization: () => Relay.QL`
      fragment on Organization {
        rowId,
        name,
        imageUrl,
        description,
        placeByPlaceId {
          address,
        },
        userByOwnerId {
          id,
          rowId,
          name,
        },
        productsByOrganizationId(first: 3) {
          edges {
            node {
              id,
              rowId,
              name,
            }
          }
        },
      }
    `,
  },
});
