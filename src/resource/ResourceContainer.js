import React from 'react';
import Relay from 'react-relay';
import IoPerson from 'react-icons/lib/io/person';
import IoIosBriefcase from 'react-icons/lib/io/ios-briefcase';
import GoRepo from 'react-icons/lib/go/repo';
import IoIosPaperOutline from 'react-icons/lib/io/ios-paper-outline';
import TransitionWrapper from '../shared/components/TransitionWrapper';
import HeroImage from '../shared/components/HeroImage';
import RelationshipList from '../shared/components/RelationshipList';
import ResourceActionTabs from './components/ResourceActionTabs';
import UpdateOrganizationResourceMutation from '../organization/mutations/UpdateOrganizationResourceMutation';
import UpdateProjectResourceMutation from '../project/mutations/UpdateProjectResourceMutation';
import UpdateTaskResourceMutation from '../task/mutations/UpdateTaskResourceMutation';
import DeleteOrganizationResourceMutation from '../organization/mutations/DeleteOrganizationResourceMutation';
import DeleteProjectResourceMutation from '../project/mutations/DeleteProjectResourceMutation';
import DeleteTaskResourceMutation from '../task/mutations/DeleteTaskResourceMutation';
import classNames from './styles/ResourceContainerStylesheet.css';

class ResourceContainer extends React.Component {
  static propTypes = {
    resource: React.PropTypes.object,
    query: React.PropTypes.object,
  };

  static contextTypes = {
    loggedIn: React.PropTypes.bool,
  };
  acceptOrganization = relationship => {
    Relay.Store.commitUpdate(
      new UpdateOrganizationResourceMutation({
        organizationResourcePatch: {
          status: 'ACCEPTED',
        },
        organizationResource: relationship,
      })
    );
  }
  acceptProject = relationship => {
    Relay.Store.commitUpdate(
      new UpdateProjectResourceMutation({
        projectResourcePatch: {
          status: 'ACCEPTED',
        },
        projectResource: relationship,
      })
    );
  }
  acceptTask = relationship => {
    Relay.Store.commitUpdate(
      new UpdateTaskResourceMutation({
        taskResourcePatch: {
          status: 'ACCEPTED',
        },
        taskResource: relationship,
      })
    );
  }
  declineOrganization = relationship => {
    Relay.Store.commitUpdate(
      new UpdateOrganizationResourceMutation({
        organizationResourcePatch: {
          status: 'DECLINED',
        },
        organizationResource: relationship,
      })
    );
  }
  declineProject = relationship => {
    Relay.Store.commitUpdate(
      new UpdateProjectResourceMutation({
        projectResourcePatch: {
          status: 'DECLINED',
        },
        projectResource: relationship,
      })
    );
  }
  declineTask = relationship => {
    Relay.Store.commitUpdate(
      new UpdateTaskResourceMutation({
        taskResourcePatch: {
          status: 'DECLINED',
        },
        taskResource: relationship,
      })
    );
  }
  removeOrganization = relationship => {
    Relay.Store.commitUpdate(
      new DeleteOrganizationResourceMutation({
        organizationResource: relationship,
      })
    );
  }
  removeProject = relationship => {
    Relay.Store.commitUpdate(
      new DeleteProjectResourceMutation({
        projectResource: relationship,
      })
    );
  }
  removeTask = relationship => {
    Relay.Store.commitUpdate(
      new DeleteTaskResourceMutation({
        taskResource: relationship,
      })
    );
  }
  render () {
    const {resource, query} = this.props;
    const {loggedIn} = this.context;

    return <TransitionWrapper>
      <div className={classNames.this}>
        <ResourceActionTabs
          isAdmin={loggedIn}
          resource={resource}
          query={query}
        />
        <h3 className={classNames.contentHeading}>{resource.name}</h3>
        <h4 className={classNames.contentSubheading}>
          <span className={classNames.location}>{resource.location}</span>
        </h4>
        <HeroImage image={resource.imageUrl} />
        <p className={classNames.description}>{resource.description}</p>
        <RelationshipList
          icon={<IoPerson />}
          title={'Owner'}
          pathname={'user'}
          listItems={[{
            name: resource.userByOwnerId.name,
            itemId: resource.userByOwnerId.id,
          }]}
        />
        <RelationshipList
          icon={<IoIosBriefcase />}
          title={'Organizations'}
          pathname={'organization'}
          listItems={resource.organizationResourcesByResourceId.edges.map(edge => ({
            name: edge.node.organizationByOrganizationId.name,
            itemId: edge.node.organizationByOrganizationId.id,
            relationship: edge.node,
            status: edge.node.status,
            isAdmin: loggedIn,
            accept: this.acceptOrganization,
            decline: this.declineOrganization,
            remove: this.removeOrganization,
          }))}
        />
        <RelationshipList
          icon={<GoRepo />}
          title={'Projects'}
          pathname={'project'}
          listItems={resource.projectResourcesByResourceId.edges.map(edge => ({
            name: edge.node.projectByProjectId.name,
            itemId: edge.node.projectByProjectId.id,
            relationship: edge.node,
            status: edge.node.status,
            isAdmin: loggedIn,
            accept: this.acceptProject,
            decline: this.declineProject,
            remove: this.removeProject,
          }))}
        />
        <RelationshipList
          icon={<IoIosPaperOutline />}
          title={'Tasks'}
          pathname={'task'}
          listItems={resource.taskResourcesByResourceId.edges.map(edge => ({
            name: edge.node.taskByTaskId.name,
            itemId: edge.node.taskByTaskId.id,
            relationship: edge.node,
            status: edge.node.status,
            isAdmin: loggedIn,
            accept: this.acceptTask,
            decline: this.declineTask,
            remove: this.removeTask,
          }))}
        />
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
        location,
        imageUrl,
        description,
        userByOwnerId {
          id,
          name,
        },
        organizationResourcesByResourceId(first: 5) {
          edges {
            node {
              status,
              organizationByOrganizationId {
                id,
                name,
              },
              ${UpdateOrganizationResourceMutation.getFragment('organizationResource')},
              ${DeleteOrganizationResourceMutation.getFragment('organizationResource')},
            }
          }
        },
        projectResourcesByResourceId(first: 5) {
          edges {
            node {
              status,
              projectByProjectId {
                id,
                name,
              },
              ${UpdateProjectResourceMutation.getFragment('projectResource')},
              ${DeleteProjectResourceMutation.getFragment('projectResource')},
            }
          }
        },
        taskResourcesByResourceId(first: 5) {
          edges {
            node {
              status,
              taskByTaskId {
                id,
                name,
              },
              ${UpdateTaskResourceMutation.getFragment('taskResource')},
              ${DeleteTaskResourceMutation.getFragment('taskResource')},
            }
          }
        },
        ${ResourceActionTabs.getFragment('resource')},
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        ${ResourceActionTabs.getFragment('query')},
      }
    `,
  },
});

/*
import RemoveResourceFromLandDialog from '../shared/components/RemoveResourceFromLandDialog';
import RemoveResourceFromProjectDialog from '../shared/components/RemoveResourceFromProjectDialog';
import RemoveResourceFromTaskDialog from '../shared/components/RemoveResourceFromTaskDialog';
import PendingResourceDialog from './components/PendingResourceDialog';
import createColorChart from '../shared/themes/create-color-chart';
import classNames from './styles/ResourceContainerStylesheet.css';

class ResourceContainer extends React.Component {

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
        <div className={classNames.relationships}>
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
  },
});
*/
