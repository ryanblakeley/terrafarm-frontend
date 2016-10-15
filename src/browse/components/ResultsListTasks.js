import React from 'react';
import Relay from 'react-relay';
import ResultsItemTask from './ResultsItemTask';

import classNames from '../styles/ResultsListTasksStylesheet.css';

const ResultsListTasks = props => <div className={classNames.this} >
  {props.query.allTasks.edges.map((edge, index) => <ResultsItemTask
    task={edge.node}
    index={index}
    key={index}
  />)}
</div>;

ResultsListTasks.propTypes = {
  query: React.PropTypes.object,
};

export default Relay.createContainer(ResultsListTasks, {
  fragments: {
    query: () => Relay.QL`
      fragment on Query {
        allTasks(first: 10) {
          edges {
            node {
              ${ResultsItemTask.getFragment('task')},
            }
          }
        },
      }
    `,
  },
});
