import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import Layout from 'shared/components/Layout';
import { FlatButton } from 'shared/components/Material';
import { P } from 'shared/components/Typography';
// import classNames from '../styles/FoodMatchesForSelectionContainerStylesheet.css';

const propTypes = {
  foodMatchesForSelection: PropTypes.object.isRequired,
  handleClickFoodMatch: PropTypes.func.isRequired,
};

const FoodMatchesForSelectionContainer = props => {
  const { foodMatchesForSelection, handleClickFoodMatch } = props;

  return <Layout>
    FoodMatchesForSelectionContainer
    {foodMatchesForSelection.edges.map(({ node }) => (
      <Layout key={node.id} style={{ display: 'flex', alignItems: 'center' }}>
        <FlatButton onClick={() => { handleClickFoodMatch(node.rowId); }}>
          Select
        </FlatButton>
        <P>{node.description}</P>
      </Layout>
    ))}
  </Layout>;
};

FoodMatchesForSelectionContainer.propTypes = propTypes;

export default createFragmentContainer(
  FoodMatchesForSelectionContainer,
  graphql`
    fragment FoodMatchesForSelectionContainer_foodMatchesForSelection
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
