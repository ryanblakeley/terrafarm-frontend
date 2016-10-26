import React from 'react';
import Relay from 'react-relay';
import IoIosBriefcase from 'react-icons/lib/io/ios-briefcase';
import IoIosPaperOutline from 'react-icons/lib/io/ios-paper-outline';
import IoCube from 'react-icons/lib/io/cube';
import TransitionWrapper from '../shared/components/TransitionWrapper';
import HeroImage from '../shared/components/HeroImage';
import RelationshipList from '../shared/components/RelationshipList';
import UserActionTabs from './components/UserActionTabs';
import classNames from './styles/UserContainerStylesheet.css';

const UserContainer = props => <TransitionWrapper>
  <div className={classNames.this}>
    <UserActionTabs />
    <h3 className={classNames.contentHeading}>{props.user.name}</h3>
    <h4 className={classNames.contentSubheading}>
      <span className={classNames.location}>{props.user.location}</span>
    </h4>
    <HeroImage image={props.user.imageUrl} />
    <p className={classNames.description}>{props.user.description}</p>
    <RelationshipList
      icon={<IoIosBriefcase />}
      title={'Organizations'}
      pathname={'organization'}
      listItems={props.user.organizationMembersByMemberId.edges.map(edge => ({
        id: edge.node.organizationByOrganizationId.id,
        name: edge.node.organizationByOrganizationId.name,
      }))}
    />
    <RelationshipList
      icon={<IoIosPaperOutline />}
      title={'Tasks'}
      pathname={'task'}
      listItems={props.user.tasksByAuthorId.edges.map(edge => ({
        id: edge.node.id,
        name: edge.node.name,
      }))}
    />
    <RelationshipList
      icon={<IoCube />}
      title={'Resources'}
      pathname={'resource'}
      listItems={props.user.resourcesByOwnerId.edges.map(edge => ({
        id: edge.node.id,
        name: edge.node.name,
      }))}
    />
  </div>
</TransitionWrapper>;

UserContainer.propTypes = {
  user: React.PropTypes.shape({
    name: React.PropTypes.string,
    location: React.PropTypes.string,
    description: React.PropTypes.string,
    imageUrl: React.PropTypes.string,
    organizationMembersByMemberId: React.PropTypes.object,
    resourcesByOwnerId: React.PropTypes.object,
    tasksByAuthorId: React.PropTypes.object,
  }).isRequired,
};

