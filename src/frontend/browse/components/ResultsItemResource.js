import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';

import classNames from '../styles/ResultsItemResourceStylesheet.css';

class ResultsItemResource extends React.Component {
  static propTypes = {
    resource: React.PropTypes.object,
    index: React.PropTypes.number,
  };
  render () {
    const {resource, index} = this.props;

    return <div className={classNames.this}>
      <span className={classNames.number} >
        {index + 1}.
      </span>
      <Link to={`/resource/${resource.id}`} className={classNames.name} >
        {resource.name[0].toUpperCase() + resource.name.slice(1)}
      </Link>
    </div>;
  }
}

export default Relay.createContainer(ResultsItemResource, {
  fragments: {
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
      }
    `,
  },
});
