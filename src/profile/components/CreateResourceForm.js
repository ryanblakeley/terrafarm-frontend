import React from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextInput from '../../shared/components/TextInput';
import CreateResourceMutation from '../mutations/CreateResourceMutation';

import classNames from '../styles/CreateResourceFormStylesheet.css';

class CreateResourceForm extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
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
    const {user, query} = this.props;
    const {router} = this.context;

    if (!this.state.canSubmit) {
      console.warn('New resource is not ready');
      return;
    }

    Relay.Store.commitUpdate(
      new CreateResourceMutation({
        resourceData: data,
        user,
        query,
      }), {
        onSuccess: response => {
          const resourceId = response.createResource.resourceEdge.node.rowId;
          router.push(`/resource/${resourceId}`);
        },
      }
    );

    this.handleClose();
  }
  render () {
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
          validations={{matchRegexp: /[A-Za-z,\.0-9]*/}}
          required
        />
        <TextInput
          name={'location'}
          label={'Location'}
          validations={{matchRegexp: /[A-Za-z,0-9]*/}}
          required
        />
        <TextInput
          name={'description'}
          label={'Description'}
          validations={{matchRegexp: /[A-Za-z,\.0-9]*/, maxLength: 500}}
          required
          multiLine
          rows={3}
        />
        <TextInput
          name={'imageUrl'}
          label={'Image'}
          validations={'isUrl'}
        />
        <div className={classNames.buttons}>
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

export default Relay.createContainer(CreateResourceForm, {
  initialVariables: {
    userId: null,
  },
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        ${CreateResourceMutation.getFragment('user')},
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        ${CreateResourceMutation.getFragment('query')},
      }
    `,
  },
});
