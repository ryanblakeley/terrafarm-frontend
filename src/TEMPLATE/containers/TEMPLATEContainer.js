import React from 'react';
import classNames from '../styles/TEMPLATEContainerStylesheet.css';

class TEMPLATEContainer extends React.Component {
  static propTypes = {
    aaa: React.PropTypes.string,
  };
  componentWillMount () {
    console.log('Mounting template');
  }
  render () {
    return <div className={classNames.this}>
      <h2>TEMPLATE Container</h2>
    </div>;
  }
}

export default TEMPLATEContainer;
/*
export default createFragmentContainer(TEMPLATEContainer, {
  QUERY: graphql`
    fragment TEMPLATEContainer_QUERY on QUERY {
      edges {
        node {
          id,
          name,
        },
      },
    },
  `,
});
*/
