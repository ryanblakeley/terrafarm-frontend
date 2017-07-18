import React from 'react';
import Layout from 'shared/components/Layout';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import {Link} from 'shared/components/Typography';

// TODO:
// - when foodSelections change (count, food_id, or mass) update nutritions
// - import JournalDateHeader from 'user/components/JournalDateHeader';
// - import JournalRowRootContainer from 'user/containers/JournalRowRootContainer';

class JournalDateContainer extends React.Component {
  static propTypes = {
    user: React.PropTypes.shape({
      rowId: React.PropTypes.string,
      foodSelectionsByUserId: React.PropTypes.object,
    }),
    relay: React.PropTypes.object,
  };
  static contextTypes = {
    setNutritionForDate: React.PropTypes.func,
  };
  componentDidMount () {
    const {user, relay} = this.props;
    const {setNutritionForDate} = this.context;
    const foodSelections = user && user.foodSelectionsByUserId;
    const sumMacros = this.sumMacros(foodSelections.edges.map(f => (
      this.calculateNutrition(f.node)
    )));

    if (foodSelections.totalCount > relay.variables.count) {
      relay.setVariables({count: foodSelections.totalCount});
    }

    setNutritionForDate(sumMacros);
  }
  calculateNutrition = foodSelection => {
    const {foodByFoodId: food, mass} = foodSelection;

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

    return {complete: 0, calories: null, protein: null, fat: null, carbs: null};
  }
  sumMacros = nutritions => {
    let completeCount = 0;
    let calories = 0;
    let protein = 0;
    let fat = 0;
    let carbs = 0;

    nutritions.forEach(n => {
      completeCount += n.complete;
      calories += n.calories;
      protein += n.protein;
      fat += n.fat;
      carbs += n.carbs;
    });

    return {
      completeness: (completeCount / nutritions.length) * 100,
      calories,
      protein,
      fat,
      carbs,
    };
  }
  render () {
    const {user} = this.props;
    const foodSelections = user && user.foodSelectionsByUserId.edges;
    const journalRowElements = foodSelections.map(f => {
      const {
        rowId: foodSelectionId,
        foodDescription: label,
        unitQuantity: number,
        unitOfMeasureByUnitOfMeasureId: unit,
      } = f.node;
      const url = `/user/${user.rowId}/journal/${foodSelectionId}`;

      return <div key={f.node.rowId}>
        <span>{label} </span>
        <span>{number} {unit && unit.fullName} </span>
        <Link to={url}>edit</Link>
      </div>;
    });

    return <TransitionWrapper>
      <Layout center>
        {journalRowElements}
      </Layout>
    </TransitionWrapper>;
  }
}

export default JournalDateContainer;
