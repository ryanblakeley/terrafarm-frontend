import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';

import classNames from '../styles/ResultsItemLandStylesheet.css';

class ResultsItemLand extends React.Component {
  static propTypes = {
    land: React.PropTypes.object,
    index: React.PropTypes.number,
  };
  render () {
    const {land, index} = this.props;

    return <div className={classNames.this}>
      <span className={classNames.number} >
        {index + 1}.
      </span>
      <Link to={`/land/${land.id}`} className={classNames.name} >
        {land.name[0].toUpperCase() + land.name.slice(1)}
      </Link>
    </div>;
  }
}

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
