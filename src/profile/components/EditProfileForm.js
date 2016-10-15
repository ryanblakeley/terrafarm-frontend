import React from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextInput from '../../shared/components/TextInput';
import UpdateUserMutation from '../mutations/UpdateUserMutation';
import DeleteUserMutation from '../mutations/DeleteUserMutation';

import classNames from '../styles/EditProfileFormStylesheet.css';

class EditProfileForm extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
    notifyClose: React.PropTypes.func,
  };
  static contextTypes = {
    router: React.PropTypes.object,
  };
  state = {
    canSubmit: false,
  };
  handleValid = () => {
    this.setState({ canSubmit: true });
  }
  handleInvalid = () => {
    this.setState({ canSubmit: false });
  }
  handleClose = () => {
    const {notifyClose} = this.props;
    if (notifyClose) notifyClose();
  }
  handleFormError = data => {
    console.error('Form error:', data);
  }
  handleSubmit = data => {
    const {user} = this.props;

    if (!this.state.canSubmit) {
      console.warn('New resource is not ready');
      return;
    }

    Relay.Store.commitUpdate(
      new UpdateUserMutation({
        userPatch: data,
        user,
      })
    );

    this.handleClose();
  }
  handleDelete = () => {
    const {user} = this.props;
    const {router} = this.context;

    Relay.Store.commitUpdate(
      new DeleteUserMutation({user})
    );

    this.handleClose();

    localStorage.removeItem('id_token');
    localStorage.removeItem('user_uuid');
    router.push('/');
  }
  render () {
    const {user} = this.props;
    const {canSubmit} = this.state;

    return <div className={classNames.this} >
      <Formsy.Form
        onValid={this.handleValid}
        onInvalid={this.handleInvalid}
        onValidSubmit={this.handleSubmit}
        onInvalidSubmit={this.handleFormError}
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
        <div className={classNames.buttons}>
          {/*
          <FlatButton
            label={'Delete'}
            onTouchTap={this.handleDelete}
          />
          */}
          <FlatButton
            label={'Cancel'}
            secondary
            onTouchTap={this.handleClose}
          />
          <RaisedButton
            label={'Save'}
            primary
            type={'submit'}
            disabled={!canSubmit}
          />
        </div>
      </Formsy.Form>
    </div>;
  }
}

export default Relay.createContainer(EditProfileForm, {
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
