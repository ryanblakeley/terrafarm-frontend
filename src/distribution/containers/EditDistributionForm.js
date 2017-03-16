import React from 'react';
import Relay from 'react-relay';
import ActionPanelForm from 'shared/components/ActionPanelForm';
import {MenuItem} from 'shared/components/Material';
import {TextInput, SelectInput} from 'shared/components/Form';
import UpdateDistributionMutation from '../mutations/UpdateDistributionMutation';

class Container extends React.Component {
  static propTypes = {
    relay: React.PropTypes.object,
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
    const { distribution, relay } = this.props;

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
    const {error, isOwner, isCardholder} = this.state;

    return <ActionPanelForm
      title={'Edit Voucher'}
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
      onDelete={null}
      error={error}
      showForm={isOwner || isCardholder}
    >
      {isOwner && distribution.status !== 'VALIDATED' && <SelectInput
        name={'status'}
        label={'Status'}
        validations={'isExisty'}
        value={distribution.status}
        required
      >
        <MenuItem value={'PLANNED'} primaryText={'Planned'} />
        <MenuItem value={'HARVESTED'} primaryText={'Harvested'} />
        <MenuItem value={'READY'} primaryText={'Ready'} />
      </SelectInput>}
      <TextInput
        name={'description'}
        label={'Notes'}
        validations={{matchRegexp: /[A-Za-z,.0-9]*/, maxLength: 500}}
        value={distribution.description}
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
        status,
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
