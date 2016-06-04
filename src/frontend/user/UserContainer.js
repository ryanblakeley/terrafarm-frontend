import React from 'react';
import Relay from 'react-relay';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import IconButton from 'material-ui/lib/icon-button';
import IoPerson from 'react-icons/lib/io/person';
import ResourceItem from '../shared/components/ResourceItem';
import LandItem from '../shared/components/LandItem';
import ProjectItem from '../shared/components/ProjectItem';
import TaskItem from '../shared/components/TaskItem';
import HeroImage from '../shared/components/HeroImage';

// import createColorChart from '../shared/themes/create-color-chart';
import transitionNames from '../shared/styles/transitions.css';
import classNames from './styles/UserContainerStylesheet.css';

class UserContainer extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
  };
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

    return <CSSTransitionGroup
      transitionName={transitionNames}
      transitionAppear
      transitionAppearTimeout={350}
      transitionEnterTimeout={350}
      transitionLeave={false}
    >
      <div className={classNames.this} >
        <div className={classNames.actionsHeading}>
          <IconButton disabled />
          <IconButton disabled />
          <div className={classNames.centerIconWrapper} >
            <IoPerson className={classNames.centerIcon} />
          </div>
          <IconButton disabled />
          <IconButton disabled />
        </div>

        <h3 className={classNames.contentHeading}>{user.name}</h3>
        <h4 className={classNames.contentSubheading}>
          <span className={classNames.location}>{user.location}</span>
        </h4>
        <HeroImage image={user.image} />

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

          <p className={classNames.description}>{user.description}</p>
        </div>
      </div>
    </CSSTransitionGroup>;
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
