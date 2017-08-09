import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import Layout from 'shared/components/Layout';
import { FlatButton, RaisedButton } from 'shared/components/Material';
import { H4, Span } from 'shared/components/Typography';
import classNames from '../styles/SelectionPossibleFoodsStylesheet.css';

const propTypes = {
  foodMatchesForSelection: PropTypes.object.isRequired,
  handleClickFoodMatch: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

class SelectionPossibleFoods extends React.Component {
  componentWillMount () {
    const { router, location } = this.props;
    const { pathname, query } = location;
    const possibleFoodsCount = query && query.possibleFoodsCount;

    if (!possibleFoodsCount) {
      router.replace({
        pathname,
        query: Object.assign(query, {
          possibleFoodsCount: 4,
        }),
      });
    }
  }
  incrementPossibleFoodsCount () {
    const { router, location, foodMatchesForSelection: possibleFoods } = this.props;
    const { pathname, query } = location;
    const possibleFoodsCount = query && query.possibleFoodsCount;
    const hasMore = possibleFoods.totalCount > possibleFoods.edges.length;

    if (!hasMore) return;

    const newQuery = possibleFoodsCount && Object.assign(query, {
      possibleFoodsCount: Number(possibleFoodsCount) + 4,
    });

    router.replace({
      pathname,
      query: newQuery,
    });
  }
  handleClickLoadMore = () => {
    this.incrementPossibleFoodsCount();
  }
  render () {
    const {
      foodMatchesForSelection: possibleFoods,
      handleClickFoodMatch,
    } = this.props;

    if (!possibleFoods.edges.length) return null;

    const hasMore = possibleFoods.totalCount > possibleFoods.edges.length;

    console.log(possibleFoods.totalCount, possibleFoods.edges.length, hasMore);

    return <Layout>
      <Layout center >
        <H4 className={classNames.contentSubheading} >Possible foods</H4>
      </Layout>
      {possibleFoods.edges.map(({ node }) => (
        <Layout key={node.id} style={{ display: 'flex', alignItems: 'center' }} >
          <FlatButton
            label={node.rowId}
            onClick={() => { handleClickFoodMatch(node.rowId); }}
          />
          <Span>{node.description}</Span>
        </Layout>
      ))}
      { hasMore && <Layout center >
        <RaisedButton
          label={'Load more'}
          onClick={() => this.handleClickLoadMore()}
        />
      </Layout>}
    </Layout>;
  }
}

SelectionPossibleFoods.propTypes = propTypes;

export default createFragmentContainer(
  SelectionPossibleFoods,
  graphql`
    fragment SelectionPossibleFoods_foodMatchesForSelection on FoodMatchesForSelectionConnection {
      edges {
        node {
          id
          rowId
          description
        }
      }
      totalCount
    }
  `,
);
