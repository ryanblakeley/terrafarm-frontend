import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import Layout from 'shared/components/Layout';
import { FlatButton } from 'shared/components/Material';
import { H4, Span } from 'shared/components/Typography';
import classNames from '../styles/SelectionPossibleFoodsStylesheet.css';

const propTypes = {
  foodMatchesForSelection: PropTypes.object.isRequired,
  handleClickFoodMatch: PropTypes.func.isRequired,
};

const SelectionPossibleFoods = props => {
  const { foodMatchesForSelection, handleClickFoodMatch } = props;

  if (!foodMatchesForSelection.edges.length) return null;

  return <Layout>
    <Layout center >
      <H4 className={classNames.contentSubheading} >Possible foods</H4>
    </Layout>
    {foodMatchesForSelection.edges.map(({ node }) => (
      <Layout key={node.id} style={{ display: 'flex', alignItems: 'center' }}>
        <FlatButton onClick={() => { handleClickFoodMatch(node.rowId); }}>
          {String(node.rowId)}
        </FlatButton>
        <Span>{node.description}</Span>
      </Layout>
    ))}
  </Layout>;
};

SelectionPossibleFoods.propTypes = propTypes;

export default createFragmentContainer(
  SelectionPossibleFoods,
  graphql`
    fragment SelectionPossibleFoods_foodMatchesForSelection
      on FoodMatchesForSelectionConnection {
      edges {
        node {
          id
          rowId
          description
        }
      }
    }
  `,
);
