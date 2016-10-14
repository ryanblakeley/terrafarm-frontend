import React from 'react';
import Relay from 'react-relay';
import TransitionWrapper from '../shared/components/TransitionWrapper';
// import BrowsePanel from './components/BrowsePanel';
// import BrowseResults from './components/BrowseResults';

import classNames from './styles/BrowseContainerStylesheet.css';

const BrowseContainer = props => <TransitionWrapper>
  <div className={classNames.this} >
    {/*
    <BrowsePanel />
    <BrowseResults master={props.master} />
    */}
    <h4>Users</h4>
    {props.query.allUsers.edges.map(userEdge => (
      <div key={userEdge.node.id}>
        {userEdge.node.name}
      </div>
    ))}
    <h4>Resources</h4>
    {props.query.allResources.edges.map(resourceEdge => (
      <div key={resourceEdge.node.id}>
        {resourceEdge.node.name}
      </div>
    ))}
    <h4>Organizations</h4>
    {props.query.allOrganizations.edges.map(organizationEdge => (
      <div key={organizationEdge.node.id}>
        {organizationEdge.node.name}
      </div>
    ))}
    <h4>Projects</h4>
    {props.query.allProjects.edges.map(projectEdge => (
      <div key={projectEdge.node.id}>
        {projectEdge.node.name}
      </div>
    ))}
    <h4>Tasks</h4>
    {props.query.allTasks.edges.map(taskEdge => (
      <div key={taskEdge.node.id}>
        {taskEdge.node.name}
      </div>
    ))}
  </div>
</TransitionWrapper>;

BrowseContainer.propTypes = {
  query: React.PropTypes.object,
};

export default Relay.createContainer(BrowseContainer, {
  fragments: {
    query: () => Relay.QL`
      fragment on Query {
        allUsers(first: 10) {
          edges {
            node {
              id,
              name,
            }
          }
        },
        allResources(first: 10) {
          edges {
            node {
              id,
              name,
            }
          }
        },
        allOrganizations(first: 10) {
          edges {
            node {
              id,
              name,
            }
          }
        },
        allProjects(first: 10) {
          edges {
            node {
              id,
              name,
            }
          }
        },
        allTasks(first: 10) {
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
