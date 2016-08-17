import React from 'react';
import Relay from 'react-relay';
import ResultsItemUser from './ResultsItemUser';

import classNames from '../styles/ResultsListUsersStylesheet.css';

class ResultsListUsers extends React.Component {
  static propTypes = {
    master: React.PropTypes.object,
  };
  render () {
    const {users} = this.props.master;

    return <div className={classNames.this} >
      {users.edges.map((edge, index) => {
        return <ResultsItemUser
          user={edge.node}
          index={index}
          key={index}
        />;
      })}
    </div>;
  }
}

export default Relay.createContainer(ResultsListUsers, {
  fragments: {
    master: () => Relay.QL`
      fragment on Master {
        users(first: 2) {
          edges {
            node {
              id,
              name,
              ${ResultsItemUser.getFragment('user')},
            }
          }
        },
      }
    `,
  },
});
