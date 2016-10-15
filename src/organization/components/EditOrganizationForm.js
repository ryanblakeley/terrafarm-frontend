import React from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextInput from '../../shared/components/TextInput';
import UpdateOrganizationMutation from '../mutations/UpdateOrganizationMutation';
import DeleteOrganizationMutation from '../mutations/DeleteOrganizationMutation';

import classNames from '../styles/EditOrganizationFormStylesheet.css';

class EditOrganizationForm extends React.Component {
  static propTypes = {
    organization: React.PropTypes.object,
    query: React.PropTypes.object,
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
    const {organization} = this.props;

    if (!this.state.canSubmit) {
      console.warn('New resource is not ready');
      return;
    }

    Relay.Store.commitUpdate(
      new UpdateOrganizationMutation({
        organizationPatch: data,
        organization,
      })
    );

    this.handleClose();
  }
  handleDelete = () => {
    const {organization, query} = this.props;
    const {router} = this.context;

    Relay.Store.commitUpdate(
      new DeleteOrganizationMutation({
        organization,
        query,
      })
    );

    this.handleClose();

    router.push('/profile');
  }
  render () {
    const {organization} = this.props;
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
          initialValue={organization.name}
          validations={{matchRegexp: /[A-Za-z,\.0-9]*/}}
          required
        />
        <TextInput
          name={'location'}
          label={'Location'}
          initialValue={organization.location}
          validations={{matchRegexp: /[A-Za-z,0-9]*/}}
          required
        />
        <TextInput
          name={'description'}
          label={'Description'}
          initialValue={organization.description}
          validations={{matchRegexp: /[A-Za-z,\.0-9]*/, maxLength: 500}}
          required
          multiLine
          rows={3}
        />
        <TextInput
          name={'imageUrl'}
          label={'Image'}
          initialValue={organization.imageUrl}
          validations={'isUrl'}
        />
        <div className={classNames.buttons}>
          <FlatButton
            label={'Delete'}
            onTouchTap={this.handleDelete}
          />
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

export default Relay.createContainer(EditOrganizationForm, {
  fragments: {
    organization: () => Relay.QL`
      fragment on Organization {
        id,
        name,
        location,
        description,
        imageUrl,
        ${UpdateOrganizationMutation.getFragment('organization')},
        ${DeleteOrganizationMutation.getFragment('organization')},
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        ${DeleteOrganizationMutation.getFragment('query')},
      }
    `,
  },
});
