import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import ActionPanelForm from 'shared/components/ActionPanelForm';
import Layout from 'shared/components/Layout';
import { TextInput } from 'shared/components/Form';
import validations, { validationErrors, conversions } from 'tools/validations';
import SelectionNutritionValues from '../components/SelectionNutritionValues';
import SelectionMassSuggestion from '../components/SelectionMassSuggestion';
import UpdateFoodSelectionMutation from 'food-selection/mutations/UpdateFoodSelectionMutation';
import DeleteFoodSelectionMutation from 'food-selection/mutations/DeleteFoodSelectionMutation';

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
  children: PropTypes.object.isRequired,
};

class JournalEditRecordContainer extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      error: false,
      formData: {},
      isChangingDate: false,
      foodId: props.foodSelectionByRowId.foodId,
      mass: props.foodSelectionByRowId.mass,
    };
  }
  handleSubmit = data => {
    const patch = Object.assign(data, {
      foodId: data.foodId || null,
      mass: data.mass || null,
    });

    this.setState({ formData: data });
    this.updateFoodSelection(patch);
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
  handleChangeFoodId = (foodId) => {
    this.setState({ foodId });
  }
  handleChangeMass = (mass) => {
    this.setState({ mass });
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
  render () {
    const { foodSelectionByRowId: foodSelection, notifyClose, children } = this.props;
    const { error, foodId, mass } = this.state;
    /*
    const massMissing = (foodId && !mass && !massSuggestion)
      ? <ErrorMessage>Mass is needed to calculate nutrition values.</ErrorMessage>
      : null;
    */
    const childrenWithProps = <Layout>
      {React.Children.map(children, c => React.cloneElement(c, {
        handleClickFoodMatch: this.handleChangeFoodId,
      }))}
    </Layout>;

    return <ActionPanelForm
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
      onDelete={this.handleDelete}
      error={error}
      showForm
    >
      <Layout flexCenter flexWrap >
        <Layout>
          <TextInput
            name={'foodId'}
            label={'Food ID'}
            placeholder={'Unique number'}
            value={foodId}
            validations={{ isNumeric: true }}
            validationError={validationErrors.number}
            maxLength={8}
            style={styles.field}
          />
        </Layout>
        <Layout leftSmall >
          <TextInput
            name={'mass'}
            label={'Mass (grams)'}
            value={mass}
            validations={{ isNumeric: true }}
            validationError={validationErrors.number}
            maxLength={8}
            style={styles.field}
          />
        </Layout>
      </Layout>
      <SelectionNutritionValues
        food={foodSelection.foodByFoodId}
        mass={foodSelection.mass}
      />
      <SelectionMassSuggestion
        unit={foodSelection.unitOfMeasureByUnitOfMeasureId}
        amount={foodSelection.unitAmount}
        show={!mass}
        handleClickMassSuggestion={this.handleChangeMass}
      />
      {!foodId && childrenWithProps}
      <Layout flexCenter flexWrap >
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
        <Layout leftSmall flexCenter >
          <Layout>
            <TextInput
              name={'unitAmount'}
              label={'Unit amount'}
              placeholder={'Number'}
              value={foodSelection.unitAmount}
              validations={{ isNumeric: true }}
              validationError={validationErrors.number}
              maxLength={8}
              style={styles.fieldSmall}
            />
          </Layout>
          <Layout leftSmall >
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
      </Layout>
      <Layout flexCenter flexWrap >
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
        <Layout leftSmall >
          <TextInput
            name={'physicalModDescription'}
            label={'Physical state'}
            placeholder={'E.x. chopped, sliced, melted'}
            value={foodSelection.physicalModDescription}
            validations={{ matchRegexp: validations.matchNormalWords, maxLength: 50 }}
            validationError={validationErrors.normalWords}
            maxLength={50}
            style={styles.field}
          />
        </Layout>
      </Layout>
      <Layout flexCenter flexWrap >
        <Layout>
          <TextInput
            name={'time'}
            label={'Time (converts to 24-hour)'}
            placeholder={'E.x. 2:05 pm, 8 am, 16:50'}
            value={foodSelection.time}
            convertValue={conversions.time}
            validations={{ isTime: validations.isTime }}
            validationError={validationErrors.time}
            style={styles.field}
          />
        </Layout>
        <Layout leftSmall >
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
      unitAmount
      unitDescription
      unitOfMeasureId
      unitOfMeasureByUnitOfMeasureId {
        category
        siFactor
      }
      brandDescription
      physicalModDescription
      date
      time
    }
  `,
});
