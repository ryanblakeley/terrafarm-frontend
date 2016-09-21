import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';

import classNames from '../styles/ResultsItemUserStylesheet.css';

class ResultsItemUser extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
    index: React.PropTypes.number,
  };
  render () {
    const {user, index} = this.props;

    return <div className={classNames.this}>
      <span className={classNames.number} >
        {index + 1}.
      </span>
      <Link to={`/user/${user.id}`} className={classNames.name} >
        {user.name[0].toUpperCase() + user.name.slice(1)}
      </Link>
    </div>;
  }
}

export default Relay.createContainer(ResultsItemUser, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id,
        name,
      }
    `,
  },
});
