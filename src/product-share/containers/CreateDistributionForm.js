import React from 'react';
import Relay from 'react-relay';
import ActionPanelForm from 'shared/components/ActionPanelForm';
import TextInput from 'shared/components/TextInput';
import SelectInput from 'shared/components/SelectInput';
import MenuItem from 'material-ui/MenuItem';
import CreateDistributionMutation from '../mutations/CreateDistributionMutation';

class Container extends React.Component {
  static propTypes = {
    share: React.PropTypes.object,
    query: React.PropTypes.object,
    notifyClose: React.PropTypes.func,
    children: React.PropTypes.object,
  };
  static contextTypes = {
    router: React.PropTypes.object,
    location: React.PropTypes.object,
    userId: React.PropTypes.string,
  };
  state = {
    error: false,
    formData: {},
  };
  handleSubmit = data => {
    this.setState({ formData: data });
    this.createDistribution(Object.assign(data, {
      shareId: this.props.share.rowId,
    }));
  }
  handleSuccess = response => {
    const {router} = this.context;
    const distributionId = response.createDistribution.distributionEdge.node.rowId;
    router.push(`/voucher/${distributionId}`);
  }
  handleFailure = transaction => {
    const error = transaction.getError() || new Error('Mutation failed.');
    this.setState({ error: !!error });
  }
  createDistribution (data) {
    const {share, query} = this.props;
    Relay.Store.commitUpdate(
      new CreateDistributionMutation({
        distributionData: {
          ...data,
          shareId: share.rowId,
        },
        share,
        query,
      }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      }
    );
  }
  render () {
    const {userId} = this.context;
    const {error} = this.state;
    const {share, notifyClose, children} = this.props;
    const isOwner = userId === share.productByProductId
      .organizationByOrganizationId.userByOwnerId.rowId;
    const isCardholder = share.userId && userId === share.userId;

    return <ActionPanelForm
      title={'Create Voucher'}
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
      error={error}
    >
      <SelectInput
        name={'status'}
        label={'Status'}
        validations={'isExisty'}
        value={'PLANNED'}
        required
      >
        <MenuItem value={'PLANNED'} primaryText={'Planned'} />
        {isOwner && <MenuItem value={'HARVESTED'} primaryText={'Harvested'} />}
        {isCardholder && <MenuItem value={'RECEIVED'} primaryText={'Received'} />}
        {isCardholder && <MenuItem value={'DONATED'} primaryText={'Donated'} />}
      </SelectInput>
      <TextInput
        name={'description'}
        label={'Notes'}
        validations={{matchRegexp: /[A-Za-z,.0-9]*/, maxLength: 500}}
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
        rowId,
        userId,
        productByProductId {
          organizationByOrganizationId {
            userByOwnerId {
              rowId,
            }
          }
        },
        ${CreateDistributionMutation.getFragment('share')},
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        ${CreateDistributionMutation.getFragment('query')},
      }
    `,
  },
});
