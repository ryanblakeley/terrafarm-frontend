import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import moment from 'moment';
import ActionPanelForm from 'shared/components/ActionPanelForm';
import Layout from 'shared/components/Layout';
import { Span, ErrorMessage } from 'shared/components/Typography';
import { TextInput } from 'shared/components/Form';
import validations, { validationErrors } from 'tools/validations';
import UpdateFoodSelectionMutation from 'food-selection/mutations/UpdateFoodSelectionMutation';
import DeleteFoodSelectionMutation from 'food-selection/mutations/DeleteFoodSelectionMutation';
import classNames from '../styles/JournalEditRecordContainerStylesheet.css';

const styles = {
  field: {
    width: 198,
  },
  fieldSmall: {
    width: 95,
  },
};

const propTypes = {
  userByRowId: PropTypes.object.isRequired,
  foodSelectionByRowId: PropTypes.object.isRequired,
  notifyClose: PropTypes.func.isRequired,
  relay: PropTypes.object.isRequired,
  // router: PropTypes.object.isRequired,
};

class JournalEditRecordContainer extends React.Component {
  state = {
    error: false,
    formData: {},
    isChangingDate: false,
  };
  handleSubmit = data => {
    this.setState({ formData: data });
    this.updateFoodSelection(data);
  }
  handleDelete = response => {  // eslint-disable-line no-unused-vars
    const { userByRowId: user, foodSelectionByRowId: foodSelection, relay } = this.props;

    DeleteFoodSelectionMutation.commit(
      relay.environment,
      user,
      foodSelection,
      this.handleSuccessDelete,
      this.handleFailure,
    );
  }
  handleSuccess = response => { // eslint-disable-line no-unused-vars
    if (this.state.isChangingDate) {
      // Special case where we need to forcefully refetch data. Until found-relay
      // offers a way to do this we just have to reload the whole page.
      window.location.reload();
    }

    // this.props.notifyClose();
  }
  handleFailure = error => {
    this.setState({ error: !!error });
  }
  handleSuccessDelete = response => { // eslint-disable-line no-unused-vars
    // TODO: fix the mutation sharedUpdater to get the connections needed.
    // For now, do a forceful page reload. :(
    window.location.reload();
    this.props.notifyClose();
  }
  updateFoodSelection (patch) {
    const { foodSelectionByRowId: foodSelection, relay } = this.props;

    this.setState({ isChangingDate: foodSelection.date !== patch.date });

    UpdateFoodSelectionMutation.commit(
      relay.environment,
      foodSelection,
      patch,
      this.handleSuccess,
      this.handleFailure,
    );
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
  render () {
    const { foodSelectionByRowId: foodSelection, notifyClose } = this.props;
    const { error } = this.state;
    const nutrition = this.calculateNutrition(foodSelection);
    const nutritionDisplay = nutrition.complete
      ? <Layout center topSmall bottomSmall className={classNames.nutrients}>
        <Layout className={`${classNames.nutrientRow}  ${classNames.cal}`}>
          <Span className={classNames.nutrientLabel}>Calories</Span>
          <Span className={classNames.nutrientValue}>{nutrition.calories}</Span>
        </Layout>
        <Layout className={classNames.nutrientRow}>
          <Span className={classNames.nutrientLabel}>Protein</Span>
          <Span className={classNames.nutrientValue}>{nutrition.protein}</Span>
        </Layout>
        <Layout className={classNames.nutrientRow}>
          <Span className={classNames.nutrientLabel}>Fats</Span>
          <Span className={classNames.nutrientValue}>{nutrition.fat}</Span>
        </Layout>
        <Layout className={classNames.nutrientRow}>
          <Span className={classNames.nutrientLabel}>Carbs</Span>
          <Span className={classNames.nutrientValue}>{nutrition.carbs}</Span>
        </Layout>
      </Layout>
      : <Layout center topSmall bottomSmall>
        <ErrorMessage>Food ID and mass are needed to calculate nutrition.</ErrorMessage>
      </Layout>;

    return <ActionPanelForm
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
      onDelete={this.handleDelete}
      error={error}
      showForm
    >
      <Layout flexCenter>
        <Layout>
          <TextInput
            name={'foodId'}
            label={'Food ID'}
            placeholder={'Unique number'}
            value={String(foodSelection.foodId)}
            validations={{ isNumeric: true, maxLength: 8 }}
            validationError={validationErrors.number}
            maxLength={8}
            style={styles.field}
          />
        </Layout>
        <Layout leftSmall>
          <TextInput
            name={'mass'}
            label={'Mass (grams)'}
            value={String(foodSelection.mass)}
            validations={{ isNumeric: true, maxLength: 8 }}
            validationError={validationErrors.number}
            maxLength={8}
            style={styles.field}
          />
        </Layout>
      </Layout>
      {nutritionDisplay}
      <Layout flexCenter>
        <Layout>
          <TextInput
            name={'foodDescription'}
            label={'Food description*'}
            placeholder={'Natural terms'}
            value={foodSelection.foodDescription}
            validations={{ matchRegexp: validations.matchNormalWords, maxLength: 50 }}
            validationError={validationErrors.normalWords}
            maxLength={50}
            required
            style={styles.field}
          />
        </Layout>
        <Layout leftSmall>
          <TextInput
            name={'unitQuantity'}
            label={'Unit quantity'}
            placeholder={'Number'}
            value={String(foodSelection.unitQuantity)}
            validations={{ isNumeric: true, maxLength: 8 }}
            validationError={validationErrors.number}
            maxLength={8}
            style={styles.fieldSmall}
          />
        </Layout>
        <Layout leftSmall>
          <TextInput
            name={'unitDescription'}
            label={'Unit name'}
            placeholder={'Natural term'}
            value={foodSelection.unitDescription}
            validations={{ matchRegexp: validations.matchNormalWords, maxLength: 50 }}
            validationError={validationErrors.normalWords}
            maxLength={50}
            style={styles.fieldSmall}
          />
        </Layout>
      </Layout>
      <Layout flexCenter>
        <Layout>
          <TextInput
            name={'brandDescription'}
            label={'Brand name'}
            value={foodSelection.brandDescription}
            validations={{ matchRegexp: validations.matchNormalWords, maxLength: 50 }}
            validationError={validationErrors.normalWords}
            maxLength={50}
            style={styles.field}
          />
        </Layout>
        <Layout leftSmall>
          <TextInput
            name={'physicalDescription'}
            label={'Physical state'}
            placeholder={'E.x. chopped, sliced, melted'}
            value={foodSelection.physicalDescription}
            validations={{ matchRegexp: validations.matchNormalWords, maxLength: 50 }}
            validationError={validationErrors.normalWords}
            maxLength={50}
            style={styles.field}
          />
        </Layout>
      </Layout>
      <Layout flexCenter>
        <Layout>
          <TextInput
            name={'time'}
            label={'Time (converts to 24-hour)'}
            placeholder={'E.x. 2:05 pm, 8 am, 16:50'}
            value={foodSelection.time}
            convertValue={v => moment(v, 'HH:mm:ss a').format('HH:mm:ss')}
            validations={{ isTime: validations.isTime }}
            validationError={validationErrors.time}
            style={styles.field}
          />
        </Layout>
        <Layout leftSmall>
          <TextInput
            name={'date'}
            label={'Date*'}
            placeholder={'YYY-MM-DD'}
            value={foodSelection.date}
            validations={{ matchRegexp: validations.matchDate }}
            validationError={validationErrors.date}
            required
            style={styles.field}
          />
        </Layout>
      </Layout>
    </ActionPanelForm>;
  }
}

JournalEditRecordContainer.propTypes = propTypes;

export default createFragmentContainer(JournalEditRecordContainer, {
  userByRowId: graphql`
    fragment JournalEditRecordContainer_userByRowId on User {
      id
      rowId
    }
  `,
  foodSelectionByRowId: graphql`
    fragment JournalEditRecordContainer_foodSelectionByRowId on FoodSelection {
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
      foodIdSource
      mass
      massSource
      unitQuantity
      unitDescription
      unitOfMeasureId
      brandDescription
      physicalDescription
      date
      time
    }
  `,
});
