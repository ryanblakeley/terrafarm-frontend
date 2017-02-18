import React from 'react';
import Relay from 'react-relay';
import ActionPanelForm from 'shared/components/ActionPanelForm';
import TextInput from 'shared/components/TextInput';
import SelectInput from 'shared/components/SelectInput';
import MenuItem from 'material-ui/MenuItem';
import UpdateProductShareMutation from '../mutations/UpdateProductShareMutation';

class Container extends React.Component {
  static propTypes = {
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
    const { share } = this.props;

    Relay.Store.commitUpdate(
      new UpdateProductShareMutation({
        sharePatch: patch,
        share,
      }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      }
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
        initialValue={share.customerContact}
      />
      <TextInput
        name={'customerNotes'}
        label={'Comments'}
        validations={{matchRegexp: /[A-Za-z,.0-9]*/, maxLength: 500}}
        initialValue={share.customerNotes}
        multiLine
        rows={3}
      />
      {share.status === 'RESERVED' && isProductOwner
        && <SelectInput
          name={'status'}
          label={'Status'}
          validations={'isExisty'}
          value={share.status}
          required
        >
          <MenuItem value={'RESERVED'} primaryText={'Reserved'} />
          <MenuItem value={'PURCHASED'} primaryText={'Purchased'} />
        </SelectInput>
      }
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
