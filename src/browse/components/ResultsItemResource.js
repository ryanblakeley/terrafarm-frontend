import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';

import classNames from '../styles/ResultsItemResourceStylesheet.css';

const ResultsItemResource = props => <div className={classNames.this}>
  <span className={classNames.number} >
    {props.index + 1}.
  </span>
  <Link to={`/resource/${props.resource.rowId}`} className={classNames.name} >
    {props.resource.name[0].toUpperCase() + props.resource.name.slice(1)}
  </Link>
</div>;

ResultsItemResource.propTypes = {
  resource: React.PropTypes.object,
  index: React.PropTypes.number,
};

export default Relay.createContainer(ResultsItemResource, {
  fragments: {
    resource: () => Relay.QL`
      fragment on Resource {
        rowId,
        name,
      }
    `,
  },
});
