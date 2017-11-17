import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import Layout from 'shared/components/Layout';
import { FlatButton } from 'shared/components/Material';
import ColumnLabels from 'shared/components/ColumnLabels';
import FoodSelectionListHeader from 'food-selection/components/FoodSelectionListHeader';
import FoodSelectionListItem from 'food-selection/components/FoodSelectionListItem';
import classNames from '../styles/JournalDateContainerStylesheet.css';

const propTypes = {
  currentPerson: PropTypes.object.isRequired,
  children: PropTypes.object,
  router: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

const defaultProps = {
  children: null,
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
    const { currentPerson: user } = this.props;
    const foodSelections = user && user.foodSelectionsByUserId;

    if (foodSelections) {
      this.sumMacros(foodSelections.edges.map(({ node }) => (
        this.calculateNutrition(node)
      )));
    }
  }
  componentWillReceiveProps (nextProps) {
    const { currentPerson: user } = nextProps;
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
  handleAddRow = () => {
    const { router, location } = this.props;
    router.replace(`${location.pathname}/new`);
  }
  render () {
    const { currentPerson: user, location, router, match, children } = this.props;
    const { calories, protein, fat, carbs, completeCount, recordsCount } = this.state;
    const foodSelections = user && user.foodSelectionsByUserId.edges;
    const date = location.pathname.split('/')[2];
    const editPanelOpen = router.isActive(match, {
      pathname: `/journal/${date}/edit/`,
    });
    const journalFoodSelections = foodSelections.map(({ node }) => {
      const {
        rowId,
        time,
        foodDescription,
        unitAmount,
        unitDescription,
        foodByFoodId,
        mass,
      } = node;
      const url = `/journal/${date}/edit/${rowId}`;
      const editing = router.isActive(match, { pathname: url });
      const complete = !!(foodByFoodId && mass);
      const nutrition = this.calculateNutrition(node);

      return <FoodSelectionListItem
        key={rowId}
        time={time}
        foodName={foodDescription}
        mass={mass}
        unitAmount={unitAmount}
        unitDescription={unitDescription}
        url={url}
        complete={complete}
        nutrition={nutrition}
        editing={editing}
        wide={editPanelOpen}
        router={router}
      />;
    });

    return <TransitionWrapper>
      <Layout center className={classNames.this} >
        <Layout className={classNames.journalDateWrapper} >
          <ColumnLabels />
          <FoodSelectionListHeader
            listTitle={date}
            calories={calories}
            protein={protein}
            fat={fat}
            carbs={carbs}
            completeCount={completeCount}
            recordsCount={recordsCount}
          />
          <Layout>
            {journalFoodSelections}
          </Layout>
          <FlatButton label={'Add row'} onTouchTap={this.handleAddRow} fullWidth />
        </Layout>
        {children}
      </Layout>
    </TransitionWrapper>;
  }
}

JournalDateContainer.propTypes = propTypes;
JournalDateContainer.defaultProps = defaultProps;

export default createFragmentContainer(
  JournalDateContainer,
  graphql`
    fragment JournalDateContainer_currentPerson on User {
      id,
      rowId,
      foodSelectionsByUserId(
        condition: $condition,
        first: 2147483647,
        orderBy: TIME_DESC
      ) @connection(key: "JournalDateContainer_foodSelectionsByUserId", filters: []) {
        edges {
          node {
            id
            rowId
            time
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
