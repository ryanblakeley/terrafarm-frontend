import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import Layout from 'shared/components/Layout';
import { P, Link } from 'shared/components/Typography';

// TODO:
// - import JournalDateHeader from 'user/components/JournalDateHeader';
// - import JournalItem from 'user/components/JournalItem';

const propTypes = {
  userByRowId: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  // relay: PropTypes.object.isRequired,
};

class UserJournalDateContainer extends React.Component {
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
    const { userByRowId: user } = this.props;
    const foodSelections = user && user.foodSelectionsByUserId;

    if (foodSelections) {
      this.sumMacros(foodSelections.edges.map(({ node }) => (
        this.calculateNutrition(node)
      )));
    }
  }
  componentWillReceiveProps (nextProps) {
    const { userByRowId: user } = nextProps;
    const foodSelections = user && user.foodSelectionsByUserId;

    // TODO: smarter condition for recalculating macros

    if (foodSelections) {
      this.sumMacros(foodSelections.edges.map(({ node }) => (
        this.calculateNutrition(node)
      )));
    }
  }
  calculateNutrition = foodSelection => {
    const { foodByFoodId: food, mass } = foodSelection;

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
    const { userByRowId: user, date } = this.props;
    const { completeness, calories, protein, fat, carbs } = this.state;
    const foodSelections = user && user.foodSelectionsByUserId.edges;

    const journalRowElements = foodSelections.map(({ node }) => {
      const {
        rowId: foodSelectionId,
        foodDescription: label,
        unitQuantity: number,
        unitOfMeasureByUnitOfMeasureId: unit,
      } = node;
      const url = `/user/${user.rowId}/food-journal/edit/${foodSelectionId}`;

      return <div key={foodSelectionId}>
        <span>{label}, </span>
        <span>{number}, {unit && unit.fullName}, </span>
        <Link to={url}><b>edit</b></Link>
      </div>;
    });

    return <Layout center>
      <P>{date} | {calories} | {protein}g | {fat}g | {carbs}g | {completeness}%</P>
      {journalRowElements}
    </Layout>;
  }
}

UserJournalDateContainer.propTypes = propTypes;

export default createFragmentContainer(
  UserJournalDateContainer,
  graphql`
    fragment UserJournalDateContainer_userByRowId on User {
      rowId,
      foodSelectionsByUserId(
        condition: $condition,
        first: 2147483647,
        orderBy: TIME_DESC
      ) {
        edges {
          node {
            rowId,
            foodDescription,
            foodId,
            foodByFoodId {
              rowId,
              calories,
              protein,
              fat,
              carbs,
            },
            foodIdSource,
            mass,
            massSource,
            unitQuantity,
            unitOfMeasureByUnitOfMeasureId {
              fullName,
            },
            date,

          },
        },
      },
    }
  `,
);
