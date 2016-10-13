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
    {props.viewer.userNodes.edges.map(userEdge => (
      <div key={userEdge.node.id}>
        {userEdge.node.name}
      </div>
    ))}
    <h4>Resources</h4>
    {props.viewer.resourceNodes.edges.map(resourceEdge => (
      <div key={resourceEdge.node.id}>
        {resourceEdge.node.name}
      </div>
    ))}
    <h4>Organizations</h4>
    {props.viewer.organizationNodes.edges.map(organizationEdge => (
      <div key={organizationEdge.node.id}>
        {organizationEdge.node.name}
      </div>
    ))}
    <h4>Projects</h4>
    {props.viewer.projectNodes.edges.map(projectEdge => (
      <div key={projectEdge.node.id}>
        {projectEdge.node.name}
      </div>
    ))}
    <h4>Tasks</h4>
    {props.viewer.taskNodes.edges.map(taskEdge => (
      <div key={taskEdge.node.id}>
        {taskEdge.node.name}
      </div>
    ))}
  </div>
</TransitionWrapper>;

BrowseContainer.propTypes = {
  viewer: React.PropTypes.object,
};

export default Relay.createContainer(BrowseContainer, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        userNodes(first: 10) {
          edges {
            node {
              id,
              name,
            }
          }
        },
        resourceNodes(first: 10) {
          edges {
            node {
              id,
              name,
            }
          }
        },
        organizationNodes(first: 10) {
          edges {
            node {
              id,
              name,
            }
          }
        },
        projectNodes(first: 10) {
          edges {
            node {
              id,
              name,
            }
          }
        },
        taskNodes(first: 10) {
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
