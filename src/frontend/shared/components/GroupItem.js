import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import Colors from 'material-ui/lib/styles/colors';
import FaGroup from 'react-icons/lib/fa/group';
import MdStar from 'react-icons/lib/md/star';
import RelationshipIcon from './RelationshipIcon';
import RelationshipColorDash from './RelationshipColorDash';

import classNames from '../styles/GroupItemStylesheet.css';
const styles = {
  this: {
    color: Colors.blueGrey900,
  },
};


class GroupItem extends React.Component {
  static propTypes = {
    group: React.PropTypes.object,
    colorSwatch: React.PropTypes.string,
    adminBadge: React.PropTypes.bool,
    action: React.PropTypes.element,
  };
  static defaultProps = {
    adminBadge: false,
  };
  render () {
    const {group, colorSwatch, adminBadge, action} = this.props;
    const secondaryIcon = action || (adminBadge
      ? <MdStar />
      : null);

    return <div className={classNames.this} style={styles.this} >
      <RelationshipIcon
        primary={<FaGroup />}
        secondary={secondaryIcon}
      />
      <Link to={`/auth/group/${group.id}`} className={classNames.name} >
        {group.name[0].toUpperCase() + group.name.slice(1)}
      </Link>
      {colorSwatch
        && <RelationshipColorDash color={colorSwatch} />
      }
    </div>;
  }
}

export default Relay.createContainer(GroupItem, {
  fragments: {
    group: () => Relay.QL`
      fragment on Group {
        id,
        name,
      }
    `,
  },
});
