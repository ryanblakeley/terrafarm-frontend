import React from 'react';
import Relay from 'react-relay';
import ResultsItemUser from './ResultsItemUser';

import classNames from '../styles/ResultsListUsersStylesheet.css';

const ResultsListUsers = props => <div className={classNames.this} >
  {props.query.allUsers.edges.map((edge, index) => <ResultsItemUser
    user={edge.node}
    index={index}
    key={index}
  />)}
</div>;

ResultsListUsers.propTypes = {
  query: React.PropTypes.object,
};

export default Relay.createContainer(ResultsListUsers, {
  fragments: {
    query: () => Relay.QL`
      fragment on Query {
        allUsers(first: 10) {
          edges {
            node {
              ${ResultsItemUser.getFragment('user')},
            }
          }
        },
      }
    `,
  },
});
