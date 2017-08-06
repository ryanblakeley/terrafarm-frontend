import PropTypes from 'prop-types';
import React from 'react';
import Layout from 'shared/components/Layout';
import { Span } from 'shared/components/Typography';
import classNames from '../styles/SelectionNutritionValuesStylesheet.css';

const propTypes = {
  food: PropTypes.shape({
    calories: PropTypes.number,
    protein: PropTypes.number,
    fat: PropTypes.number,
    carbs: PropTypes.number,
  }),
  mass: PropTypes.number,
};

const defaultProps = {
  food: {
    calories: null,
    protein: null,
    fat: null,
    carbs: null,
  },
  mass: null,
};

class SelectionNutritionValues extends React.Component {
  calculateNutrition () {
    const { food, mass } = this.props;

    if (food && mass) {
      const factor = mass / 100;

      return {
        complete: 1,
        calories: Math.round(food.calories * factor),
        protein: Math.round(food.protein * factor),
        fat: Math.round(food.fat * factor),
        carbs: Math.round(food.carbs * factor),
      };
    }

    return { complete: 0, calories: null, protein: null, fat: null, carbs: null };
  }
  render () {
    const nutrition = this.calculateNutrition();

    if (!nutrition.complete) return null;

    return <Layout center topSmall bottomSmall className={classNames.nutrients}>
      <Layout className={`${classNames.nutrientRow}  ${classNames.cal}`}>
        <Span className={classNames.nutrientLabel}>Calories</Span>
        <Span className={classNames.nutrientValue}>{nutrition.calories}</Span>
      </Layout>
      <Layout className={classNames.nutrientRow}>
        <Span className={classNames.nutrientLabel}>Protein</Span>
        <Span className={classNames.nutrientValue}>{nutrition.protein}</Span>
      </Layout>
      <Layout className={classNames.nutrientRow}>
        <Span className={classNames.nutrientLabel}>Fat</Span>
        <Span className={classNames.nutrientValue}>{nutrition.fat}</Span>
      </Layout>
      <Layout className={classNames.nutrientRow}>
        <Span className={classNames.nutrientLabel}>Carbs</Span>
        <Span className={classNames.nutrientValue}>{nutrition.carbs}</Span>
      </Layout>
    </Layout>;
  }
}

SelectionNutritionValues.propTypes = propTypes;
SelectionNutritionValues.defaultProps = defaultProps;

export default SelectionNutritionValues;
