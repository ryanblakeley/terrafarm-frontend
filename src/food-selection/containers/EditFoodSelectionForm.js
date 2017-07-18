import React from 'react';
import Relay from 'react-relay';
import ActionPanelForm from 'shared/components/ActionPanelForm';
import {TextInput, validationErrors} from 'shared/components/Form';
import validations from 'shared/utils/validations';
import UpdateFoodSelectionMutation from '../mutations/UpdateFoodSelectionMutation';
import DeleteFoodSelectionMutation from '../mutations/DeleteFoodSelectionMutation';

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
  }
  handleSuccess = response => {
    this.props.notifyClose();
  }
  handleFailure = transaction => {
    const error = transaction.getError() || new Error('Mutation failed.');
    this.setState({ error: !!error });
  }
  handleSuccessDelete = response => {
    const {user} = this.props;
    const {router} = this.context;
    router.replace(`/user/${user.rowId}/food-journal`);
  }
  updateFoodSelection (patch) {
    const { foodSelection, relay } = this.props;

    relay.commitUpdate(
      new UpdateFoodSelectionMutation({
        foodSelectionPatch: patch,
        foodSelection,
      }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
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

export default Relay.createContainer(Container, {
  initialVariables: {
    foodSelectionId: null,
    userId: null,
  },
  fragments: {
    foodSelection: () => Relay.QL`
      fragment on FoodSelection {
        id,
        rowId,
        foodDescription
        foodId
        date,
        ${UpdateFoodSelectionMutation.getFragment('foodSelection')},
        ${DeleteFoodSelectionMutation.getFragment('foodSelection')},
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        rowId,
        ${DeleteFoodSelectionMutation.getFragment('user')},
      }
    `,
  },
});
