import React from 'react';
import Relay from 'react-relay';
// Icons
import IoPerson from 'react-icons/lib/io/person';
import IoIosBriefcase from 'react-icons/lib/io/ios-briefcase';
import IoIosPaperOutline from 'react-icons/lib/io/ios-paper-outline';
import IoCube from 'react-icons/lib/io/cube';
// Components
import NotFoundPage from '../not-found/NotFoundPage';
import TransitionWrapper from '../shared/components/TransitionWrapper';
import ContentHeader from '../shared/components/ContentHeader';
import MainContentWrapper from '../shared/components/MainContentWrapper';
import HeroImage from '../shared/components/HeroImage';
import RelationshipList from '../shared/components/RelationshipList';
import Menu from '../shared/components/Menu';
import Accordion from '../shared/components/Accordion';
import ContentSubheader from '../shared/components/ContentSubheader';
import ContentBodyText from '../shared/components/ContentBodyText';

import classNames from './styles/UserContainerStylesheet.css';

const UserContainer = props => (!props.user
  ? <NotFoundPage message={'User not found.'} />
  : <TransitionWrapper>
    <div className={classNames.this}>
      <Menu
        baseUrl={`/props.user/${props.user.rowId}`}
        header={{icon: <IoPerson />, title: 'User'}}
        list={[]}
        disabled
      />
      <ContentHeader text={props.user.name} />
      <MainContentWrapper
        right={<Accordion
          panels={[
            {
              header: {
                icon: <IoIosBriefcase />,
                label: 'Organizations',
              },
              body: <RelationshipList
                listItems={props.user.organizationMembersByMemberId.edges.map(edge => ({
                  name: edge.node.organizationByOrganizationId.name,
                  itemId: edge.node.organizationByOrganizationId.rowId,
                  itemUrl: 'organization',
                }))}
              />,
            },
            {
              header: {
                icon: <IoIosPaperOutline />,
                label: 'Tasks',
              },
              body: <RelationshipList
                listItems={props.user.tasksByAuthorId.edges.map(edge => ({
                  name: edge.node.name,
                  itemId: edge.node.rowId,
                  itemUrl: 'task',
                }))}
              />,
            },
            {
              header: {
                icon: <IoCube />,
                label: 'Resources',
              },
              body: <RelationshipList
                listItems={props.user.resourcesByOwnerId.edges.map(edge => ({
                  name: edge.node.name,
                  itemId: edge.node.rowId,
                  itemUrl: 'resource',
                }))}
              />,
            },
          ]}
        />}
        left={<div>
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
    resourcesByOwnerId: React.PropTypes.object,
    tasksByAuthorId: React.PropTypes.object,
  }),
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
              organizationByOrganizationId {
                rowId,
                name,
              }
            }
          }
        },
        resourcesByOwnerId(first: 10) {
          edges {
            node {
              rowId,
              name,
            }
          }
        },
        tasksByAuthorId(first: 10) {
          edges {
            node {
              rowId,
              name,
            }
          }
        },
      }
    `,
  },
});
