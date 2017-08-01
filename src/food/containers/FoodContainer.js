import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { FoodIcon } from 'shared/components/Icons';
import Layout from 'shared/components/Layout';
import { H3, H4, H5, H6 } from 'shared/components/Typography';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import Menu from 'shared/components/Menu';
import classNames from '../styles/FoodContainerStylesheet.css';

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
    description,
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
      <H3 className={classNames.description}>{description}</H3>
      <H4>#{rowId}</H4>
      {proteinFactor && <H6>Protein factor: {proteinFactor}</H6>}
      {fatFactor && <H6>Fat factor: {fatFactor}</H6>}
      {carbFactor && <H6>Carb factor: {carbFactor}</H6>}
      {brandName && <H5 className={classNames.brand}>Brand: {brandName}</H5>}
      {foodGroup && <H5 className={classNames.foodGroup}>Food group: {foodGroup.name}</H5>}
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
      description
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