export default Relay.createContainer(UserContainer, {
  initialVariables: {
    userId: null,
  },
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        name,
        location,
        imageUrl,
        description,
        organizationMembersByMemberId(first: 5) {
          edges {
            node {
              organizationByOrganizationId {
                id,
                name,
              }
            }
          }
        },
        resourcesByOwnerId(first: 10) {
          edges {
            node {
              id,
              name,
            }
          }
        },
        tasksByAuthorId(first: 10) {
          edges {
            node {
              id,
              name,
            }
          }
        },
      }
    `,
  },
});


/*
import RemoveResourceFromUserDialog
  from '../shared/components/RemoveResourceFromUserDialog';
import PendingResourceDialog from './components/PendingResourceDialog';
import createColorChart from '../shared/themes/create-color-chart';
import classNames from './styles/UserContainerStylesheet.css';

class UserContainer extends React.Component {
  state = {
    landsUsingResources: [],
    projectsUsingResources: [],
    tasksUsingResources: [],
  };
  componentWillMount () {
    const {user} = this.props;
    const {landsAdmin, projectsAdmin, resources} = user;

    this.updateLandList(landsAdmin, resources);
    this.updateProjectList(projectsAdmin, resources);
    this.updateTaskList(resources);
  }
  componentWillReceiveProps (nextProps) {
    const {user} = nextProps;
    const {landsAdmin, projectsAdmin, resources} = user;

    this.updateLandList(landsAdmin, resources);
    this.updateProjectList(projectsAdmin, resources);
    this.updateTaskList(resources);
  }
  updateLandList (landsAdmin, resources) {
    const landIds = landsAdmin.edges.map(edge => edge.node.id);

    let landsUsingResources = resources.edges.map(edge => (
      edge.node.lands.edges.map(landEdge => landEdge.node)
    ));
    landsUsingResources = [].concat.apply([], landsUsingResources);
    landsUsingResources = landsUsingResources.filter(land => {
      if (landIds.indexOf(land.id) > -1) {
        return false;
      }
      landIds.push(land.id);
      return true;
    });

    this.setState({landsUsingResources});
  }
  updateProjectList (projectsAdmin, resources) {
    const projectIds = projectsAdmin.edges.map(edge => edge.node.id);

    let projectsUsingResources = resources.edges.map(edge => (
      edge.node.projects.edges.map(projectEdge => projectEdge.node)
    ));
    projectsUsingResources = [].concat.apply([], projectsUsingResources);
    projectsUsingResources = projectsUsingResources.filter(project => {
      if (projectIds.indexOf(project.id) > -1) {
        return false;
      }
      projectIds.push(project.id);
      return true;
    });

    this.setState({projectsUsingResources});
  }
  updateTaskList (resources) {
    const taskIds = [];

    let tasksUsingResources = resources.edges.map(edge => (
      edge.node.tasks.edges.map(taskEdge => taskEdge.node)
    ));
    tasksUsingResources = [].concat.apply([], tasksUsingResources);
    tasksUsingResources = tasksUsingResources.filter(task => {
      if (taskIds.indexOf(task.id) > -1) {
        return false;
      }
      taskIds.push(task.id);
      return true;
    });

    this.setState({tasksUsingResources});
  }
  render () {
    const {user} = this.props;
    const {
      landsUsingResources,
      projectsUsingResources,
      tasksUsingResources,
    } = this.state;
    const {landsAdmin, projectsAdmin, resources} = user;

    return <TransitionWrapper>
      <div className={classNames.this} >
        <div className={classNames.relationships} >
          {landsAdmin.edges.map(edge => <LandItem
            key={edge.node.id}
            land={edge.node}
            adminBadge
          />)}

          {landsUsingResources
            && landsUsingResources.length > 0
            && landsUsingResources.map(land => <LandItem
              key={land.id}
              land={land}
            />)
          }

          {projectsAdmin
            && projectsAdmin.edges.length > 0
            && projectsAdmin.edges.map(edge => <ProjectItem
              key={edge.node.id}
              project={edge.node}
              adminBadge
            />)
          }

          {projectsUsingResources
            && projectsUsingResources.length > 0
            && projectsUsingResources.map(project => <ProjectItem
              key={project.id}
              project={project}
            />)
          }

          {tasksUsingResources
            && tasksUsingResources.length > 0
            && tasksUsingResources.map(task => <TaskItem
              key={task.id}
              task={task}
            />)
          }

          {resources
            && resources.edges.length > 0
            && resources.edges.map(edge => <ResourceItem
              key={edge.node.id}
              resource={edge.node}
            />)
          }
        </div>
      </div>
    </TransitionWrapper>;
  }
}

export default Relay.createContainer(UserContainer, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id,
        name,
        image,
        location,
        description,
        resources(first: 1) {
          edges {
            node {
              id,
              name,
              lands(first: 1) {
                edges {
                  node {
                    name,
                    id,
                    ${LandItem.getFragment('land')},
                  }
                }
              },
              projects(first: 1) {
                edges {
                  node {
                    name,
                    id,
                    ${ProjectItem.getFragment('project')},
                  }
                }
              },
              tasks(first: 1) {
                edges {
                  node {
                    name,
                    id,
                    ${TaskItem.getFragment('task')},
                  }
                }
              },
              ${ResourceItem.getFragment('resource')},
            }
          },
        },
        landsAdmin(first: 1) {
          edges {
            node {
              id,
              name,
              ${LandItem.getFragment('land')},
            }
          }
        },
        projectsAdmin(first: 1) {
          edges {
            node {
              id,
              name,
              ${ProjectItem.getFragment('project')},
            }
          }
        },
      }
    `,
  },
});
*/
