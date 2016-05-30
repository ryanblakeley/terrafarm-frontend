import React from 'react';
import Relay from 'react-relay';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import HeartProject from './components/HeartProject';
import EditProjectDialog from './components/EditProjectDialog';
import NewResourceOfferDialog from './components/NewResourceOfferDialog';
import NewTaskDialog from './components/NewTaskDialog';
import ResourcesPendingNotification from './components/ResourcesPendingNotification';
import PendingResourceDialog from './components/PendingResourceDialog';
import RemoveResourceFromProjectDialog from '../shared/components/RemoveResourceFromProjectDialog';
import UserItem from '../shared/components/UserItem';
import LandItem from '../shared/components/LandItem';
import TaskItem from '../shared/components/TaskItem';
import ResourceItem from '../shared/components/ResourceItem';

import createColorChart from '../shared/themes/create-color-chart';
import transitionNames from '../shared/styles/transitions.css';
import classNames from './styles/ProjectContainerStylesheet.css';

class ProjectContainer extends React.Component {
  static propTypes = {
    master: React.PropTypes.object,
    project: React.PropTypes.object,
    viewer: React.PropTypes.object,
  };
  state = {
    isProjectAdmin: false,
    doesLike: false,
    colorChart: {},
  };
  componentWillMount () {
    const {project, viewer} = this.props;
    const {admins, likedBy, resources} = project;

    this.updateViewerStatus(viewer, admins, likedBy);
    this.updateColorChart(resources);
  }
  componentWillReceiveProps (nextProps) {
    const {project, viewer} = nextProps;
    const {admins, likedBy, resources} = project;

    this.updateViewerStatus(viewer, admins, likedBy);
    this.updateColorChart(resources);
  }
  updateViewerStatus (user, admins, likedBy) {
    const isProjectAdmin = admins.edges.findIndex(edge => edge.node.id === user.id) > -1;
    const doesLike = likedBy.edges.findIndex(edge => edge.node.id === user.id) > -1;

    this.setState({isProjectAdmin, doesLike});
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
  render () {
    const {project, viewer, master} = this.props;
    const {
      isProjectAdmin,
      doesLike,
      resourceOwners,
      colorChart,
    } = this.state;
    const {
      name,
      category,
      lands,
      admins,
      tasks,
      resources,
      resourcesPending,
      likedBy,
    } = project;

    return <CSSTransitionGroup
      transitionName={transitionNames}
      transitionAppear
      transitionAppearTimeout={350}
      transitionEnterTimeout={350}
      transitionLeave={false}
    >
      <div className={classNames.this}>
        <h2 className={classNames.pageHeading}>Project</h2>
        <div className={classNames.actionsHeading}>
          <HeartProject
            project={project}
            user={viewer}
            doesLike={doesLike}
            count={likedBy.edges.length}
          />
          {(isProjectAdmin
            || doesLike)
            && <NewResourceOfferDialog project={project} user={viewer} />
          }
          {isProjectAdmin
            && <NewTaskDialog project={project} master={master} />
          }
          {isProjectAdmin
            && <EditProjectDialog project={project} master={master} />
          }
          {!!resourcesPending.edges.length
            && <ResourcesPendingNotification onTouchTap={this.scrollToResourcesPending} />
          }
        </div>
        <h3 className={classNames.contentHeading}>{name}</h3>
        <h4 className={classNames.contentSubheading}>| {category} |</h4>

        <div className={classNames.relationships} >
          {lands.edges.map(edge => <LandItem
            key={edge.node.id}
            land={edge.node}
          />)}
          {tasks.edges.map(edge => <TaskItem
            key={edge.node.id}
            task={edge.node}
          />)}
          {admins.edges.map(edge => <UserItem
            key={edge.node.id}
            user={edge.node}
            colorSwatch={colorChart[edge.node.id]}
            adminBadge
          />)}
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
              ? <RemoveResourceFromProjectDialog resource={edge.node} project={project} />
              : null;

            return <ResourceItem
              key={edge.node.id}
              resource={edge.node}
              colorSwatches={[colorChart[owner.id]]}
              action={action}
            />;
          })}
          {isProjectAdmin
            && resourcesPending
            && resourcesPending.edges.length > 0
            && resourcesPending.edges.map(edge => <ResourceItem
              key={edge.node.id}
              resource={edge.node}
              action={<PendingResourceDialog
                resource={edge.node}
                project={project}
              />}
            />)
          }
        </div>
      </div>
    </CSSTransitionGroup>;
  }
}

export default Relay.createContainer(ProjectContainer, {
  initialVariables: {
    projectId: null,
  },
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        id,
        name,
        category,
        lands(first: 1) {
          edges {
            node {
              id,
              name,
              ${LandItem.getFragment('land')},
            }
          }
        }
        admins(first: 1) {
          edges {
            node {
              id,
              name,
              ${UserItem.getFragment('user')},
            }
          }
        },
        likedBy(first: 1) {
          edges {
            node {
              id,
            }
          }
        },
        tasks(first: 1) {
          edges {
            node {
              id,
              name,
              ${TaskItem.getFragment('task')},
            }
          }
        },
        resources(first: 1) {
          edges {
            node {
              id,
              name,
              users(first: 1) {
                edges {
                  node { id }
                }
              },
              ${ResourceItem.getFragment('resource')},
              ${RemoveResourceFromProjectDialog.getFragment('resource')},
            }
          }
        },
        resourcesPending(first: 1) {
          edges {
            node {
              id,
              name,
              ${ResourceItem.getFragment('resource')},
              ${PendingResourceDialog.getFragment('resource')},
            }
          }
        },
        ${EditProjectDialog.getFragment('project')},
        ${HeartProject.getFragment('project')},
        ${NewResourceOfferDialog.getFragment('project')},
        ${PendingResourceDialog.getFragment('project')},
        ${RemoveResourceFromProjectDialog.getFragment('project')},
        ${NewTaskDialog.getFragment('project')},
      }
    `,
    viewer: () => Relay.QL`
      fragment on User {
        id,
        ${HeartProject.getFragment('user')},
        ${NewResourceOfferDialog.getFragment('user')},
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        id,
        ${EditProjectDialog.getFragment('master')},
        ${NewTaskDialog.getFragment('master')},
      }
    `,
  },
});
