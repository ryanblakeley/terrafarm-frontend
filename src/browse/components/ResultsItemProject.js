import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';

import classNames from '../styles/ResultsItemProjectStylesheet.css';

const ResultsItemProject = props => <div className={classNames.this}>
  <span className={classNames.number} >
    {props.index + 1}.
  </span>
  <Link to={`/project/${props.project.id}`} className={classNames.name} >
    {props.project.name[0].toUpperCase() + props.project.name.slice(1)}
  </Link>
</div>;

ResultsItemProject.propTypes = {
  index: React.PropTypes.number,
  project: React.PropTypes.object,
};

export default Relay.createContainer(ResultsItemProject, {
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        id,
        name,
      }
    `,
  },
});
