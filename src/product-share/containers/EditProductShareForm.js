import React from 'react';
import Relay from 'react-relay';
import ActionPanelForm from 'shared/components/ActionPanelForm';
import {TextInput, validationErrors} from 'shared/components/Form';
import UpdateProductShareMutation from '../mutations/UpdateProductShareMutation';

class Container extends React.Component {
  static propTypes = {
    relay: React.PropTypes.object,
    share: React.PropTypes.object,
    currentPerson: React.PropTypes.object,
    query: React.PropTypes.object,
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
    isProductOwner: false,
    isCardHolder: false,
  };
  componentWillMount () {
    const {share, currentPerson} = this.props;
    const isProductOwner = share.productByProductId.organizationByOrganizationId.userByOwnerId.rowId
      === currentPerson.rowId;
    const isCardHolder = share.userId === currentPerson.rowId;
    this.setState({isProductOwner, isCardHolder});
  }
  handleSubmit = data => {
    this.setState({ formData: data });
    this.updateShare(data);
  }
  handleSuccess = response => {
    this.props.notifyClose();
  }
  handleFailure = transaction => {
    const error = transaction.getError() || new Error('Mutation failed.');
    this.setState({ error: !!error });
  }
  updateShare (patch) {
    const { share, relay } = this.props;

    relay.commitUpdate(
      new UpdateProductShareMutation({
        sharePatch: patch,
        share,
      }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      },
    );
  }
  render () {
    const {share, notifyClose, children} = this.props;
    const {error, isProductOwner, isCardHolder} = this.state;

    return <ActionPanelForm
      title={'Edit Share'}
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
      onDelete={null}
      error={error}
      showForm={isProductOwner || isCardHolder}
    >
      <TextInput
        name={'customerContact'}
        label={'Customer Contact'}
        validations={{matchRegexp: /[A-Za-z,.0-9]*/, maxLength: 500}}
        validationError={validationErrors.contact}
        value={share.customerContact}
      />
      <TextInput
        name={'customerNotes'}
        label={'Comments'}
        validations={{matchRegexp: /[A-Za-z,.0-9]*/, maxLength: 500}}
        validationError={validationErrors.textArea}
        maxLength={500}
        value={share.customerNotes}
        multiLine
        rows={3}
      />
      {children}
    </ActionPanelForm>;
  }
}

export default Relay.createContainer(Container, {
  initialVariables: {
    shareId: null,
  },
  fragments: {
    share: () => Relay.QL`
      fragment on Share {
        id,
        rowId,
        userId,
        customerNotes,
        customerContact,
        status,
        productByProductId {
          organizationByOrganizationId {
            userByOwnerId {
              rowId
            }
          },
        },
        ${UpdateProductShareMutation.getFragment('share')},
      }
    `,
    currentPerson: () => Relay.QL`
      fragment on User {
        rowId,
      }
    `,
  },
});
