import React from 'react';
import Relay from 'react-relay';
import ActionPanelForm from 'shared/components/ActionPanelForm';
import TextInput from 'shared/components/TextInput';
import SelectInput from 'shared/components/SelectInput';
import MenuItem from 'material-ui/MenuItem';
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
    const isCardholder = distribution.shareByShareId.userByUserId.rowId === currentPerson.rowId;
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
      title={'Edit Distribution'}
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
      onDelete={null}
      error={error}
      showForm={isOwner || isCardholder}
    >
      <TextInput
        name={'description'}
        label={'Description'}
        validations={{matchRegexp: /[A-Za-z,.0-9]*/, maxLength: 500}}
        initialValue={distribution.description}
        multiLine
        rows={3}
      />
      {(distribution.status === 'RECEIVED'
        || distribution.status === 'DONATED'
        || distribution.status === 'CANCELED')
        ? ''
        : <SelectInput
          name={'status'}
          label={'Status'}
          validations={'isExisty'}
          initialValue={distribution.status}
          required
        >
          {distribution.status === 'PLANNED' && <MenuItem value={'PLANNED'} primaryText={'Planned'} />}
          {distribution.status === 'PLANNED' && isOwner
            && <MenuItem value={'HARVESTED'} primaryText={'Harvested'} />}
          {(distribution.status === 'PLANNED' || distribution.status === 'HARVESTED')
            && isCardholder && <MenuItem value={'RECEIVED'} primaryText={'Received'} />}
          {(distribution.status === 'PLANNED' || distribution.status === 'HARVESTED')
            && isCardholder && <MenuItem value={'DONATED'} primaryText={'Donated'} />}
          {(distribution.status === 'PLANNED' || distribution.status === 'HARVESTED')
            && <MenuItem value={'CANCELED'} primaryText={'Canceled'} />}
        </SelectInput>
      }
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
        status,
        description,
        shareByShareId {
          userByUserId {
            rowId,
          },
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
