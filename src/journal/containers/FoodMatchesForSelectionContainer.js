import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import Layout from 'shared/components/Layout';
// import classNames from '../styles/FoodMatchesForSelectionContainerStylesheet.css';

const propTypes = {
  foodMatchesForSelection: PropTypes.object.isRequired,
};

const FoodMatchesForSelectionContainer = props => (
  <Layout topSmall>
    FoodMatchesForSelectionContainer
    {props.foodMatchesForSelection.edges.map(({ node }) => (
      <Layout key={node.id}>
        {node.description}
      </Layout>
    ))}
  </Layout>
);

FoodMatchesForSelectionContainer.propTypes = propTypes;

export default createFragmentContainer(
  FoodMatchesForSelectionContainer,
  graphql`
    fragment FoodMatchesForSelectionContainer_foodMatchesForSelection
      on FoodMatchesForSelectionConnection {
      edges {
        node {
          id
          description
        }
      }
    }
  `,
);
