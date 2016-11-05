import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';

import classNames from '../styles/ResultsItemUserStylesheet.css';

const ResultsItemUser = props => <div className={classNames.this}>
  <span className={classNames.number} >
    {props.index + 1}.
  </span>
  <Link to={`/user/${props.user.rowId}`} className={classNames.name} >
    {props.user.name[0].toUpperCase() + props.user.name.slice(1)}
  </Link>
</div>;

ResultsItemUser.propTypes = {
  index: React.PropTypes.number,
  user: React.PropTypes.object,
};

export default Relay.createContainer(ResultsItemUser, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        rowId,
        name,
      }
    `,
  },
});
