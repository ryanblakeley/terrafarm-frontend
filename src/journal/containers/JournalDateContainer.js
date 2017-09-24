import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import Layout from 'shared/components/Layout';
import FoodSelectionListHeader from 'food-selection/components/FoodSelectionListHeader';
import FoodSelectionListItem from 'food-selection/components/FoodSelectionListItem';

const propTypes = {
  userByRowId: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  router: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

class JournalDateContainer extends React.Component {
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
    const { userByRowId: user, date, router, match } = this.props;
    const { calories, protein, fat, carbs, completeCount, recordsCount } = this.state;
    const foodSelections = user && user.foodSelectionsByUserId.edges;
    const editPanelOpen = router.isActive(match, {
      pathname: `/user/${user.rowId}/journal/edit/`,
    });
    const journalFoodSelections = foodSelections.map(({ node }) => {
      const {
        rowId,
        foodDescription,
        unitAmount,
        unitDescription,
        foodByFoodId,
        mass,
      } = node;
      const url = `/user/${user.rowId}/journal/edit/${rowId}`;
      const editing = router.isActive(match, { pathname: url });

      return <FoodSelectionListItem
        key={rowId}
        foodName={foodDescription}
        unitAmount={mass || unitAmount}
        unitName={mass ? 'grams' : unitDescription}
        url={url}
        complete={!!(foodByFoodId && mass)}
        editing={editing}
        wide={editPanelOpen}
      />;
    });

    return <Layout center>
      <FoodSelectionListHeader
        date={date}
        calories={calories}
        protein={protein}
        fat={fat}
        carbs={carbs}
        completeCount={completeCount}
        recordsCount={recordsCount}
      />
      <Layout bottomMedium>
        {journalFoodSelections}
      </Layout>
    </Layout>;
  }
}

JournalDateContainer.propTypes = propTypes;

export default createFragmentContainer(
  JournalDateContainer,
  graphql`
    fragment JournalDateContainer_userByRowId on User {
      id,
      rowId,
      foodSelectionsByUserId(
        condition: $condition,
        first: 2147483647,
        orderBy: TIME_DESC
      ) {
        edges {
          node {
            id
            rowId
            foodDescription
            foodId
            foodByFoodId {
              rowId
              calories
              protein
              fat
              carbs
            }
            mass
            unitAmount
            unitDescription
            unitOfMeasureId
            time
            date
          }
        }
      }
    }
  `,
);
