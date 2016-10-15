import React from 'react';
import Relay from 'react-relay';
import ResultsItemProject from './ResultsItemProject';

import classNames from '../styles/ResultsListProjectsStylesheet.css';

const ResultsListProjects = props => <div className={classNames.this} >
  {props.query.allProjects.edges.map((edge, index) => <ResultsItemProject
    project={edge.node}
    index={index}
    key={index}
  />)}
</div>;

ResultsListProjects.propTypes = {
  query: React.PropTypes.object,
};

export default Relay.createContainer(ResultsListProjects, {
  fragments: {
    query: () => Relay.QL`
      fragment on Query {
        allProjects(first: 10) {
          edges {
            node {
              ${ResultsItemProject.getFragment('project')},
            }
          }
        },
      }
    `,
  },
});
