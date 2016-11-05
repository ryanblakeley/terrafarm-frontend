import React from 'react';
import Relay from 'react-relay';
import GoRepo from 'react-icons/lib/go/repo';
import IoPerson from 'react-icons/lib/io/person';
import IoCube from 'react-icons/lib/io/cube';
import TransitionWrapper from '../shared/components/TransitionWrapper';
import RelationshipList from '../shared/components/RelationshipList';
import TaskActionTabs from './components/TaskActionTabs';
import UpdateTaskResourceMutation from './mutations/UpdateTaskResourceMutation';
import DeleteTaskResourceMutation from './mutations/DeleteTaskResourceMutation';
import classNames from './styles/TaskContainerStylesheet.css';

class TaskContainer extends React.Component {
  static propTypes = {
    task: React.PropTypes.object,
    query: React.PropTypes.object,
    children: React.PropTypes.object,
  };
  static contextTypes = {
    loggedIn: React.PropTypes.bool,
  };
  acceptResource = relationship => {
    Relay.Store.commitUpdate(
      new UpdateTaskResourceMutation({
        taskResourcePatch: {
          status: 'ACCEPTED',
        },
        taskResource: relationship,
      })
    );
  }
  declineResource = relationship => {
    Relay.Store.commitUpdate(
      new UpdateTaskResourceMutation({
        taskResourcePatch: {
          status: 'DECLINED',
        },
        taskResource: relationship,
      })
    );
  }
  removeResource = relationship => {
    Relay.Store.commitUpdate(
      new DeleteTaskResourceMutation({
        taskResource: relationship,
      })
    );
  }
  render () {
    const {task, query, children} = this.props;
    const {loggedIn} = this.context;

    return <TransitionWrapper>
      <div className={classNames.this}>
        <TaskActionTabs task={task} query={query} isAdmin={loggedIn} />
        <div className={classNames.children}>
          {children}
        </div>
        <h3 className={classNames.contentHeading}>{task.name}</h3>
        <p className={classNames.description}>{task.description}</p>
        <RelationshipList
          icon={<GoRepo />}
          title={'Parent Project'}
          pathname={'project'}
          listItems={[{
            name: task.projectByProjectId.name,
            itemId: task.projectByProjectId.rowId,
          }]}
        />
        <RelationshipList
          icon={<IoPerson />}
          title={'Author'}
          pathname={'user'}
          listItems={[{
            name: task.userByAuthorId.name,
            itemId: task.userByAuthorId.rowId,
          }]}
        />
        <RelationshipList
          icon={<IoCube />}
          title={'Resources'}
          pathname={'resource'}
          listItems={task.taskResourcesByTaskId.edges.map(edge => ({
            name: edge.node.resourceByResourceId.name,
            itemId: edge.node.resourceByResourceId.rowId,
            relationship: edge.node,
            status: edge.node.status,
            isAdmin: loggedIn,
            accept: this.acceptResource,
            decline: this.declineResource,
            remove: this.removeResource,
          }))}
        />
      </div>
    </TransitionWrapper>;
  }
}

export default Relay.createContainer(TaskContainer, {
  initialVariables: {
    taskId: null,
  },
  fragments: {
    task: () => Relay.QL`
      fragment on Task {
        name,
        description,
        projectByProjectId {
          rowId,
          name,
        },
        userByAuthorId {
          rowId,
          name,
        },
        taskResourcesByTaskId(first: 10) {
          edges {
            node {
              status,
              resourceByResourceId {
                rowId,
                name,
              },
              ${UpdateTaskResourceMutation.getFragment('taskResource')},
              ${DeleteTaskResourceMutation.getFragment('taskResource')},
            }
          }
        },
        ${TaskActionTabs.getFragment('task')},
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        ${TaskActionTabs.getFragment('query')},
      }
    `,
  },
});
