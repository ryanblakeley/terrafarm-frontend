import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import Colors from 'material-ui/lib/styles/colors';
import IoIosLocation from 'react-icons/lib/io/ios-location';
import MdStar from 'react-icons/lib/md/star';
import RelationshipIcon from './RelationshipIcon';
import RelationshipColorDash from './RelationshipColorDash';
import classNames from '../styles/LandItemStylesheet.css';

const styles = {
  this: {
    color: Colors.blueGrey900,
  },
};


class LandItem extends React.Component {
  static propTypes = {
    land: React.PropTypes.object,
    colorSwatch: React.PropTypes.string,
    adminBadge: React.PropTypes.bool,
    action: React.PropTypes.element,
  };
  static defaultProps = {
    adminBadge: false,
  };
  render () {
    const {land, colorSwatch, adminBadge, action} = this.props;
    const secondaryIcon = action || (adminBadge
      ? <MdStar />
      : null);

    return <div className={classNames.this} style={styles.this} >
      <RelationshipIcon
        primary={<IoIosLocation />}
        secondary={secondaryIcon}
      />
      {colorSwatch
        ? <RelationshipColorDash color={colorSwatch} />
        : <div className={classNames.colorsPlaceholder} />
      }
      <Link to={`/land/${land.id}`} className={classNames.name} >
        {land.name[0].toUpperCase() + land.name.slice(1)}
      </Link>
    </div>;
  }
}

export default Relay.createContainer(LandItem, {
  fragments: {
    land: () => Relay.QL`
      fragment on Land {
        id,
        name,
      }
    `,
  },
});
