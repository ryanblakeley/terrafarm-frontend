import React from 'react';
import Relay from 'react-relay';
import ActionPanelForm from 'shared/components/ActionPanelForm';
import {TextInput, SelectInput} from 'shared/components/Form';
import {MenuItem} from 'shared/components/Material';
import AssignShareMutation from '../mutations/AssignShareMutation';

class Container extends React.Component {
  static propTypes = {
    product: React.PropTypes.object,
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
  };
  handleSubmit = data => {
    this.setState({ formData: data });
    this.assignShare(Object.assign(data, {
      productId: this.props.product.rowId,
    }));
  }
  handleSuccess = response => {
    const {router} = this.context;
    const shareId = response.createShare.shareEdge.node.rowId;
    router.push(`/share/${shareId}`);
  }
  handleFailure = transaction => {
    const error = transaction.getError() || new Error('Mutation failed.');
    this.setState({ error: !!error });
  }
  assignShare (data) {
    const {product, query} = this.props;
    // flattens product details as a snapshot and stores them as props on the product-share
    Relay.Store.commitUpdate(
      new AssignShareMutation({
        shareData: {
          ...data,
          startDate: product.startDate,
          endDate: product.endDate,
          price: product.sharePrice || 0,
          productId: product.rowId,
          productName: product.name,
          productDescription: product.description,
          creditsInitial: product.creditsInitial,
        },
        product,
        query,
      }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      }
    );
  }
  render () {
    const {error} = this.state;
    const {children} = this.props;

    // radio button status: reserved, purchased

    return <ActionPanelForm
      title={'Assign share'}
      notifyClose={this.props.notifyClose}
      onValidSubmit={this.handleSubmit}
      error={error}
    >
      <SelectInput
        name={'status'}
        label={'Status'}
        validations={'isExisty'}
        value={'RESERVED'}
        required
      >
        <MenuItem value={'RESERVED'} primaryText={'Reserved'} />
        <MenuItem value={'ACTIVE'} primaryText={'Active'} />
      </SelectInput>
      <TextInput
        name={'customerName'}
        label={'Customer Name'}
        validations={{matchRegexp: /[A-Za-z,.0-9]*/}}
        required
      />
      <TextInput
        name={'customerContact'}
        label={'Customer Contact'}
        validations={{matchRegexp: /[A-Za-z,.0-9]*/}}
        required
      />
      <TextInput
        name={'customerNotes'}
        label={'Comments'}
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
    productId: null,
  },
  fragments: {
    product: () => Relay.QL`
      fragment on Product {
        rowId,
        startDate,
        endDate,
        sharePrice,
        name,
        description,
        creditsInitial,
        ${AssignShareMutation.getFragment('product')},
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        ${AssignShareMutation.getFragment('query')},
      }
    `,
  },
});
