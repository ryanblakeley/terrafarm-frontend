import React from 'react';
import {
  createFragmentContainer,
  commitMutation,
  graphql,
} from 'react-relay/compat';
import ActionPanelForm from 'shared/components/ActionPanelForm';
import {TextInput, validationErrors} from 'shared/components/Form';
import validations from 'shared/utils/validations';
import UpdateFoodSelectionMutation from '../mutations/UpdateFoodSelectionMutation';
// TODO import DeleteFoodSelectionMutation from '../mutations/DeleteFoodSelectionMutation';

class Container extends React.Component {
  static propTypes = {
    relay: React.PropTypes.object,
    foodSelection: React.PropTypes.object,
    user: React.PropTypes.object,
    notifyClose: React.PropTypes.func,
    children: React.PropTypes.object,
  };
  static contextTypes = {
    router: React.PropTypes.object,
    location: React.PropTypes.object,
  };
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
    this.props.notifyClose();
  }
  handleFailure = error => {
    this.setState({ error: !!error });
  }
  handleSuccessDelete = response => {
    const {user} = this.props;
    const {router} = this.context;
    router.replace(`/user/${user.rowId}`);
  }
  updateFoodSelection (patch) {
    const { foodSelection, relay } = this.props;

    const optimisticResponse = _ => ({
      foodSelection: Object.assign(foodSelection, patch),
    });

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
        optimisticResponse,
        variables,
        onCompleted: this.handleSuccess,
        onError: this.handleFailure,
      },
    );
  }
  render () {
    const {foodSelection, notifyClose, children} = this.props;
    const {error} = this.state;

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
        validations={{isNumeric: true, maxLength: 8}}
        validationError={validationErrors.number}
        maxLength={8}
        required
      />
      <TextInput
        name={'date'}
        label={'Date'}
        value={foodSelection.date}
        validations={{matchRegexp: validations.matchDate}}
        validationError={validationErrors.date}
        required
      />
      {children}
    </ActionPanelForm>;
  }
}

export default createFragmentContainer(Container, {
  /* TODO manually deal with:
  initialVariables: {
    foodSelectionId: null,
    userId: null,
  }
  */
  foodSelection: graphql`
    fragment EditFoodSelectionForm_foodSelection on FoodSelection {
      id,
      rowId,
      foodDescription
      foodId
      date,
    }
  `,
  user: graphql`
    fragment EditFoodSelectionForm_user on User {
      rowId,
    }
  `,
});
