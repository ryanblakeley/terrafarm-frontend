import React from 'react';
import Relay from 'react-relay';
import IoIosBriefcase from 'react-icons/lib/io/ios-briefcase';
import IoIosPaperOutline from 'react-icons/lib/io/ios-paper-outline';
import IoCube from 'react-icons/lib/io/cube';
import TransitionWrapper from '../shared/components/TransitionWrapper';
import HeroImage from '../shared/components/HeroImage';
import RelationshipList from '../shared/components/RelationshipList';
import ProjectActionTabs from './components/ProjectActionTabs';
import classNames from './styles/ProjectContainerStylesheet.css';

const ProjectContainer = (props, context) => <TransitionWrapper>
  <div className={classNames.this}>
    <ProjectActionTabs
      isAdmin={context.loggedIn}
      project={props.project}
      query={props.query}
    />
    <h3 className={classNames.contentHeading}>{props.project.name}</h3>
    <HeroImage image={props.project.imageUrl} />
    <p className={classNames.description}>{props.project.description}</p>
    <RelationshipList
      icon={<IoIosBriefcase />}
      title={'Parent Organization'}
      pathname={'organization'}
      listItems={[{
        id: props.project.organizationByOrganizationId.id,
        name: props.project.organizationByOrganizationId.name,
      }]}
    />
    <RelationshipList
      icon={<IoIosPaperOutline />}
      title={'Tasks'}
      pathname={'task'}
      listItems={props.project.tasksByProjectId.edges.map(edge => ({
        id: edge.node.id,
        name: edge.node.name,
      }))}
    />
    <RelationshipList
      icon={<IoCube />}
      title={'Resources'}
      pathname={'resource'}
      listItems={props.project.projectResourcesByProjectId.edges.map(edge => ({
        id: edge.node.resourceByResourceId.id,
        name: edge.node.resourceByResourceId.name,
        status: edge.node.status,
      }))}
    />
  </div>
</TransitionWrapper>;

ProjectContainer.propTypes = {
  project: React.PropTypes.object,
  query: React.PropTypes.object,
};

ProjectContainer.contextTypes = {
  loggedIn: React.PropTypes.bool,
};

export default Relay.createContainer(ProjectContainer, {
  initialVariables: {
    projectId: null,
  },
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        name,
        imageUrl,
        description,
        organizationByOrganizationId {
          id,
          name,
        },
        tasksByProjectId(first: 10) {
          edges {
            node {
              id,
              name,
            }
          }
        },
        projectResourcesByProjectId(first: 10) {
          edges {
            node {
              status,
              resourceByResourceId {
                id,
                name,
              }
            }
          }
        },
        ${ProjectActionTabs.getFragment('project')},
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        ${ProjectActionTabs.getFragment('query')},
      }
    `,
  },
});

/*
import PendingResourceDialog from './components/PendingResourceDialog';
import RemoveResourceFromProjectDialog from '../shared/components/RemoveResourceFromProjectDialog';

import createColorChart from '../shared/themes/create-color-chart';
import classNames from './styles/ProjectContainerStylesheet.css';

class ProjectContainer extends React.Component {
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
    } = project;

    return <TransitionWrapper>
      <div className={classNames.this}>
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
    </TransitionWrapper>;
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
        likedBy(first: 6) {
          edges {
            node {
              id,
            }
          }
        },
        tasks(first: 6) {
          edges {
            node {
              id,
              name,
              ${TaskItem.getFragment('task')},
            }
          }
        },
        resources(first: 3) {
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
        resourcesPending(first: 3) {
          edges {
            node {
              id,
              name,
              ${ResourceItem.getFragment('resource')},
              ${PendingResourceDialog.getFragment('resource')},
            }
          }
        },
        ${PendingResourceDialog.getFragment('project')},
        ${RemoveResourceFromProjectDialog.getFragment('project')},
        ${ProjectActionTabs.getFragment('project')},
      }
    `,
  },
});
*/
