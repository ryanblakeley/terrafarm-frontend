import React from 'react';
import Relay from 'react-relay';
import ResultsItemLand from './ResultsItemLand';

import classNames from '../styles/ResultsListLandsStylesheet.css';

class ResultsListLands extends React.Component {
  static propTypes = {
    master: React.PropTypes.object,
  };
  render () {
    const {lands} = this.props.master;

    return <div className={classNames.this} >
      {lands.edges.map((edge, index) => {
        return <ResultsItemLand
          land={edge.node}
          index={index}
          key={index}
        />;
      })}
    </div>;
  }
}

export default Relay.createContainer(ResultsListLands, {
  fragments: {
    master: () => Relay.QL`
      fragment on Master {
        lands(first: 18) {
          edges {
            node {
              id,
              name,
              ${ResultsItemLand.getFragment('land')},
            }
          }
        },
      }
    `,
  },
});
