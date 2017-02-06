import React from 'react';
import Relay from 'react-relay';

// Icons
import IoPerson from 'react-icons/lib/io/person';
import IoIosBriefcase from 'react-icons/lib/io/ios-briefcase';
import IoIosStar from 'react-icons/lib/io/ios-star';

// Components
import NotFoundPage from 'not-found/components/NotFoundPage';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import ContentHeader from 'shared/components/ContentHeader';
import MainContentWrapper from 'shared/components/MainContentWrapper';
import HeroImage from 'shared/components/HeroImage';
import RelationshipList from 'shared/components/RelationshipList';
import Menu from 'shared/components/Menu';
import ActionPanel from 'shared/components/ActionPanel';
import Accordion from 'shared/components/Accordion';
import ContentSubheader from 'shared/components/ContentSubheader';
import ContentBodyText from 'shared/components/ContentBodyText';

import classNames from '../styles/UserContainerStylesheet.css';

const UserContainer = (props, context) => (!props.user
  ? <NotFoundPage message={'User not found.'} />
  : <TransitionWrapper>
    <div className={classNames.this}>
      <Menu
        baseUrl={`/user/${props.user.rowId}`}
        header={{icon: <IoPerson />, title: 'User'}}
        disabled={!context.loggedIn}
        list={[{ icon: <IoIosStar />, title: 'Star', url: 'star' }]}
      />
      <ContentHeader text={props.user.name} />
      <MainContentWrapper
        right={<Accordion
          panels={[
            {
              header: {
                icon: <IoIosBriefcase />,
                label: 'Farms',
              },
              body: <RelationshipList
                listItems={props.user.organizationMembersByMemberId.edges.map(edge => ({
                  id: edge.node.id,
                  name: edge.node.organizationByOrganizationId.name,
                  itemUrl: `/farm/${edge.node.organizationByOrganizationId.rowId}`,
                }))}
              />,
            },
          ]}
        />}
        left={<div>
          <ActionPanel
            children={props.children}
            notifyClose={() => context.router.replace(`/user/${props.user.rowId}`)}
          />
          <ContentSubheader text={props.user.placeByPlaceId && props.user.placeByPlaceId.address} />
          <ContentBodyText text={props.user.description} />
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
    organizationMembersByMemberId: React.PropTypes.object,
  }),
  children: React.PropTypes.object,
};

UserContainer.contextTypes = {
  loggedIn: React.PropTypes.bool,
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
        organizationMembersByMemberId(first: 5) {
          edges {
            node {
              id,
              organizationByOrganizationId {
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
