import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import Colors from 'material-ui/lib/styles/colors';
import FaTag from 'react-icons/lib/fa/tag';
import RelationshipIcon from './RelationshipIcon';
import RelationshipColorDot from './RelationshipColorDot';

import classNames from '../styles/ResourceItemStylesheet.css';
const styles = {
  this: {
    color: Colors.blueGrey900,
  },
};

class ResourceItem extends React.Component {
  static propTypes = {
    resource: React.PropTypes.object,
    colorSwatches: React.PropTypes.array,
    action: React.PropTypes.element,
  };
  render () {
    const {resource, colorSwatches, action} = this.props;

    return <div className={classNames.this} style={styles.this} >
      <RelationshipIcon
        primary={<FaTag />}
        secondary={action}
      />
      {colorSwatches && colorSwatches.length
        ? colorSwatches.map(color => <RelationshipColorDot key={color} color={color} />)
        : <div className={classNames.colorsPlaceholder} />
      }
      <Link to={`/auth/resource/${resource.id}`} className={classNames.name} >
        {resource.name[0].toUpperCase() + resource.name.slice(1)}
      </Link>
    </div>;
  }
}

export default Relay.createContainer(ResourceItem, {
  fragments: {
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
      }
    `,
  },
});
