import React from 'react';
import Relay from 'react-relay';
import ResultsItemUser from './ResultsItemUser';

import classNames from '../styles/ResultsListUsersStylesheet.css';

const ResultsListUsers = props => <div className={classNames.this} >
  {props.master.users.edges.map((edge, index) => <ResultsItemUser
    user={edge.node}
    index={index}
    key={index}
  />)}
</div>;

ResultsListUsers.propTypes = {
  master: React.PropTypes.object,
};

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
