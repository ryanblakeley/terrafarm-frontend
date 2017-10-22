import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { FoodIcon } from 'shared/components/Icons';
import Layout from 'shared/components/Layout';
import { H3, P, WarningMessage } from 'shared/components/Typography';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import Menu from 'shared/components/Menu';
import classNames from '../styles/FoodDetailContainerStylesheet.css';

/*
TODO

use <dl> and <dd> instead of <P>label <strong>value</strong></P>
*/

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

const FoodDetailContainer = props => {
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

  const proteinFactorLabel = <P className={classNames.macroFactor}>
    Protein Factor: <strong>{proteinFactor}</strong>
  </P>;
  const fatFactorLabel = <P className={classNames.macroFactor}>
    Fat Factor: <strong>{fatFactor}</strong>
  </P>;
  const carbFactorLabel = <P className={classNames.macroFactor}>
    Carb Factor: <strong>{carbFactor}</strong>
  </P>;
  const brandLabel = <P className={classNames.brand}>Brand: <strong>{brandName}</strong></P>;

  return <TransitionWrapper>
    <Layout page >
      <Menu
        baseUrl={`/foods/${rowId}`}
        header={{ icon: <FoodIcon />, title: 'Foods' }}
        disabled
      />
      <H3 className={classNames.description}>{description}</H3>
      <P>Food ID: <strong>{rowId}</strong></P>
      {foodGroup && <P className={classNames.foodGroup}>
        Food Group: <strong>{foodGroup.name}</strong>
      </P>}
      {proteinFactor && proteinFactorLabel}
      {fatFactor && fatFactorLabel}
      {carbFactor && carbFactorLabel}
      {brandName && brandLabel}
      <P><WarningMessage>More details coming soon</WarningMessage></P>
    </Layout>
  </TransitionWrapper>;
};

FoodDetailContainer.propTypes = propTypes;
FoodDetailContainer.defaultProps = defaultProps;

export default createFragmentContainer(
  FoodDetailContainer,
  graphql`
    fragment FoodDetailContainer_foodByRowId on Food {
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
