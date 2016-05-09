import React from 'react';
import Relay from 'react-relay';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import HeartProject from './components/HeartProject';
import EditProjectDialog from './components/EditProjectDialog';
import NewResourceOfferDialog from './components/NewResourceOfferDialog';
import ResourcesPendingNotification from './components/ResourcesPendingNotification';
import PendingResourceDialog from './components/PendingResourceDialog';
import RemoveResourceFromProjectDialog from '../shared/components/RemoveResourceFromProjectDialog';
import UserItem from '../shared/components/UserItem';
import LandItem from '../shared/components/LandItem';
import TaskItem from '../shared/components/TaskItem';
import ResourceItem from '../shared/components/ResourceItem';

import transitionNames from '../shared/styles/transitions.css';
import classNames from './styles/ProjectContainerStylesheet.css';

class ProjectContainer extends React.Component {
  static propTypes = {
    project: React.PropTypes.object,
    viewer: React.PropTypes.object,
  };
  state = {
    isProjectAdmin: false,
    doesLike: false,
  };
  componentWillMount () {
    const {project, viewer} = this.props;
    const {admins, likedBy} = project;

    this.updateViewerStatus(viewer, admins, likedBy);
  }
  componentWillReceiveProps (nextProps) {
    const {project, viewer} = nextProps;
    const {admins, likedBy} = project;

    this.updateViewerStatus(viewer, admins, likedBy);
  }
  updateViewerStatus (user, admins, likedBy) {
    const isProjectAdmin = admins.edges.findIndex(edge => edge.node.id === user.id) > -1;
    const doesLike = likedBy.edges.findIndex(edge => edge.node.id === user.id) > -1;

    this.setState({isProjectAdmin, doesLike});
  }
  render () {
    const {project, viewer, master} = this.props;
    const {isProjectAdmin, doesLike} = this.state;
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
          {isProjectAdmin
            && <EditProjectDialog project={project} master={master} />
          }
          {doesLike
            && <NewResourceOfferDialog project={project} user={viewer} />
          }
          {!!resourcesPending.edges.length
            && <ResourcesPendingNotification onTouchTap={this.scrollToResourcesPending} />
          }
        </div>
        <h3 className={classNames.contentHeading}>{name}</h3>
        <h4 className={classNames.contentSubheading}>| {category} |</h4>

        <div className={classNames.relationships} >
          {lands.edges.map(edge => {
            return <LandItem
              key={edge.node.id}
              land={edge.node}
            />;
          })}
          {admins.edges.map(edge => {
            return <UserItem
              key={edge.node.id}
              user={edge.node}
              adminBadge
            />;
          })}
          {tasks.edges.map(edge => {
            return <TaskItem
              key={edge.node.id}
              task={edge.node}
            />;
          })}
          {resources.edges.map(edge => {
            const owner = edge.node.users.edges[0].node;
            const action = (isProjectAdmin || owner.id === viewer.id)
              ? <RemoveResourceFromProjectDialog resource={edge.node} project={project} />
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
              return <ResourceItem
                key={edge.node.id}
                resource={edge.node}
                action={<PendingResourceDialog
                  resource={edge.node}
                  project={project}
                />}
              />;
            })
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
        admins(first: 18) {
          edges {
            node {
              id,
              name,
              ${UserItem.getFragment('user')},
            }
          }
        },
        likedBy(first: 18) {
          edges {
            node {
              id,
            }
          }
        },
        tasks(first: 18) {
          edges {
            node {
              id,
              name,
              ${TaskItem.getFragment('task')},
            }
          }
        },
        resources(first: 18) {
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
        resourcesPending(first: 18) {
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
      }
    `,
  },
});
