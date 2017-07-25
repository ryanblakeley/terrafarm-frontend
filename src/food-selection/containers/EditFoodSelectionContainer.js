import PropTypes from 'prop-types';
import React from 'react';
import {
  createFragmentContainer,
  commitMutation,
  graphql,
} from 'react-relay';
import ActionPanelForm from 'shared/components/ActionPanelForm';
import { TextInput, validationErrors } from 'shared/components/Form';
import validations from 'tools/validations';
import UpdateFoodSelectionMutation from '../mutations/UpdateFoodSelectionMutation';
// TODO import DeleteFoodSelectionMutation from '../mutations/DeleteFoodSelectionMutation';

const propTypes = {
  userByRowId: PropTypes.object.isRequired,
  foodSelectionByRowId: PropTypes.object.isRequired,
  notifyClose: PropTypes.func.isRequired,
  relay: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

class EditFoodSelectionContainer extends React.Component {
  state = {
    error: false,
    formData: {},
  };
  handleSubmit = data => {
    this.setState({ formData: data });
    this.updateFoodSelection(data);
  }
  handleDelete = () => {
    /* TODO
    const {foodSelection, user, relay} = this.props;

    relay.commitUpdate(
      new DeleteFoodSelectionMutation({
        foodSelection,
        user,
      }), {
        onSuccess: this.handleSuccessDelete,
        onFailure: this.handleFailure,
      },
    );
    */
  }
  handleSuccess = response => {
    console.log('FoodSelection Edit SUCCESS:', response);
    this.props.notifyClose();
  }
  handleFailure = error => {
    this.setState({ error: !!error });
  }
  handleSuccessDelete = response => {
    console.log('FoodSelection Delete SUCCESS:', response);
    const { userByRowId: user, router } = this.props;
    router.replace(`/user/${user.rowId}`);
  }
  updateFoodSelection (patch) {
    const { foodSelectionByRowId: foodSelection, relay } = this.props;
/*
    const optimisticResponse = () => ({
      foodSelection: Object.assign({}, foodSelection, patch),
    });
*/
    const variables = {
      input: {
        id: foodSelection.id,
        foodSelectionPatch: patch,
      },
    };

    commitMutation(
      relay.environment,
      {
        mutation: UpdateFoodSelectionMutation,
        // optimisticResponse,
        variables,
        onCompleted: this.handleSuccess,
        onError: this.handleFailure,
      },
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
        label={'USDA Number'}
        value={String(foodSelection.foodId)}
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
      rowId,
    }
  `,
  foodSelectionByRowId: graphql`
    fragment EditFoodSelectionContainer_foodSelectionByRowId on FoodSelection {
      id,
      rowId,
      foodDescription
      foodId
      date,
    }
  `,
});
