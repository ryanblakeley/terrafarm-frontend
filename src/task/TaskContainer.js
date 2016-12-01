import React from 'react';
import Relay from 'react-relay';
// Icons
import IoEdit from 'react-icons/lib/io/edit';
import IoIosPaperOutline from 'react-icons/lib/io/ios-paper-outline';
import IoAndroidRadioButtonOn from 'react-icons/lib/io/android-radio-button-on';
import IoPerson from 'react-icons/lib/io/person';
import IoCube from 'react-icons/lib/io/cube';
// Components
import NotFoundPage from '../not-found/NotFoundPage';
import TransitionWrapper from '../shared/components/TransitionWrapper';
import MainContentWrapper from '../shared/components/MainContentWrapper';
import ContentHeader from '../shared/components/ContentHeader';
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
                  name: props.task.userByAuthorId && props.task.userByAuthorId.name,
                  itemId: props.task.userByAuthorId.rowId,
                  itemUrl: 'user',
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
                  name: edge.node.resourceByResourceId.name,
                  itemId: edge.node.resourceByResourceId.rowId,
                  itemUrl: 'resource',
                  baseId: props.task.rowId,
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
            notifyClose={() => (
              context.router.replace(`/task/${props.task.rowId}`)
            )}
          />
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
        rowId,
        name,
        description,
        userByAuthorId {
          rowId,
          name,
        },
        taskResourcesByTaskId(first: 10) {
          edges {
            node {
              id,
              status,
              resourceByResourceId {
                rowId,
                name,
              },
            }
          }
        },
      }
    `,
  },
});
