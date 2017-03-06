import React from 'react';
import Relay from 'react-relay';
import ActionPanelForm from 'shared/components/ActionPanelForm';
import {TextInput} from 'shared/components/Form';
import validations from 'shared/utils/validations';
import UpdateProductMutation from '../mutations/UpdateProductMutation';
import DeleteProductMutation from '../mutations/DeleteProductMutation';

class Container extends React.Component {
  static propTypes = {
    product: React.PropTypes.object,
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
    authorized: false,
  };
  componentWillMount () {
    const {product, currentPerson} = this.props;
    const authorized = product.organizationByOrganizationId.userByOwnerId.rowId
      === currentPerson.rowId;
    this.setState({authorized});
  }
  handleSubmit = data => {
    this.setState({ formData: data });
    this.updateProduct(data);
  }
  handleDelete = () => {
    const {product, query} = this.props;

    Relay.Store.commitUpdate(
      new DeleteProductMutation({
        product,
        query,
      }), {
        onSuccess: this.handleSuccessDelete,
        onFailure: this.handleFailure,
      }
    );
  }
  handleSuccess = response => {
    this.props.notifyClose();
  }
  handleFailure = transaction => {
    const error = transaction.getError() || new Error('Mutation failed.');
    this.setState({ error: !!error });
  }
  handleSuccessDelete = response => {
    const {router} = this.context;
    router.replace('/profile');
  }
  updateProduct (patch) {
    const { product } = this.props;

    Relay.Store.commitUpdate(
      new UpdateProductMutation({
        productPatch: patch,
        product,
      }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      }
    );
  }
  render () {
    const {product, notifyClose, children} = this.props;
    const { error, authorized } = this.state;

    return <ActionPanelForm
      title={'Edit Product'}
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
      onDelete={authorized ? this.handleDelete : null}
      error={error}
      showForm={authorized}
    >
      <TextInput
        name={'name'}
        label={'Name'}
        value={product.name}
        validations={{matchRegexp: validations.matchAlphanumeric}}
        required
      />
      <TextInput
        name={'description'}
        label={'Description'}
        value={product.description}
        validations={{matchRegexp: validations.matchAlphanumeric, maxLength: 500}}
        required
        multiLine
        rows={3}
      />
      <TextInput
        name={'startDate'}
        label={'Start date'}
        value={product.startDate}
        validations={{
          matchRegexp: validations.matchDate,
        }}
        required
      />
      <TextInput
        name={'endDate'}
        label={'End date'}
        value={product.endDate}
        validations={{
          matchRegexp: validations.matchDate,
        }}
        required
      />
      <TextInput
        name={'creditsInitial'}
        label={'Number of distributions / share'}
        value={String(product.creditsInitial)}
        validations={'isNumeric'}
        required
      />
      <TextInput
        name={'maxShares'}
        label={'Maximum number of shares'}
        value={String(product.maxShares)}
        validations={'isNumeric'}
        required
      />
      <TextInput
        name={'sharePrice'}
        label={'Share price'}
        value={String(product.sharePrice)}
        validations={{matchRegexp: validations.matchCurrency}}
      />
      <TextInput
        name={'imageUrl'}
        label={'Image'}
        value={product.imageUrl}
        validations={'isUrl'}
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
        id,
        rowId,
        name,
        description,
        startDate,
        endDate,
        creditsInitial,
        maxShares,
        sharePrice,
        imageUrl,
        organizationByOrganizationId {
          userByOwnerId {
            rowId
          }
        },
        ${UpdateProductMutation.getFragment('product')},
        ${DeleteProductMutation.getFragment('product')},
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        ${DeleteProductMutation.getFragment('query')},
      }
    `,
    currentPerson: () => Relay.QL`
      fragment on User {
        rowId,
      }
    `,
  },
});
