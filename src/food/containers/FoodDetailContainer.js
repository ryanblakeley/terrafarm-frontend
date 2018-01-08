/*
Food Detail Container

Food ID Element
Food Group Element
Macronutrient Calories Per Gram Element
Link To USDA Source Element
*/
import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { FoodIcon } from 'shared/components/Icons';
import Layout from 'shared/components/Layout';
import { H3, P, Span, WarningMessage } from 'shared/components/Typography';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import Menu from 'shared/components/Menu';
import classNames from '../styles/FoodDetailContainerStylesheet.css';

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

const MacronutrientCaloriesPerGramElement = props => {
  const { protein, fat, carb } = props;

  const displayProtein = protein
    && <Span> Protein <strong>{Math.round(protein * 10) / 10}</strong></Span>;
  const displayFat = fat
    && <Span> &#8226; Fat <strong>{Math.round(fat * 10) / 10}</strong></Span>;
  const displayCarb = carb
    && <Span> &#8226; Carb <strong>{Math.round(carb * 10) / 10}</strong></Span>;

  return <Layout>
    <P>Calories per gram: {displayProtein}{displayFat}{displayCarb}</P>
  </Layout>;
};

MacronutrientCaloriesPerGramElement.propTypes = {
  fat: PropTypes.string,
  protein: PropTypes.string,
  carb: PropTypes.string,
};

MacronutrientCaloriesPerGramElement.defaultProps = {
  fat: null,
  protein: null,
  carb: null,
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

  const brandLabel = <P className={classNames.brand}>Brand: <strong>{brandName}</strong></P>;

  return <TransitionWrapper>
    <Layout page >
      <Menu
        baseUrl={`/foods/${rowId}`}
        header={{ icon: <FoodIcon />, title: 'Foods' }}
        disabled
      />
      <H3 className={classNames.description}>{description}</H3>
      <P>Food #: <strong>{rowId}</strong></P>
      {foodGroup && <P className={classNames.foodGroup}>
        Food group: <strong>{foodGroup.name}</strong>
      </P>}
      <MacronutrientCaloriesPerGramElement
        protein={proteinFactor}
        fat={fatFactor}
        carb={carbFactor}
      />
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
