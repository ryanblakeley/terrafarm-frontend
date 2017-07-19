import React from 'react';
import Layout from 'shared/components/Layout';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import {P, Link} from 'shared/components/Typography';

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
  constructor (props) {
    super(props);
    this.state = {
      completeness: null,
      calories: null,
      protein: null,
      fat: null,
      carbs: null,
    };
  }
  componentWillMount () {
    const {user} = this.props;
    const foodSelections = user && user.foodSelectionsByUserId;
    this.sumMacros(foodSelections.edges.map(f => (
      this.calculateNutrition(f.node)
    )));
  }
  /*
  componentDidMount () {
    const {relay} = this.props;
    if (foodSelections.totalCount > relay.variables.count) {
      relay.setVariables({count: foodSelections.totalCount});
    }
  }
  */
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

    this.setState({
      completeness: (completeCount / nutritions.length) * 100,
      calories,
      protein,
      fat,
      carbs,
    });
  }
  render () {
    const {user} = this.props;
    const {completeness, calories, protein, fat, carbs} = this.state;
    const foodSelections = user && user.foodSelectionsByUserId.edges;
    let date;

    const journalRowElements = foodSelections.map(f => {
      const {
        rowId: foodSelectionId,
        foodDescription: label,
        unitQuantity: number,
        unitOfMeasureByUnitOfMeasureId: unit,
      } = f.node;
      const url = `/user/${user.rowId}/food-journal/edit/${foodSelectionId}`;
      date = f.node.date; // not ideal since all dates will be identical

      return <div key={f.node.rowId}>
        <span>{label} </span>
        <span>{number} {unit && unit.fullName} </span>
        <Link to={url}>edit</Link>
      </div>;
    });

    return <TransitionWrapper>
      <Layout center>
        <P>{date} | {calories} | {protein}g | {fat}g | {carbs}g | {completeness}%</P>
        {journalRowElements}
      </Layout>
    </TransitionWrapper>;
  }
}

export default JournalDateContainer;
