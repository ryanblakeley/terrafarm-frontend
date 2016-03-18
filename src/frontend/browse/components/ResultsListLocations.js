import React from 'react';
import Relay from 'react-relay';
import ResultsItemLocation from './ResultsItemLocation';

import classNames from '../styles/ResultsListLocationsStylesheet.css';

class ResultsListLocations extends React.Component {
  static propTypes = {
    master: React.PropTypes.object,
  };
  render () {
    const {groups} = this.props.master;

    return <div className={classNames.this} >
      {groups.edges.map((edge, index) => {
        return <ResultsItemLocation
          group={edge.node}
          index={index}
          key={index}
        />;
      })}
    </div>;
  }
}

export default Relay.createContainer(ResultsListLocations, {
  fragments: {
    master: () => Relay.QL`
      fragment on Master {
        groups(first: 18) {
          edges {
            node {
              id,
              name,
              ${ResultsItemLocation.getFragment('group')},
            }
          }
        },
      }
    `,
  },
});
