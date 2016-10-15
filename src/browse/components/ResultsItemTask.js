import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';

import classNames from '../styles/ResultsItemTaskStylesheet.css';

const ResultsItemTask = props => <div className={classNames.this}>
  <span className={classNames.number} >
    {props.index + 1}.
  </span>
  <Link to={`/task/${props.task.id}`} className={classNames.name} >
    {props.task.name[0].toUpperCase() + props.task.name.slice(1)}
  </Link>
</div>;

ResultsItemTask.propTypes = {
  index: React.PropTypes.number,
  task: React.PropTypes.object,
};

export default Relay.createContainer(ResultsItemTask, {
  fragments: {
    task: () => Relay.QL`
      fragment on Task {
        id,
        name,
      }
    `,
  },
});
