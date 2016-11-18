import React from 'react';
import Relay from 'react-relay';
// Icons
import IoEdit from 'react-icons/lib/io/edit';
import IoPerson from 'react-icons/lib/io/person';
import IoIosBriefcase from 'react-icons/lib/io/ios-briefcase';
import GoRepo from 'react-icons/lib/go/repo';
import IoIosPaperOutline from 'react-icons/lib/io/ios-paper-outline';
import IoAndroidRadioButtonOn from 'react-icons/lib/io/android-radio-button-on';
import IoIosStar from 'react-icons/lib/io/ios-star';
import IoIosStarOutline from 'react-icons/lib/io/ios-star-outline';
// Components
import NotFoundPage from '../not-found/NotFoundPage';
import TransitionWrapper from '../shared/components/TransitionWrapper';
import MainContentWrapper from '../shared/components/MainContentWrapper';
import ContentHeader from '../shared/components/ContentHeader';
import HeroImage from '../shared/components/HeroImage';
import RelationshipList from '../shared/components/RelationshipList';
import Menu from '../shared/components/Menu';
import ActionPanel from '../shared/components/ActionPanel';
import Accordion from '../shared/components/Accordion';
import ContentSubheader from '../shared/components/ContentSubheader';
import ContentBodyText from '../shared/components/ContentBodyText';

import classNames from './styles/ResourceContainerStylesheet.css';

const ResourceContainer = (props, context) => (!props.resource
  ? <NotFoundPage message={'Resource not found.'} />
  : <TransitionWrapper>
    <div className={classNames.this}>
      <Menu
        baseUrl={`/resource/${props.resource.rowId}`}
        header={{icon: <GoRepo />, title: 'Resource'}}
        disabled={!context.loggedIn}
        list={[
          {
            icon: props.currentPerson.id
              && props.resource.resourceStarsByResourceId
                .edges.find(edge => edge.node.userByUserId.id === props.currentPerson.id)
                ? <IoIosStar />
                : <IoIosStarOutline />,
            title: 'Star',
            url: 'star',
          },
          { icon: <IoAndroidRadioButtonOn />, title: 'Request Resource', url: 'request-resource' },
          { icon: <IoEdit />, title: 'Edit', url: 'edit' },
        ]}
      />
      <ContentHeader text={props.resource.name} />
      <MainContentWrapper
        right={<Accordion
          panels={[
            {
              header: {
                icon: <IoPerson />,
                label: 'Owner',
              },
              body: <RelationshipList
                listItems={[{
                  name: props.resource.userByOwnerId.name,
                  itemId: props.resource.userByOwnerId.rowId,
                  itemUrl: 'user',
                }]}
              />,
            },
            {
              header: {
                icon: <IoIosBriefcase />,
                label: 'Organizations',
              },
              body: <RelationshipList
                listItems={props.resource.organizationResourcesByResourceId.edges.map(edge => ({
                  name: edge.node.organizationByOrganizationId.name,
                  itemId: edge.node.organizationByOrganizationId.rowId,
                  itemUrl: 'organization',
                  baseId: edge.node.organizationByOrganizationId.rowId,
                  baseUrl: 'organization',
                  relationshipId: edge.node.id,
                  status: edge.node.status,
                  isAdmin: context.loggedIn,
                }))}
              />,
            },
            {
              header: {
                icon: <GoRepo />,
                label: 'Projects',
              },
              body: <RelationshipList
                listItems={props.resource.projectResourcesByResourceId.edges.map(edge => ({
                  name: edge.node.projectByProjectId.name,
                  itemId: edge.node.projectByProjectId.rowId,
                  itemUrl: 'project',
                  baseId: edge.node.projectByProjectId.rowId,
                  baseUrl: 'project',
                  relationshipId: edge.node.id,
                  status: edge.node.status,
                  isAdmin: context.loggedIn,
                }))}
              />,
            },
            {
              header: {
                icon: <IoIosPaperOutline />,
                label: 'Tasks',
              },
              body: <RelationshipList
                listItems={props.resource.taskResourcesByResourceId.edges.map(edge => ({
                  name: edge.node.taskByTaskId.name,
                  itemId: edge.node.taskByTaskId.rowId,
                  itemUrl: 'task',
                  baseId: edge.node.taskByTaskId.rowId,
                  baseUrl: 'task',
                  relationshipId: edge.node.id,
                  status: edge.node.status,
                  isAdmin: context.loggedIn,
                }))}
              />,
            },
          ]}
        />}
        left={<div>
          <ActionPanel
            children={props.children}
            notifyClose={() => context.router.replace(`/resource/${props.resource.rowId}`)}
          />
          <ContentSubheader text={props.resource.location} />
          <ContentBodyText text={props.resource.description} />
          <HeroImage image={props.resource.imageUrl} />
        </div>}
      />
    </div>
  </TransitionWrapper>
);

ResourceContainer.propTypes = {
  resource: React.PropTypes.object,
  currentPerson: React.PropTypes.object,
  children: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.array,
  ]),
};

ResourceContainer.contextTypes = {
  router: React.PropTypes.object,
  loggedIn: React.PropTypes.bool,
};

export default Relay.createContainer(ResourceContainer, {
  initialVariables: {
    resourceId: null,
  },
  fragments: {
    resource: () => Relay.QL`
      fragment on Resource {
        rowId,
        name,
        location,
        imageUrl,
        description,
        userByOwnerId {
          rowId,
          name,
        },
        resourceStarsByResourceId(first: 9) {
          edges {
            node {
              userByUserId {
                id,
              }
            }
          }
        },
        organizationResourcesByResourceId(first: 5) {
          edges {
            node {
              id,
              status,
              organizationByOrganizationId {
                rowId,
                name,
              },
            }
          }
        },
        projectResourcesByResourceId(first: 5) {
          edges {
            node {
              id,
              status,
              projectByProjectId {
                rowId,
                name,
              },
            }
          }
        },
        taskResourcesByResourceId(first: 5) {
          edges {
            node {
              id,
              status,
              taskByTaskId {
                rowId,
                name,
              },
            }
          }
        },
      }
    `,
    currentPerson: () => Relay.QL`
      fragment on User {
        id,
      }
    `,
  },
});
