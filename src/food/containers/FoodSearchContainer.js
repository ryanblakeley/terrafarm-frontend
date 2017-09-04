import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { FoodIcon } from 'shared/components/Icons';
import Layout from 'shared/components/Layout';
import { H3, P } from 'shared/components/Typography';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import Menu from 'shared/components/Menu';

const propTypes = {
  searchFoods: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

class FoodSearchContainer extends React.Component {
  componentWillMount () {
    const { router, location } = this.props;
    const { pathname, query } = location;
    const description = query && query.description;

    if (!description) {
      router.replace({
        pathname,
        query: Object.assign(query, {
          description: '',
        }),
      });
    }
  }
  render () {
    const { searchFoods } = this.props;
    const results = searchFoods && searchFoods.edges.map(({ node }) => (
      <P key={node.rowId} >{node.rowId}, {node.description}</P>
    ));


    return <TransitionWrapper>
      <Layout page >
        <Menu
          baseUrl={'/food/search'}
          header={{ icon: <FoodIcon />, title: 'Food' }}
          disabled
        />
        <H3>Search</H3>
        {results}
      </Layout>
    </TransitionWrapper>;
  }
}

FoodSearchContainer.propTypes = propTypes;

export default createFragmentContainer(
  FoodSearchContainer,
  graphql`
    fragment FoodSearchContainer_searchFoods on FoodsConnection {
      edges {
        node {
          rowId
          description
        }
      }
    }
  `,
);
