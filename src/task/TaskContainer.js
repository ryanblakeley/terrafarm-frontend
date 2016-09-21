import React from 'react';
import Relay from 'react-relay';
import TransitionWrapper from '../shared/components/TransitionWrapper';
import PendingResourceDialog from './components/PendingResourceDialog';
import RemoveResourceFromTaskDialog from '../shared/components/RemoveResourceFromTaskDialog';
import ProjectItem from '../shared/components/ProjectItem';
import UserItem from '../shared/components/UserItem';
import ResourceItem from '../shared/components/ResourceItem';
import LandItem from '../shared/components/LandItem';
import TaskActionTabs from './components/TaskActionTabs';

import createColorChart from '../shared/themes/create-color-chart';
import classNames from './styles/TaskContainerStylesheet.css';

class TaskContainer extends React.Component {
  static propTypes = {
    master: React.PropTypes.object,
    task: React.PropTypes.object,
    viewer: React.PropTypes.object,
  };
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
    const {task, viewer, master} = this.props;
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
        <TaskActionTabs
          master={master}
          user={viewer}
          task={task}
          isAdmin={isProjectAdmin}
          doesLike={doesLike}
        />
        <h3 className={classNames.contentHeading}>{name}</h3>
        <h4 className={classNames.contentSubheading}>| {category} |</h4>

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

        <p className={classNames.description}>{description}</p>
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
    viewer: () => Relay.QL`
      fragment on User {
        id,
        ${TaskActionTabs.getFragment('user')},
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        id,
        ${TaskActionTabs.getFragment('master')},
      }
    `,
  },
});
