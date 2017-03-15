import React from 'react';
import Relay from 'react-relay';
import validations from 'shared/utils/validations';
import ActionPanelForm from 'shared/components/ActionPanelForm';
import {TextInput} from 'shared/components/Form';
import UpdateDistributionMutation from 'distribution/mutations/UpdateDistributionMutation';

class Container extends React.Component {
  static propTypes = {
    relay: React.PropTypes.object,
    distributionByDistributionToken: React.PropTypes.object,
    distribution: React.PropTypes.object,
    currentPerson: React.PropTypes.object,
    notifyClose: React.PropTypes.func,
    children: React.PropTypes.object,
  };
  state = {
    error: false,
    formData: {},
    authorized: false,
  };
  componentWillMount () {
    const {distributionByDistributionToken, distribution, currentPerson} = this.props;
    const isShareholder = distribution.shareByShareId.userId === currentPerson.rowId;
    const isProductOwner = distribution.shareByShareId.productByProductId
      .organizationByOrganizationId.ownerId === currentPerson.rowId;
    const vouchersMatch = distributionByDistributionToken
      && distributionByDistributionToken.rowId === distribution.rowId;
    this.setState({authorized: (isShareholder || isProductOwner) && vouchersMatch});
  }
  handleSubmit = data => {
    const {authorized} = this.state;

    this.setState({ formData: data });
    if (authorized) {
      this.changeVoucher(Object.assign(data, {
        status: 'VALIDATED',
      }));
    }
  }
  handleSuccess = response => {
    this.props.notifyClose();
  }
  handleFailure = transaction => {
    const error = transaction.getError() || new Error('Mutation failed.');
    this.setState({ error: !!error });
  }
  changeVoucher (patch) {
    const {distribution, relay} = this.props;

    relay.commitUpdate(
      new UpdateDistributionMutation({
        distributionPatch: patch,
        distribution,
      }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      },
    );
  }
  render () {
    const {distribution, notifyClose, children} = this.props;
    const {error, authorized} = this.state;

    return <ActionPanelForm
      title={'Confirm Validation'}
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
      error={error}
      showForm={authorized}
    >
      <TextInput
        name={'description'}
        label={'Comments'}
        value={distribution.description}
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
    distributionToken: null,
    distributionId: null,
  },
  fragments: {
    distributionByDistributionToken: () => Relay.QL`
      fragment on Distribution {
        rowId,
      }
    `,
    currentPerson: () => Relay.QL`
      fragment on User {
        rowId,
      }
    `,
    distribution: () => Relay.QL`
      fragment on Distribution {
        rowId,
        description,
        shareByShareId {
          userId,
          productByProductId {
            organizationByOrganizationId {
              ownerId,
            },
          },
        },
        ${UpdateDistributionMutation.getFragment('distribution')},
      }
    `,
  },
});
