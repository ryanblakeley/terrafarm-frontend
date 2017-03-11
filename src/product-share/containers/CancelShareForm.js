import React from 'react';
import Relay from 'react-relay';
import validations from 'shared/utils/validations';
import ActionPanelForm from 'shared/components/ActionPanelForm';
import {TextInput} from 'shared/components/Form';
import UpdateShareMutation from 'product-share/mutations/UpdateProductShareMutation';

class Container extends React.Component {
  static propTypes = {
    share: React.PropTypes.object,
    currentPerson: React.PropTypes.object,
    notifyClose: React.PropTypes.func,
    children: React.PropTypes.object,
  };
  state = {
    error: false,
    formData: {},
    isShareholder: false,
    isFarmOwner: false,
    sharesMatch: false,
  };
  componentWillMount () {
    const {share, currentPerson} = this.props;
    const isShareholder = share.userId === currentPerson.rowId;
    const isFarmOwner = share.productByProductId.organizationByOrganizationId.ownerId
      === currentPerson.rowId;

    this.setState({isShareholder, isFarmOwner});
  }
  handleSubmit = data => {
    const {isShareholder, isFarmOwner} = this.state;

    this.setState({ formData: data });
    if (isShareholder || isFarmOwner) {
      this.changeShare(Object.assign(data, {
        status: 'CANCELED',
      }));
    }
  }
  handleSuccess = response => {
    // TODO: generate vouchers
    this.props.notifyClose();
  }
  handleFailure = transaction => {
    const error = transaction.getError() || new Error('Mutation failed.');
    this.setState({ error: !!error });
  }
  changeShare (patch) {
    const { share } = this.props;

    Relay.Store.commitUpdate(
      new UpdateShareMutation({
        sharePatch: patch,
        share,
      }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      }
    );
  }
  render () {
    const { share, notifyClose, children } = this.props;
    const { isShareholder, isFarmOwner, error } = this.state;

    return <ActionPanelForm
      title={'Cancel Share'}
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
      error={error}
      showForm={isShareholder || isFarmOwner}
    >
      <TextInput
        name={'customerNotes'}
        label={'Comments'}
        value={share.customerNotes}
        validations={{matchRegexp: validations.matchAlphanumeric, maxLength: 500}}
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
    currentPerson: () => Relay.QL`
      fragment on User {
        rowId,
      }
    `,
    share: () => Relay.QL`
      fragment on Share {
        rowId,
        userId,
        customerNotes,
        productByProductId {
          organizationByOrganizationId {
            ownerId,
          },
        },
        ${UpdateShareMutation.getFragment('share')},
      }
    `,
  },
});