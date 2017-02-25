import React from 'react';
import Relay from 'react-relay';
import ActionPanelForm from 'shared/components/ActionPanelForm';
import TextInput from 'shared/components/TextInput';
import UpdateDistributionMutation from '../mutations/UpdateDistributionMutation';

class Container extends React.Component {
  static propTypes = {
    distribution: React.PropTypes.object,
    currentPerson: React.PropTypes.object,
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
    isOwner: false,
    isCardholder: false,
  };
  componentWillMount () {
    const {distribution, currentPerson} = this.props;
    const isOwner = distribution.shareByShareId.productByProductId
      .organizationByOrganizationId.userByOwnerId.rowId === currentPerson.rowId;
    const isCardholder = distribution.shareByShareId.userId === currentPerson.rowId;
    this.setState({isOwner, isCardholder});
  }
  handleSubmit = data => {
    this.setState({ formData: data });
    this.updateDistribution(data);
  }
  handleSuccess = response => {
    this.props.notifyClose();
  }
  handleFailure = transaction => {
    const error = transaction.getError() || new Error('Mutation failed.');
    this.setState({ error: !!error });
  }
  updateDistribution (patch) {
    const { distribution } = this.props;

    Relay.Store.commitUpdate(
      new UpdateDistributionMutation({
        distributionPatch: patch,
        distribution,
      }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      }
    );
  }
  render () {
    const {distribution, notifyClose, children} = this.props;
    const {error, isOwner, isCardholder} = this.state;

    return <ActionPanelForm
      title={'Edit Voucher'}
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
      onDelete={null}
      error={error}
      showForm={isOwner || isCardholder}
    >
      <TextInput
        name={'description'}
        label={'Notes'}
        validations={{matchRegexp: /[A-Za-z,.0-9]*/, maxLength: 500}}
        initialValue={distribution.description}
        multiLine
        rows={3}
      />
      {children}
    </ActionPanelForm>;
  }
}

export default Relay.createContainer(Container, {
  initialVariables: {
    distributionId: null,
  },
  fragments: {
    distribution: () => Relay.QL`
      fragment on Distribution {
        description,
        shareByShareId {
          userId,
          productByProductId {
            organizationByOrganizationId {
              userByOwnerId {
                rowId
              }
            },
          },
        },
        ${UpdateDistributionMutation.getFragment('distribution')},
      }
    `,
    currentPerson: () => Relay.QL`
      fragment on User {
        rowId,
      }
    `,
  },
});
