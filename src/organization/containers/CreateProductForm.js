import React from 'react';
import Relay from 'react-relay';
import ActionPanelForm from 'shared/components/ActionPanelForm';
import TextInput from 'shared/components/TextInput';
import CreateProductMutation from '../mutations/CreateProductMutation';

class Container extends React.Component {
  static propTypes = {
    organization: React.PropTypes.object,
    query: React.PropTypes.object,
    google: React.PropTypes.object,
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
    this.createProduct(data);
  }
  handleSuccess = response => {
    const {router} = this.context;
    const productId = response.createProduct.productEdge.node.rowId;
    router.push(`/product/${productId}`);
  }
  handleFailure = transaction => {
    const error = transaction.getError() || new Error('Mutation failed.');
    this.setState({ error: !!error });
  }
  createProduct (data) {
    const {organization, query} = this.props;

    Relay.Store.commitUpdate(
      new CreateProductMutation({
        productData: data,
        organization,
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

    return <ActionPanelForm
      title={'Create Product'}
      notifyClose={this.props.notifyClose}
      onValidSubmit={this.handleSubmit}
      error={error}
    >
      <TextInput
        name={'name'}
        label={'Name'}
        validations={{matchRegexp: /[A-Za-z,.0-9]*/}}
        required
      />
      <TextInput
        name={'description'}
        label={'Description'}
        validations={{matchRegexp: /[A-Za-z,.0-9]*/, maxLength: 500}}
        required
        multiLine
        rows={3}
      />
      <TextInput
        name={'maxShares'}
        label={'Number of Shares'}
        validations={'isNumeric'}
        required
      />
      <TextInput
        name={'sharePrice'}
        label={'Share Price'}
        validations={{
          // currency
          matchRegex: /^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$/,
        }}
      />
      <TextInput
        name={'startDate'}
        label={'Start Date'}
        validations={'isDate'}
        required
      />
      <TextInput
        name={'endDate'}
        label={'End Date'}
        validations={'isDate'}
        required
      />
      <TextInput
        name={'imageUrl'}
        label={'Image'}
        validations={'isUrl'}
      />
      {children}
    </ActionPanelForm>;
  }
}

export default Relay.createContainer(Container, {
  initialVariables: {
    userId: null,
  },
  fragments: {
    organization: () => Relay.QL`
      fragment on Organization {
        ${CreateProductMutation.getFragment('organization')},
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        ${CreateProductMutation.getFragment('query')},
      }
    `,
  },
});
