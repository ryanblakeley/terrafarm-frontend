import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import {blueGrey900} from 'material-ui/styles/colors';
import IoPerson from 'react-icons/lib/io/person';
import MdStar from 'react-icons/lib/md/star';
import RelationshipIcon from './RelationshipIcon';
import RelationshipColorDash from './RelationshipColorDash';
import classNames from '../styles/UserItemStylesheet.css';

const styles = {
  this: {
    color: blueGrey900,
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
      <RelationshipIcon primary={<IoPerson />} secondary={adminBadge ? <MdStar /> : null} />
      {colorSwatch
        ? <RelationshipColorDash color={colorSwatch} />
        : <div className={classNames.colorsPlaceholder} />
      }
      <Link to={`/user/${user.id}`} className={classNames.name} >
        {user.name[0].toUpperCase() + user.name.slice(1)}
      </Link>
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

