import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import Colors from 'material-ui/lib/styles/colors';
import FaUser from 'react-icons/lib/fa/user';
import MdStar from 'react-icons/lib/md/star';
import RelationshipIcon from './RelationshipIcon';
import RelationshipColorDash from './RelationshipColorDash';

import classNames from '../styles/UserItemStylesheet.css';
const styles = {
  this: {
    color: Colors.blueGrey900,
  },
};

class UserItem extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
    colorSwatch: React.PropTypes.string,
    adminBadge: React.PropTypes.bool,
  };
  static defaultProps = {
    adminBadge: false,
  };
  render () {
    const {user, colorSwatch, adminBadge} = this.props;

    return <div className={classNames.this} style={styles.this} >
      <RelationshipIcon primary={<FaUser />} secondary={adminBadge ? <MdStar /> : null} />
      <Link to={`/auth/user/${user.id}`} className={classNames.name} >
        {user.name}
      </Link>
      {colorSwatch
        && <RelationshipColorDash color={colorSwatch} />
      }
    </div>;
  }
}

export default Relay.createContainer(UserItem, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id,
        name,
      }
    `,
  },
});

