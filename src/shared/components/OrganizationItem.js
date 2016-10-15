import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import {blueGrey900} from 'material-ui/styles/colors';
import IoIosLocation from 'react-icons/lib/io/ios-location';
import MdStar from 'react-icons/lib/md/star';
import RelationshipIcon from './RelationshipIcon';
import RelationshipColorDash from './RelationshipColorDash';
import classNames from '../styles/OrganizationItemStylesheet.css';

const styles = {
  this: {
    color: blueGrey900,
  },
};


class OrganizationItem extends React.Component {
  static propTypes = {
    organization: React.PropTypes.object,
    colorSwatch: React.PropTypes.string,
    adminBadge: React.PropTypes.bool,
    action: React.PropTypes.element,
  };
  static defaultProps = {
    adminBadge: false,
  };
  render () {
    const {organization, colorSwatch, adminBadge, action} = this.props;
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
      <Link to={`/organization/${organization.id}`} className={classNames.name} >
        {organization.name[0].toUpperCase() + organization.name.slice(1)}
      </Link>
    </div>;
  }
}

export default Relay.createContainer(OrganizationItem, {
  fragments: {
    organization: () => Relay.QL`
      fragment on Organization {
        id,
        name,
      }
    `,
  },
});
