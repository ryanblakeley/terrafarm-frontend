import React from 'react';
import Relay from 'react-relay';
import ResultsItemLand from './ResultsItemLand';

import classNames from '../styles/ResultsListLandsStylesheet.css';

const ResultsListLands = props => <div className={classNames.this} >
  {props.master.lands.edges.map((edge, index) => <ResultsItemLand
    land={edge.node}
    index={index}
    key={index}
  />)}
</div>;

ResultsListLands.propTypes = {
  master: React.PropTypes.object,
};

export default Relay.createContainer(ResultsListLands, {
  fragments: {
    master: () => Relay.QL`
      fragment on Master {
        lands(first: 2) {
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
