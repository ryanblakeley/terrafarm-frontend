import React from 'react';
import Relay from 'react-relay';
import ActionPanelForm from '../../shared/components/ActionPanelForm';
import TextInput from '../../shared/components/TextInput';
import UpdateUserMutation from '../mutations/UpdateUserMutation';
import DeleteUserMutation from '../mutations/DeleteUserMutation';

class EditProfileForm extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
    notifyClose: React.PropTypes.func,
  };
  state = {
    error: false,
  };
  handleSubmit = data => {
    const {user} = this.props;

    Relay.Store.commitUpdate(
      new UpdateUserMutation({
        userPatch: data,
        user,
      }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      }
    );
  }
  /*
  handleDelete = () => {
    const {user} = this.props;
    const {router} = this.context;

    Relay.Store.commitUpdate(
      new DeleteUserMutation({user}), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      }
    );

    this.handleClose();

    localStorage.removeItem('id_token');
    localStorage.removeItem('user_uuid');
    router.replace('/');
  }
  */
  handleSuccess = response => {
    this.props.notifyClose();
  }
  handleFailure = transaction => {
    const error = transaction.getError() || new Error('Mutation failed.');
    this.setState({ error: !!error });
  }
  render () {
    const {user, notifyClose} = this.props;
    const {error} = this.state;

    return <ActionPanelForm
      title={'Edit'}
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
      error={error}
    >
      <TextInput
        name={'name'}
        label={'Name'}
        initialValue={user.name}
        validations={{matchRegexp: /[A-Za-z,\.0-9]*/}}
        required
      />
      <TextInput
        name={'location'}
        label={'Location'}
        initialValue={user.location}
        validations={{matchRegexp: /[A-Za-z,0-9]*/}}
        required
      />
      <TextInput
        name={'description'}
        label={'Description'}
        initialValue={user.description}
        validations={{matchRegexp: /[A-Za-z,\.0-9]*/, maxLength: 500}}
        required
        multiLine
        rows={3}
      />
      <TextInput
        name={'imageUrl'}
        label={'Image'}
        initialValue={user.imageUrl}
        validations={'isUrl'}
      />
    </ActionPanelForm>;
  }
}

export default Relay.createContainer(EditProfileForm, {
  initialVariables: {
    userId: null,
  },
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id,
        name,
        location,
        description,
        imageUrl,
        ${UpdateUserMutation.getFragment('user')},
        ${DeleteUserMutation.getFragment('user')},
      }
    `,
  },
});
