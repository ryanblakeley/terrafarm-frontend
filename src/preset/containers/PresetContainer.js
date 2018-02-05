import PropTypes from 'prop-types';
import React from 'react';
import Layout from 'shared/components/Layout';
import { RaisedButton } from 'shared/components/Material';
import FoodSelectionListHeader from 'food-selection/components/FoodSelectionListHeader';
import FoodSelectionListItem from 'food-selection/components/FoodSelectionListItem';
// import classNames from 'preset/styles/PresetContainerStylesheet.css';

const propTypes = {
  // currentPerson: PropTypes.object.isRequired,
  preset: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
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
  handleOpen = () => {
    const { preset, router } = this.props;
    router.push(`/presets/edit/${preset.rowId}`);
  }
  render () {
    const { preset, router } = this.props;
    const {
      calories,
      protein,
      fat,
      carbs,
      completeCount,
      recordsCount,
    } = this.state;
    const presetSelections = preset && preset.presetSelectionsByPresetId;
    const foodSelections = presetSelections
      && presetSelections.edges.map(({ node }) => (
        node.foodSelectionBySelectionId
      ));
    const foodSelectionsList = foodSelections.map(s => {
      const {
        rowId,
        foodDescription,
        measureWeightAmount,
        measureWeightUnit,
        measureVolumeAmount,
        measureVolumeUnit,
        measureCommonAmount,
        measureCommonUnit,
        foodId,
        mass,
      } = s;
      const url = ''; // `/user/${preset.userId}/journal/edit/${rowId}`;
      const nutrition = this.calculateNutrition(s);

      return <FoodSelectionListItem
        key={rowId}
        mass={mass}
        foodName={foodDescription}
        measureWeightAmount={measureWeightAmount}
        measureWeightUnit={measureWeightUnit}
        measureVolumeAmount={measureVolumeAmount}
        measureVolumeUnit={measureVolumeUnit}
        measureCommonAmount={measureCommonAmount}
        measureCommonUnit={measureCommonUnit}
        url={url}
        complete={!!(foodId && mass)}
        nutrition={nutrition}
        router={router}
      />;
    });

    return <Layout center >
      <FoodSelectionListHeader
        listTitle={<RaisedButton
          label={preset.name || '(no name)'}
          onTouchTap={this.handleOpen}
          secondary={!preset.active}
        />}
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
