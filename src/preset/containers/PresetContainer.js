import PropTypes from 'prop-types';
import React from 'react';
import Layout from 'shared/components/Layout';
import { Form, TextInput, Toggle } from 'shared/components/Form';
import { Dialog, FlatButton, RaisedButton } from 'shared/components/Material';
import validations, { validationErrors } from 'tools/validations';
import FoodSelectionListHeader from 'food-selection/components/FoodSelectionListHeader';
import FoodSelectionListItem from 'food-selection/components/FoodSelectionListItem';
import UpdatePresetMutation from 'preset/mutations/UpdatePresetMutation';
// import classNames from 'preset/styles/PresetContainerStylesheet.css';

const styles = {
  field: {
    width: 198,
    textAlign: 'left',
  },
};

const propTypes = {
  // currentPerson: PropTypes.object.isRequired,
  preset: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  relay: PropTypes.object.isRequired,
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
      open: false,
      canSubmit: false,
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
    this.setState({ open: true });
  }
  handleClose = () => {
    this.setState({ open: false });
  }
  handleValid = () => {
    this.setState({ canSubmit: true });
  }
  handleInvalid = () => {
    this.setState({ canSubmit: false });
  }
  handleFormError = data => {
    // the submit button being disabled prevents this trigger from being used
    console.error('Form error:', data);
  }
  handleSubmit = data => {
    const { canSubmit } = this.state;
    this.setState({ formData: data });
    if (!canSubmit) {
      console.warn('Form is not ready');
    } else {
      this.updatePreset(data);
    }
  }
  handleSuccess = response => { // eslint-disable-line no-unused-vars
    this.handleClose();
  }
  handleFailure = error => {
    this.setState({ error: !!error, errorMessage: 'Internal server failure.' });
  }
  updatePreset (patch) {
    const { /* currentPerson: user, */ preset, relay } = this.props;

    UpdatePresetMutation.commit(
      relay.environment,
      preset,
      patch,
      this.handleSuccess,
      this.handleFailure,
    );
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
      open,
      canSubmit,
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
        unitAmount,
        unitDescription,
        foodId,
        mass,
      } = s;
      const url = ''; // `/user/${preset.userId}/journal/edit/${rowId}`;
      const nutrition = this.calculateNutrition(s);

      return <FoodSelectionListItem
        key={rowId}
        mass={mass}
        foodName={foodDescription}
        unitAmount={unitAmount}
        unitDescription={unitDescription}
        url={url}
        complete={!!(foodId && mass)}
        nutrition={nutrition}
        router={router}
      />;
    });

    return <Layout center >
      <FoodSelectionListHeader
        listTitle={<RaisedButton
          label={preset.name}
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
      <Dialog
        title={'Edit Preset'}
        titleStyle={{ textAlign: 'center' }}
        paperProps={{ style: { border: '3px solid rgb(92,107,192)' } }}
        modal={false}
        open={open}
        onRequestClose={this.handleClose}
      >
        <Form
          onValid={this.handleValid}
          onInvalid={this.handleInvalid}
          onValidSubmit={this.handleSubmit}
          onInvalidSubmit={this.handleFormError}
        >
          <Layout center >
            <TextInput
              name={'name'}
              label={'Preset name'}
              placeholder={'e.x. breakfast1, fish and chips'}
              value={preset.name}
              validations={{ matchRegexp: validations.matchNormalWords, maxLength: 50 }}
              validationError={validationErrors.normalWords}
              maxLength={50}
              required
              style={styles.field}
            />
            <Layout topSmall >
              <Toggle
                name={'active'}
                label={'Active'}
                value={preset.active}
                style={styles.field}
              />
            </Layout>
            <Layout topSmall >
              <RaisedButton
                label={'Save'}
                primary
                type={'submit'}
                disabled={!canSubmit}
              />
              <FlatButton
                label={'Close'}
                onTouchTap={this.handleClose}
              />
            </Layout>
          </Layout>
        </Form>
      </Dialog>
      <Layout bottomMedium >
        {foodSelectionsList}
      </Layout>
    </Layout>;
  }
}

PresetContainer.propTypes = propTypes;

export default PresetContainer;
