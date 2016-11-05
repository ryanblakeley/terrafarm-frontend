import React from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextInput from '../../shared/components/TextInput';
import UpdateResourceMutation from '../mutations/UpdateResourceMutation';
import DeleteResourceMutation from '../mutations/DeleteResourceMutation';

import classNames from '../styles/EditResourceFormStylesheet.css';

class EditResourceForm extends React.Component {
  static propTypes = {
    resource: React.PropTypes.object,
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
    const {resource} = this.props;

    if (!this.state.canSubmit) {
      console.warn('New resource is not ready');
      return;
    }

    Relay.Store.commitUpdate(
      new UpdateResourceMutation({
        resourcePatch: data,
        resource,
      })
    );

    this.handleClose();
  }
  handleDelete = () => {
    const {resource, query} = this.props;
    const {router} = this.context;

    Relay.Store.commitUpdate(
      new DeleteResourceMutation({
        resource,
        query,
      })
    );

    this.handleClose();

    router.push('/profile');
  }
  render () {
    const {resource} = this.props;
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
          initialValue={resource.name}
          validations={{matchRegexp: /[A-Za-z,\.0-9]*/}}
          required
        />
        <TextInput
          name={'location'}
          label={'Location'}
          initialValue={resource.location}
          validations={{matchRegexp: /[A-Za-z,0-9]*/}}
          required
        />
        <TextInput
          name={'description'}
          label={'Description'}
          initialValue={resource.description}
          validations={{matchRegexp: /[A-Za-z,\.0-9]*/, maxLength: 500}}
          required
          multiLine
          rows={3}
        />
        <TextInput
          name={'imageUrl'}
          label={'Image'}
          initialValue={resource.imageUrl}
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

export default Relay.createContainer(EditResourceForm, {
  initialVariables: {
    resourceId: null,
  },
  fragments: {
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
        description,
        location,
        imageUrl,
        ${UpdateResourceMutation.getFragment('resource')},
        ${DeleteResourceMutation.getFragment('resource')},
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        ${DeleteResourceMutation.getFragment('query')},
      }
    `,
  },
});
