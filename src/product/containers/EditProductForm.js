import React from 'react';
import Relay from 'react-relay';
import ActionPanelForm from 'shared/components/ActionPanelForm';
import {TextInput, validationErrors} from 'shared/components/Form';
import validations from 'shared/utils/validations';
import UpdateProductMutation from '../mutations/UpdateProductMutation';
import DeleteProductMutation from '../mutations/DeleteProductMutation';

class Container extends React.Component {
  static propTypes = {
    relay: React.PropTypes.object,
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
    const {product, query, relay} = this.props;

    relay.commitUpdate(
      new DeleteProductMutation({
        product,
        query,
      }), {
        onSuccess: this.handleSuccessDelete,
        onFailure: this.handleFailure,
      },
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
    const { product, relay } = this.props;

    relay.commitUpdate(
      new UpdateProductMutation({
        productPatch: patch,
        product,
      }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      },
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
        validationError={validationErrors.textArea}
        maxLength={500}
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
        validationError={validationErrors.date}
        required
      />
      <TextInput
        name={'endDate'}
        label={'End date'}
        value={product.endDate}
        validations={{
          matchRegexp: validations.matchDate,
        }}
        validationError={validationErrors.date}
        required
      />
      <TextInput
        name={'creditsInitial'}
        label={'Number of distributions / share'}
        value={String(product.creditsInitial)}
        validations={'isNumeric'}
        validationError={validationErrors.number}
        required
      />
      <TextInput
        name={'maxShares'}
        label={'Maximum number of shares'}
        value={String(product.maxShares)}
        validations={'isNumeric'}
        validationError={validationErrors.number}
        required
      />
      <TextInput
        name={'sharePrice'}
        label={'Share price'}
        value={String(product.sharePrice)}
        validations={{matchRegexp: validations.matchCurrency}}
        validationError={validationErrors.currency}
      />
      <TextInput
        name={'imageUrl'}
        label={'Image'}
        hintText={'http://i.imgur.com/vHqJ2os.png'}
        value={product.imageUrl}
        validations={'isUrl'}
      />
      <TextInput
        name={'url'}
        label={'URL'}
        hintText={'https://example.com'}
        value={product.url}
        validations={'isUrl'}
        validationError={validationErrors.url}
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
        url,
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
