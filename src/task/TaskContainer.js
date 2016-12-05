import React from 'react';
import Relay from 'react-relay';
// Icons
import IoEdit from 'react-icons/lib/io/edit';
import IoIosPaperOutline from 'react-icons/lib/io/ios-paper-outline';
import IoAndroidRadioButtonOn from 'react-icons/lib/io/android-radio-button-on';
import IoPerson from 'react-icons/lib/io/person';
import IoCube from 'react-icons/lib/io/cube';
import IoIosBriefcase from 'react-icons/lib/io/ios-briefcase';
// Components
import NotFoundPage from '../not-found/NotFoundPage';
import TransitionWrapper from '../shared/components/TransitionWrapper';
import MainContentWrapper from '../shared/components/MainContentWrapper';
import ContentHeader from '../shared/components/ContentHeader';
import ContentSubheader from '../shared/components/ContentSubheader';
import RelationshipList from '../shared/components/RelationshipList';
import Menu from '../shared/components/Menu';
import ActionPanel from '../shared/components/ActionPanel';
import Accordion from '../shared/components/Accordion';
import ContentBodyText from '../shared/components/ContentBodyText';

import classNames from './styles/TaskContainerStylesheet.css';

const TaskContainer = (props, context) => (!props.task
  ? <NotFoundPage message={'Task not found.'} />
  : <TransitionWrapper>
    <div className={classNames.this}>
      <Menu
        baseUrl={`/task/${props.task.rowId}`}
        header={{icon: <IoIosPaperOutline />, title: 'Task'}}
        disabled={!context.loggedIn}
        list={[
          {
            icon: <IoAndroidRadioButtonOn />,
            title: 'Request Resource',
            url: 'request-resource',
            disabled: props.task.userByAuthorId.rowId !== context.userId,
          },
          {
            icon: <IoCube />,
            title: 'Offer Resource',
            url: 'offer-resource',
          },
          {
            icon: <IoEdit />,
            title: 'Edit',
            url: 'edit',
            disabled: props.task.userByAuthorId.rowId !== context.userId,
          },
        ]}
      />
      <ContentHeader text={props.task.name} />
      <MainContentWrapper
        right={<Accordion
          panels={[
            {
              header: {
                icon: <IoPerson />,
                label: 'Author',
              },
              body: <RelationshipList
                listItems={[{
                  id: props.task.userByAuthorId.id,
                  name: props.task.userByAuthorId.name,
                  itemUrl: `/user/${props.task.userByAuthorId.rowId}`,
                }]}
              />,
            },
            {
              header: {
                icon: <IoCube />,
                label: 'Resources',
              },
              body: <RelationshipList
                listItems={props.task.taskResourcesByTaskId.edges.map(edge => ({
                  id: edge.node.id,
                  name: edge.node.resourceByResourceId.name,
                  itemUrl: `/resource/${edge.node.resourceByResourceId.rowId}`,
                  actionUrl: `/task/${props.task.rowId}/review-allocation/${edge.node.id}`,
                  status: edge.node.status,
                  authorized: context.userId === props.task.authorId
                    || context.userId === edge.node.resourceByResourceId.ownerId,
                }))}
              />,
            },
            {
              header: {
                icon: <IoIosBriefcase />,
                label: 'Organizations',
              },
              body: <RelationshipList
                listItems={props.task.organizationTasksByTaskId.edges.map(edge => ({
                  id: edge.node.id,
                  name: edge.node.organizationByOrganizationId.name,
                  itemUrl: `/organization/${edge.node.organizationByOrganizationId.rowId}`,
                }))}
              />,
            },
          ]}
        />}
        left={<div>
          <ActionPanel
            children={props.children}
            notifyClose={() => (
              context.router.replace(`/task/${props.task.rowId}`)
            )}
          />
          <ContentSubheader text={props.task.placeByPlaceId && props.task.placeByPlaceId.address} />
          <ContentBodyText text={props.task.description} />
        </div>}
      />
    </div>
  </TransitionWrapper>
);

TaskContainer.propTypes = {
  task: React.PropTypes.object,
  query: React.PropTypes.object,
  children: React.PropTypes.object,
};

TaskContainer.contextTypes = {
  loggedIn: React.PropTypes.bool,
  router: React.PropTypes.object,
  userId: React.PropTypes.string,
};

export default Relay.createContainer(TaskContainer, {
  initialVariables: {
    taskId: null,
  },
  fragments: {
    task: () => Relay.QL`
      fragment on Task {
        id,
        rowId,
        name,
        description,
        authorId,
        userByAuthorId {
          id,
          rowId,
          name,
        },
        placeByPlaceId {
          address,
        },
        taskResourcesByTaskId(first: 10) {
          edges {
            node {
              id,
              status,
              resourceByResourceId {
                rowId,
                name,
                ownerId,
              },
            }
          }
        },
        organizationTasksByTaskId(first: 10) {
          edges {
            node {
              id,
              organizationByOrganizationId {
                name,
                rowId,
              }
            }
          }
        },
      }
    `,
  },
});
