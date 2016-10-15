import React from 'react';
import Relay from 'react-relay';
import TransitionWrapper from '../shared/components/TransitionWrapper';
// import ResourceItem from '../shared/components/ResourceItem';
// import UserItem from '../shared/components/UserItem';
// import ProjectItem from '../shared/components/ProjectItem';
// import RemoveResourceFromResourceDialog
//   from '../shared/components/RemoveResourceFromResourceDialog';
import HeroImage from '../shared/components/HeroImage';
// import ResourceActionTabs from './components/ResourceActionTabs';
// import PendingResourceDialog from './components/PendingResourceDialog';

// import createColorChart from '../shared/themes/create-color-chart';
import classNames from './styles/ResourceContainerStylesheet.css';

const ResourceContainer = props => <TransitionWrapper>
  <div className={classNames.this}>
    <h3 className={classNames.contentHeading}>{props.resource.name}</h3>
    <h4 className={classNames.contentSubheading}>
      <span className={classNames.location}>{props.resource.location}</span>
    </h4>
    <HeroImage image={props.resource.imageUrl} />
    <p className={classNames.description}>{props.resource.description}</p>
  </div>
</TransitionWrapper>;

ResourceContainer.propTypes = {
  resource: React.PropTypes.object,
};

export default Relay.createContainer(ResourceContainer, {
  initialVariables: {
    resourceId: null,
  },
  fragments: {
    resource: () => Relay.QL`
      fragment on Resource {
        name,
        location,
        imageUrl,
        description,
      }
    `,
  },
});

/*
import React from 'react';
import Relay from 'react-relay';
import TransitionWrapper from '../shared/components/TransitionWrapper';
import UserItem from '../shared/components/UserItem';
import LandItem from '../shared/components/LandItem';
import ProjectItem from '../shared/components/ProjectItem';
import TaskItem from '../shared/components/TaskItem';
import HeroImage from '../shared/components/HeroImage';
import RemoveResourceFromLandDialog from '../shared/components/RemoveResourceFromLandDialog';
import RemoveResourceFromProjectDialog from '../shared/components/RemoveResourceFromProjectDialog';
import RemoveResourceFromTaskDialog from '../shared/components/RemoveResourceFromTaskDialog';
import ResourceActionTabs from './components/ResourceActionTabs';

import classNames from './styles/ResourceContainerStylesheet.css';

class ResourceContainer extends React.Component {
  static propTypes = {
    master: React.PropTypes.object,
    resource: React.PropTypes.object,
    viewer: React.PropTypes.object,
  };
  state = {
    isOwner: false,
    doesLike: false,
  };
  componentWillMount () {
    const {resource, viewer} = this.props;
    const {users, likedBy} = resource;
    const ownerId = users.edges[0].node.id;

    this.updateViewerStatus(viewer, ownerId, likedBy);
  }
  componentWillReceiveProps (nextProps) {
    const {resource, viewer} = nextProps;
    const {users, likedBy} = resource;
    const ownerId = users.edges[0].node.id;

    this.updateViewerStatus(viewer, ownerId, likedBy);
  }
  updateViewerStatus (user, ownerId, likedBy) {
    const isOwner = user.id === ownerId;
    const doesLike = likedBy.edges.findIndex(edge => edge.node.id === user.id) > -1;

    this.setState({isOwner, doesLike});
  }
  render () {
    const {resource, viewer, master} = this.props;
    const {isOwner, doesLike} = this.state;
    const owner = resource.users.edges[0].node;
    const {lands, projects, tasks} = resource;

    return <TransitionWrapper>
      <div className={classNames.this} >
        <ResourceActionTabs
          master={master}
          user={viewer}
          resource={resource}
          isAdmin={isOwner}
          doesLike={doesLike}
        />
        <h3 className={classNames.contentHeading}>{resource.name}</h3>
        <h4 className={classNames.contentSubheading}>
          | {resource.category} | <span className={classNames.location}>{resource.location}</span>
        </h4>
        <HeroImage image={resource.image} />

        <div className={classNames.relationships}>
          <UserItem user={owner} adminBadge />
          {lands.edges.map(edge => {
            const action = isOwner
              ? <RemoveResourceFromLandDialog resource={resource} land={edge.node} />
              : null;

            return <LandItem
              key={edge.node.id}
              land={edge.node}
              action={action}
            />;
          })}
          {projects.edges.map(edge => {
            const action = isOwner
              ? <RemoveResourceFromProjectDialog resource={resource} project={edge.node} />
              : null;

            return <ProjectItem
              key={edge.node.id}
              project={edge.node}
              action={action}
            />;
          })}
          {tasks.edges.map(edge => {
            const action = isOwner
              ? <RemoveResourceFromTaskDialog resource={resource} task={edge.node} />
              : null;

            return <TaskItem
              key={edge.node.id}
              task={edge.node}
              action={action}
            />;
          })}
        </div>

        <p className={classNames.description}>{resource.description}</p>
      </div>
    </TransitionWrapper>;
  }
}

export default Relay.createContainer(ResourceContainer, {
  initialVariables: {
    resourceId: null,
  },
  fragments: {
    resource: () => Relay.QL`
      fragment on Resource {
        name,
        description,
        category,
        image,
        users(first: 1) {
          edges {
            node {
              id,
              name,
              ${UserItem.getFragment('user')},
            }
          }
        },
        lands(first: 3) {
          edges {
            node {
              id,
              name,
              ${LandItem.getFragment('land')},
              ${RemoveResourceFromLandDialog.getFragment('land')},
            }
          }
        },
        projects(first: 6) {
          edges {
            node {
              id,
              name,
              ${ProjectItem.getFragment('project')},
              ${RemoveResourceFromProjectDialog.getFragment('project')},
            }
          }
        },
        tasks(first: 6) {
          edges {
            node {
              id,
              name,
              ${TaskItem.getFragment('task')},
              ${RemoveResourceFromTaskDialog.getFragment('task')},
            }
          }
        },
        likedBy(first: 6) {
          edges {
            node {
              id,
            }
          }
        },
        ${RemoveResourceFromLandDialog.getFragment('resource')},
        ${RemoveResourceFromProjectDialog.getFragment('resource')},
        ${RemoveResourceFromTaskDialog.getFragment('resource')},
        ${ResourceActionTabs.getFragment('resource')},
      }
    `,
    viewer: () => Relay.QL`
      fragment on User {
        id,
        ${ResourceActionTabs.getFragment('user')},
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        id,
        ${ResourceActionTabs.getFragment('master')},
      }
    `,
  },
});
*/
