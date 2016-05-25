import React from 'react';
import Relay from 'react-relay';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import EditTaskDialog from './components/EditTaskDialog';
import NewResourceOfferDialog from './components/NewResourceOfferDialog';
import ResourcesPendingNotification from './components/ResourcesPendingNotification';
import PendingResourceDialog from './components/PendingResourceDialog';
import RemoveResourceFromTaskDialog from '../shared/components/RemoveResourceFromTaskDialog';
import ProjectItem from '../shared/components/ProjectItem';
import UserItem from '../shared/components/UserItem';
import ResourceItem from '../shared/components/ResourceItem';
import LandItem from '../shared/components/LandItem';

import transitionNames from '../shared/styles/transitions.css';
import classNames from './styles/TaskContainerStylesheet.css';

class TaskContainer extends React.Component {
  static propTypes = {
    task: React.PropTypes.object,
    viewer: React.PropTypes.object,
  };
  state = {
    isProjectAdmin: false,
    likedBy: [],
    resourceOwners: [],
    availableResources: [],
  };
  componentWillMount () {
    const {task, viewer} = this.props;
    const {projects, resources} = task;
    const {admins, likedBy} = projects.edges[0].node;

    this.updateViewerStatus(viewer, admins, likedBy);
    this.updateUserList(resources);
  }
  componentWillReceiveProps (nextProps) {
    const {task, viewer} = nextProps;
    const {projects, resources} = task;
    const {admins, likedBy} = projects.edges[0].node;

    this.updateViewerStatus(viewer, admins, likedBy);
    this.updateUserList(resources);
  }
  updateViewerStatus (user, admins, likedBy) {
    const isProjectAdmin = admins.edges.findIndex(edge => edge.node.id === user.id) > -1;
    const doesLike = likedBy.edges.findIndex(edge => edge.node.id === user.id) > -1;

    this.setState({isProjectAdmin, doesLike});
  }
  updateUserList (resources) {
    const userIds = [];
    let resourceOwners = resources.edges.map(edge => {
      return edge.node.users.edges.map(userEdge => userEdge.node);
    });
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
  scrollToResourcesPending = () => {
    const {resourcesPending} = this.refs;
    resourcesPending.scrollIntoView();
  }
  render () {
    const {task, viewer, master} = this.props;
    const {isProjectAdmin, doesLike, resourceOwners} = this.state;
    const {
      name,
      category,
      description,
      projects,
      users,
      resources,
      resourcesPending,
    } = task;
    const parentProject = projects.edges[0].node;
    const parentLand = parentProject.lands.edges[0].node;

    return <CSSTransitionGroup
      transitionName={transitionNames}
      transitionAppear
      transitionAppearTimeout={350}
      transitionEnterTimeout={350}
      transitionLeave={false}
    >
      <div className={classNames.this}>
        <h2 className={classNames.pageHeading}>Task</h2>
        <div className={classNames.actionsHeading}>
          {isProjectAdmin
            && <EditTaskDialog task={task} master={master} />
          }
          {doesLike
            && <NewResourceOfferDialog
              task={task}
              user={viewer}
              isProjectAdmin={isProjectAdmin}
            />
          }
          {isProjectAdmin
            && !!resourcesPending.edges.length
            && <ResourcesPendingNotification onTouchTap={this.scrollToResourcesPending} />
          }
        </div>
        <h3 className={classNames.contentHeading}>{task.name}</h3>
        <h4 className={classNames.contentSubheading}>| {task.category} |</h4>

        <div className={classNames.relationships} >
          <LandItem key={parentLand.id} land={parentLand} />
          <ProjectItem key={parentProject.id} project={parentProject} />

          {resourceOwners
            && resourceOwners.length > 0
            && resourceOwners.map(owner => {
              return <UserItem
                key={owner.id}
                user={owner}
              />;
            })
          }
          {resources.edges.map(edge => {
            const owner = edge.node.users.edges[0].node;
            const action = (isProjectAdmin || owner.id === viewer.id)
              ? <RemoveResourceFromTaskDialog resource={edge.node} task={task} />
              : null;

            return <ResourceItem
              key={edge.node.id}
              resource={edge.node}
              action={action}
            />;
          })}
          {isProjectAdmin
            && resourcesPending
            && resourcesPending.edges.length > 0
            && resourcesPending.edges.map(edge => {
              return <div key={edge.node.id}>
                <ResourceItem
                  resource={edge.node}
                  action={<PendingResourceDialog
                    resource={edge.node}
                    task={task}
                  />}
                />
              </div>;
            })
          }
        </div>

        <p className={classNames.description}>{description}</p>
      </div>
    </CSSTransitionGroup>;
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
              likedBy(first: 18) {
                edges {
                  node {id}
                }
              },
              admins(first: 18) {
                edges {
                  node {
                    id,
                  }
                }
              },
              resources(first: 18) {
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
        resources(first: 18) {
          edges {
            node {
              id,
              name,
              users(first: 8) {
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
        resourcesPending(first: 18) {
          edges {
            node {
              id,
              name,
              ${PendingResourceDialog.getFragment('resource')},
              ${ResourceItem.getFragment('resource')},
            }
          }
        },
        ${NewResourceOfferDialog.getFragment('task')},
        ${EditTaskDialog.getFragment('task')},
        ${PendingResourceDialog.getFragment('task')},
        ${RemoveResourceFromTaskDialog.getFragment('task')},
      }
    `,
    viewer: () => Relay.QL`
      fragment on User {
        id,
        ${NewResourceOfferDialog.getFragment('user')},
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        id,
        ${EditTaskDialog.getFragment('master')},
      }
    `,
  },
});
