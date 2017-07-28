import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import Layout from 'shared/components/Layout';
import JournalDateHeader from '../components/JournalDateHeader';
import JournalFoodSelection from '../components/JournalFoodSelection';

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

    const completeness = nutritions.length > 0 ? completeCount / nutritions.length : 0;

    this.setState({
      completeness: completeness * 100,
      calories,
      protein,
      fat,
      carbs,
    });
  }
  render () {
    const { userByRowId: user, date, router, match } = this.props;
    const { completeness, calories, protein, fat, carbs } = this.state;
    const foodSelections = user && user.foodSelectionsByUserId.edges;
    const editPanelOpen = router.isActive(match, {
      pathname: `/journal/${user.rowId}/edit/`,
    });
    const journalFoodSelections = foodSelections.map(({ node }) => {
      const {
        rowId,
        foodDescription,
        unitQuantity,
        unitDescription,
        foodByFoodId,
        mass,
      } = node;
      const url = `/journal/${user.rowId}/edit/${rowId}`;
      const editing = router.isActive(match, { pathname: url });

      return <JournalFoodSelection
        key={rowId}
        foodName={foodDescription}
        unitQuantity={unitQuantity}
        unitName={unitDescription}
        url={url}
        complete={!!(foodByFoodId && mass)}
        editing={editing}
        wide={editPanelOpen}
      />;
    });

    return <Layout center>
      <JournalDateHeader
        date={date}
        calories={calories}
        protein={protein}
        fat={fat}
        carbs={carbs}
        completeness={completeness}
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
      ) @connection(key: "JournalDateContainer_foodSelectionsByUserId") {
        edges {
          node {
            id,
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
            unitDescription,
            unitOfMeasureId,
            brandDescription,
            physicalDescription
            time,
            date,
          },
        },
      },
    }
  `,
);
