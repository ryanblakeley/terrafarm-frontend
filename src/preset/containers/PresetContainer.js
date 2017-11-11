import PropTypes from 'prop-types';
import React from 'react';
import Layout from 'shared/components/Layout';
import FoodSelectionListHeader from 'food-selection/components/FoodSelectionListHeader';
import FoodSelectionListItem from 'food-selection/components/FoodSelectionListItem';

const propTypes = {
  preset: PropTypes.object.isRequired,
};

class PresetContainer extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      calories: null,
      protein: null,
      fat: null,
      carbs: null,
      completeCount: null,
    };
  }
  componentWillMount () {
    const { preset } = this.props;
    const presetSelections = preset && preset.presetSelectionsByPresetId;
    const foodSelections = presetSelections
      && presetSelections.edges.map(({ node }) => (
        node.foodSelectionBySelectionId
      ));

    // console.log('food selections:', foodSelections);

    if (foodSelections) {
      this.sumMacros(foodSelections.map(s => (
        this.calculateNutrition(s)
      )));
    }
  }
  componentWillReceiveProps (nextProps) {
    const { preset } = nextProps;
    const presetSelections = preset && preset.presetSelectionsByPresetId;
    const foodSelections = presetSelections
      && presetSelections.edges.map(({ node }) => (
        node.foodSelectionBySelectionId
      ));

    // TODO: smarter condition for recalculating macros
    // console.log('food selections:', foodSelections);

    if (foodSelections) {
      this.sumMacros(foodSelections.map(s => (
        this.calculateNutrition(s)
      )));
    }
  }
  calculateNutrition = foodSelection => {
    const { foodByFoodId: food, mass } = foodSelection;

    // console.log('calc nutrition:', foodSelection);

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
  sumMacros = nutritions => {
    let calories = 0;
    let protein = 0;
    let fat = 0;
    let carbs = 0;
    let completeCount = 0;

    nutritions.forEach(n => {
      calories += n.calories;
      protein += n.protein;
      fat += n.fat;
      carbs += n.carbs;
      completeCount += n.complete;
    });

    this.setState({
      calories,
      protein,
      fat,
      carbs,
      completeCount,
      recordsCount: nutritions.length,
    });
  }
  render () {
    const { preset } = this.props;
    const { calories, protein, fat, carbs, completeCount, recordsCount } = this.state;
    const presetSelections = preset && preset.presetSelectionsByPresetId;
    const foodSelections = presetSelections
      && presetSelections.edges.map(({ node }) => (
        node.foodSelectionBySelectionId
      ));
    const foodSelectionsList = foodSelections.map(s => {
      const {
        rowId,
        foodDescription,
        unitAmount,
        unitDescription,
        foodId,
        mass,
      } = s;
      const url = ''; // `/user/${preset.userId}/journal/edit/${rowId}`;

      return <FoodSelectionListItem
        key={rowId}
        mass={mass}
        foodName={foodDescription}
        unitAmount={unitAmount}
        unitDescription={unitDescription}
        url={url}
        complete={!!(foodId && mass)}
      />;
    });

    return <Layout center >
      <FoodSelectionListHeader
        listTitle={preset.name}
        calories={calories}
        protein={protein}
        fat={fat}
        carbs={carbs}
        completeCount={completeCount}
        recordsCount={recordsCount}
      />
      <Layout bottomMedium >
        {foodSelectionsList}
      </Layout>
    </Layout>;
  }
}

PresetContainer.propTypes = propTypes;

export default PresetContainer;
