import PropTypes from 'prop-types';
import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';
import ActionPanelForm from 'shared/components/ActionPanelForm';
import { TextInput, validationErrors } from 'shared/components/Form';
import validations from 'tools/validations';
import UpdateFoodSelectionMutation from '../mutations/UpdateFoodSelectionMutation';
import DeleteFoodSelectionMutation from '../mutations/DeleteFoodSelectionMutation';

const propTypes = {
  userByRowId: PropTypes.object.isRequired,
  foodSelectionByRowId: PropTypes.object.isRequired,
  notifyClose: PropTypes.func.isRequired,
  relay: PropTypes.object.isRequired,
  // router: PropTypes.object.isRequired,
};

class EditFoodSelectionContainer extends React.Component {
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

    this.props.notifyClose();
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
  render () {
    const { foodSelectionByRowId: foodSelection, notifyClose } = this.props;
    const { error } = this.state;

    return <ActionPanelForm
      title={'Edit Food Selection'}
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
      onDelete={this.handleDelete}
      error={error}
      showForm
    >
      <TextInput
        name={'foodId'}
        label={'Food Number'}
        value={String(foodSelection.foodId)}
        validations={{ isNumeric: true, maxLength: 8 }}
        validationError={validationErrors.number}
        maxLength={8}
        required
      />
      <TextInput
        name={'mass'}
        label={'Mass (grams)'}
        value={String(foodSelection.mass)}
        validations={{ isNumeric: true, maxLength: 8 }}
        validationError={validationErrors.number}
        maxLength={8}
        required
      />
      <TextInput
        name={'date'}
        label={'Date'}
        value={foodSelection.date}
        validations={{ matchRegexp: validations.matchDate }}
        validationError={validationErrors.date}
        required
      />
    </ActionPanelForm>;
  }
}

EditFoodSelectionContainer.propTypes = propTypes;

export default createFragmentContainer(EditFoodSelectionContainer, {
  userByRowId: graphql`
    fragment EditFoodSelectionContainer_userByRowId on User {
      id
      rowId
    }
  `,
  foodSelectionByRowId: graphql`
    fragment EditFoodSelectionContainer_foodSelectionByRowId on FoodSelection {
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
