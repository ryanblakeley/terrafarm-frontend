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
    const {task, query} = this.props;
    const {loggedIn} = this.context;

    return <TransitionWrapper>
      <div className={classNames.this}>
        <TaskActionTabs task={task} query={query} isAdmin={loggedIn} />
        <h3 className={classNames.contentHeading}>{task.name}</h3>
        <p className={classNames.description}>{task.description}</p>
        <RelationshipList
          icon={<GoRepo />}
          title={'Parent Project'}
          pathname={'project'}
          listItems={[{
            name: task.projectByProjectId.name,
            itemId: task.projectByProjectId.id,
          }]}
        />
        <RelationshipList
          icon={<IoPerson />}
          title={'Author'}
          pathname={'user'}
          listItems={[{
            name: task.userByAuthorId.name,
            itemId: task.userByAuthorId.id,
          }]}
        />
        <RelationshipList
          icon={<IoCube />}
          title={'Resources'}
          pathname={'resource'}
          listItems={task.taskResourcesByTaskId.edges.map(edge => ({
            name: edge.node.resourceByResourceId.name,
            itemId: edge.node.resourceByResourceId.id,
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
          id,
          name,
        },
        userByAuthorId {
          id,
          name,
        },
        taskResourcesByTaskId(first: 10) {
          edges {
            node {
              status,
              resourceByResourceId {
                id,
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

/*
import PendingResourceDialog from './components/PendingResourceDialog';
import RemoveResourceFromTaskDialog from '../shared/components/RemoveResourceFromTaskDialog';

import createColorChart from '../shared/themes/create-color-chart';
import classNames from './styles/TaskContainerStylesheet.css';

class TaskContainer extends React.Component {
  state = {
    isProjectAdmin: false,
    likedBy: [],
    resourceOwners: [],
    availableResources: [],
    colorChart: {},
  };
  componentWillMount () {
    const {task, viewer} = this.props;
    const {projects, resources} = task;
    const {admins, likedBy} = projects.edges[0].node;

    this.updateViewerStatus(viewer, admins, likedBy);
    this.updateUserList(resources);
    this.updateColorChart(resources);
  }
  componentWillReceiveProps (nextProps) {
    const {task, viewer} = nextProps;
    const {projects, resources} = task;
    const {admins, likedBy} = projects.edges[0].node;

    this.updateViewerStatus(viewer, admins, likedBy);
    this.updateUserList(resources);
    this.updateColorChart(resources);
  }
  updateViewerStatus (user, admins, likedBy) {
    const isProjectAdmin = admins.edges.findIndex(edge => edge.node.id === user.id) > -1;
    const doesLike = likedBy.edges.findIndex(edge => edge.node.id === user.id) > -1;

    this.setState({isProjectAdmin, doesLike});
  }
  updateUserList (resources) {
    const userIds = [];
    let resourceOwners = resources.edges.map(edge => (
      edge.node.users.edges.map(userEdge => userEdge.node)
    ));
    resourceOwners = [].concat.apply([], resourceOwners);
    resourceOwners = resourceOwners.filter(user => {
      if (userIds.indexOf(user.id) > -1) {
        return false;
      }
      userIds.push(user.id);
      return true;
    });

    this.setState({resourceOwners});
  }
  updateColorChart (resources) {
    const userIds = [];
    let resourceOwners = resources.edges.map(edge => edge.node.users.edges[0].node);
    resourceOwners = [].concat.apply([], resourceOwners);
    resourceOwners = resourceOwners.filter(user => {
      if (userIds.indexOf(user.id) > -1) {
        return false;
      }
      userIds.push(user.id);
      return true;
    });

    const colorChart = createColorChart(userIds);

    this.setState({colorChart});
  }
  scrollToResourcesPending = () => {
    const {resourcesPending} = this.refs;
    resourcesPending.scrollIntoView();
  }
  render () {
    const {
      isProjectAdmin,
      doesLike,
      resourceOwners,
      colorChart,
    } = this.state;
    const {
      name,
      category,
      description,
      projects,
      resources,
      resourcesPending,
    } = task;
    const parentProject = projects.edges[0].node;
    const parentLand = parentProject.lands.edges[0].node;

    return <TransitionWrapper>
      <div className={classNames.this}>
            <div className={classNames.relationships} >
          <LandItem key={parentLand.id} land={parentLand} />
          <ProjectItem key={parentProject.id} project={parentProject} />

          {resourceOwners
            && resourceOwners.length > 0
            && resourceOwners.map(owner => <UserItem
              key={owner.id}
              user={owner}
              colorSwatch={colorChart[owner.id]}
            />)
          }

          {resources.edges.map(edge => {
            const owner = edge.node.users.edges[0].node;
            const action = (isProjectAdmin || owner.id === viewer.id)
              ? <RemoveResourceFromTaskDialog resource={edge.node} task={task} />
              : null;

            return <ResourceItem
              key={edge.node.id}
              resource={edge.node}
              colorSwatches={[colorChart[owner.id]]}
              action={action}
            />;
          })}
          <div ref={'resourcesPending'} >
            {isProjectAdmin
              && resourcesPending
              && resourcesPending.edges.length > 0
              && resourcesPending.edges.map(edge => <div key={edge.node.id}>
                <ResourceItem
                  resource={edge.node}
                  action={<PendingResourceDialog
                    resource={edge.node}
                    task={task}
                  />}
                />
              </div>)
            }
          </div>
        </div>
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
        id,
        name,
        category,
        description,
        projects(first: 1) {
          edges {
            node {
              id,
              name,
              lands(first: 1) {
                edges {
                  node {
                    id,
                    ${LandItem.getFragment('land')},
                  }
                }
              },
              likedBy(first: 1) {
                edges {
                  node {id}
                }
              },
              admins(first: 1) {
                edges {
                  node {
                    id,
                  }
                }
              },
              resources(first: 1) {
                edges {
                  node {
                    id,
                  }
                }
              },
              ${ProjectItem.getFragment('project')},
            }
          }
        },
        resources(first: 6) {
          edges {
            node {
              id,
              name,
              users(first: 1) {
                edges {
                  node {
                    id,
                    ${UserItem.getFragment('user')},
                  }
                }
              },
              ${ResourceItem.getFragment('resource')},
              ${RemoveResourceFromTaskDialog.getFragment('resource')},
            }
          }
        },
        resourcesPending(first: 1) {
          edges {
            node {
              id,
              name,
              ${PendingResourceDialog.getFragment('resource')},
              ${ResourceItem.getFragment('resource')},
            }
          }
        },
        ${PendingResourceDialog.getFragment('task')},
        ${RemoveResourceFromTaskDialog.getFragment('task')},
        ${TaskActionTabs.getFragment('task')},
      }
    `,
  },
});
*/
