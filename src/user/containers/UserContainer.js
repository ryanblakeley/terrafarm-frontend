import React from 'react';
import Relay from 'react-relay';
import {
  PersonIcon,
  BarnIcon,
  WheatIcon,
  LocationOutlineIcon,
} from 'shared/components/Icons';
import {H3, P, Link} from 'shared/components/Typography';
import NotFoundPage from 'not-found/components/NotFoundPage';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import MainContentWrapper from 'shared/components/MainContentWrapper';
import HeroImage from 'shared/components/HeroImage';
import RelationshipList from 'shared/components/RelationshipList';
import Menu from 'shared/components/Menu';
import ActionPanel from 'shared/components/ActionPanel';
import Accordion from 'shared/components/Accordion';
import ContentSubheader from 'shared/components/ContentSubheader';

import classNames from '../styles/UserContainerStylesheet.css';

const UserContainer = (props, context) => (!props.user
  ? <NotFoundPage message={'User not found.'} />
  : <TransitionWrapper>
    <div className={classNames.this}>
      <Menu
        baseUrl={`/user/${props.user.rowId}`}
        header={{icon: <PersonIcon />, title: 'User'}}
        disabled
      />
      <H3>{props.user.name}</H3>
      <MainContentWrapper
        right={<Accordion
          panels={[
            {
              header: {
                icon: <WheatIcon />,
                label: 'Shares',
              },
              body: <RelationshipList
                listItems={props.user.sharesByUserId.edges.length > 0
                  ? props.user.sharesByUserId.edges.map(edge => ({
                    id: edge.node.productByProductId.id,
                    name: edge.node.productByProductId.name,
                    itemId: edge.node.productByProductId.rowId,
                    itemUrl: `/product/${edge.node.productByProductId.rowId}`,
                  }))
                  : []
                }
              />,
            },
          ]}
        />}
        left={<div>
          <ActionPanel
            children={props.children}
            notifyClose={() => context.router.replace(`/user/${props.user.rowId}`)}
          />
          <ContentSubheader
            icon={<LocationOutlineIcon />}
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
          <P>{props.user.description}</P>
          <HeroImage image={props.user.imageUrl} />
        </div>}
      />
    </div>
  </TransitionWrapper>
);

UserContainer.propTypes = {
  user: React.PropTypes.shape({
    rowId: React.PropTypes.string,
    name: React.PropTypes.string,
    placeByPlaceId: React.PropTypes.shape({
      address: React.PropTypes.string,
    }),
    description: React.PropTypes.string,
    imageUrl: React.PropTypes.string,
    organizationsByOwnerId: React.PropTypes.object,
    sharesByUserId: React.PropTypes.object,
  }),
  children: React.PropTypes.object,
};

UserContainer.contextTypes = {
  userId: React.PropTypes.string,
  router: React.PropTypes.object,
};

export default Relay.createContainer(UserContainer, {
  initialVariables: {
    userId: null,
  },
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        rowId,
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
              rowId
              name,
            }
          }
        },
        sharesByUserId(first: 8) {
          edges {
            node {
              productByProductId {
                id,
                rowId,
                name,
              }
            }
          }
        },
      }
    `,
  },
});
