import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';

import classNames from '../styles/ResultsItemLocationStylesheet.css';

class ResultsItemLocation extends React.Component {
  static propTypes = {
    group: React.PropTypes.object,
    index: React.PropTypes.number,
  };
  render () {
    const {group, index} = this.props;

    return <div className={classNames.this}>
      <span className={classNames.number} >
        {index + 1}.
      </span>
      <Link to={`/auth/group/${group.id}`} className={classNames.name} >
        {group.name[0].toUpperCase() + group.name.slice(1)}
      </Link>
    </div>;
  }
}

export default Relay.createContainer(ResultsItemLocation, {
  fragments: {
    group: () => Relay.QL`
      fragment on Group {
        id,
        name,
      }
    `,
  },
});
