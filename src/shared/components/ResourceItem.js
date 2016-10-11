import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import Colors from 'material-ui/lib/styles/colors';
import IoCube from 'react-icons/lib/io/cube';
import RelationshipIcon from './RelationshipIcon';
import RelationshipColorDot from './RelationshipColorDot';
import classNames from '../styles/ResourceItemStylesheet.css';

const styles = {
  this: {
    color: Colors.blueGrey900,
  },
};

const ResourceItem = props => <div className={classNames.this} style={styles.this} >
  <RelationshipIcon
    primary={<IoCube />}
    secondary={props.action}
  />
  {props.colorSwatches && props.colorSwatches.length
    ? props.colorSwatches.map(color => <RelationshipColorDot key={color} color={color} />)
    : <div className={classNames.colorsPlaceholder} />
  }
  <Link to={`/resource/${props.resource.id}`} className={classNames.name} >
    {props.resource.name[0].toUpperCase() + props.resource.name.slice(1)}
  </Link>
</div>;

ResourceItem.propTypes = {
  resource: React.PropTypes.object,
  colorSwatches: React.PropTypes.array,
  action: React.PropTypes.element,
};

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
