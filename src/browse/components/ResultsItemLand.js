import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';

import classNames from '../styles/ResultsItemLandStylesheet.css';

const ResultsItemLand = props => <div className={classNames.this}>
  <span className={classNames.number} >
    {props.index + 1}.
  </span>
  <Link to={`/land/${props.land.id}`} className={classNames.name} >
    {props.land.name[0].toUpperCase() + props.land.name.slice(1)}
  </Link>
</div>;

ResultsItemLand.propTypes = {
  land: React.PropTypes.object,
  index: React.PropTypes.number,
};

export default Relay.createContainer(ResultsItemLand, {
  fragments: {
    land: () => Relay.QL`
      fragment on Land {
        id,
        name,
      }
    `,
  },
});
