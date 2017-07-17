import React from 'react';
import Layout from 'shared/components/Layout';
import TransitionWrapper from 'shared/components/TransitionWrapper';

// TODO:
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

    const {user} = props;
    const foodSelections = user && user.foodSelectionsByUserId;
    const sumMacros = this.sumMacros(foodSelections.edges.map(f => (
      this.calculateNutrition(f.node)
    )));

    this.state = {
      calories: sumMacros.calories,
      protein: sumMacros.protein,
      fat: sumMacros.fat,
      carbs: sumMacros.carbs,
    };
  }
  componentWillReceiveProps (nextProps) {
    const {user, relay} = nextProps;
    const foodSelections = user && user.foodSelectionsByUserId;

    // TODO: compare foodSelectionIds, if changed call this.getNutritionTotals

    if (foodSelections.totalCount > relay.variables.count) {
      relay.setVariables({count: foodSelections.totalCount});
    }
  }
  calculateNutrition = foodSelection => {
    // TODO: calculate nutrition using foodSelection properties

    const result = {
      calories: 0,
      protein: 0,
      fat: 0,
      carbs: 0,
    };

    return result;
  }
  sumMacros = nutritions => {
    let calories = 0;
    let protein = 0;
    let fat = 0;
    let carbs = 0;

    nutritions.forEach(n => {
      calories += n.calories;
      protein += n.protein;
      fat += n.fat;
      carbs += n.carbs;
    });

    return { calories, protein, fat, carbs };
  }
  render () {
    const {user} = this.props;
    const foodSelections = user && user.foodSelectionsByUserId.edges;
    const journalRowElements = foodSelections.map(f => (
      <div key={f.node.rowId}>{f.node.date}, {f.node.foodId}</div>
    ));

    return <TransitionWrapper>
      <Layout center>
        {journalRowElements}
      </Layout>
    </TransitionWrapper>;
  }
}

export default JournalDateContainer;
