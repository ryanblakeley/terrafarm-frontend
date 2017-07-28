import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { FoodIcon } from 'shared/components/Icons';
import Layout from 'shared/components/Layout';
import { P } from 'shared/components/Typography';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import Menu from 'shared/components/Menu';

const propTypes = {
  foodByRowId: PropTypes.object.isRequired,
};

const defaultProps = {
  foodByRowId: {
    brandName: null,
    foodGroupByFoodGroupId: {
      name: null,
    },
    proteinFactor: null,
    fatFactor: null,
    carbFactor: null,
  },
};

const FoodContainer = props => {
  const { foodByRowId } = props;
  const {
    rowId,
    longDescription,
    brandName,
    foodGroupByFoodGroupId: foodGroup,
    proteinFactor,
    fatFactor,
    carbFactor,
  } = foodByRowId;

  return <TransitionWrapper>
    <Layout page>
      <Menu
        baseUrl={`/food/${rowId}`}
        header={{ icon: <FoodIcon />, title: 'Food' }}
        disabled
      />
      <P>Long description: {longDescription}</P>
      <P>Brand name: {brandName}</P>
      <P>Food group: {foodGroup.name}</P>
      <P>Protein factor: {proteinFactor}</P>
      <P>Fat factor: {fatFactor}</P>
      <P>Carb factor: {carbFactor}</P>
    </Layout>
  </TransitionWrapper>;
};

FoodContainer.propTypes = propTypes;
FoodContainer.defaultProps = defaultProps;

export default createFragmentContainer(
  FoodContainer,
  graphql`
    fragment FoodContainer_foodByRowId on Food {
      rowId
      longDescription
      brandName
      foodGroupByFoodGroupId {
        name
      }
      proteinFactor
      fatFactor
      carbFactor
    }
  `,
);

