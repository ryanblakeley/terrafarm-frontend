import React from 'react';
import Relay from 'react-relay';
import ActionPanelForm from 'shared/components/ActionPanelForm';
import {TextInput} from 'shared/components/Form';
import ReserveShareMutation from '../mutations/ReserveShareMutation';

class Container extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
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
    this.reserveShare(Object.assign(data, {
      userId: this.props.user.rowId,
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
  reserveShare (data) {
    const {user, product, query} = this.props;
    // flattens product details as a snapshot and stores them as props on the product-share
    Relay.Store.commitUpdate(
      new ReserveShareMutation({
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
        user,
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
    const {user, children} = this.props;

    return <ActionPanelForm
      title={'Reserve share'}
      notifyClose={this.props.notifyClose}
      onValidSubmit={this.handleSubmit}
      error={error}
    >
      <TextInput
        name={'customerName'}
        label={'Your Name'}
        validations={{matchRegexp: /[A-Za-z,.0-9]*/}}
        value={user.name}
        required
      />
      <TextInput
        name={'customerContact'}
        label={'Your Contact'}
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
    userId: null,
    productId: null,
  },
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        name,
        rowId,
        ${ReserveShareMutation.getFragment('user')},
      }
    `,
    product: () => Relay.QL`
      fragment on Product {
        rowId,
        name,
        startDate,
        endDate,
        description,
        sharePrice,
        name,
        creditsInitial,
        ${ReserveShareMutation.getFragment('product')},
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        ${ReserveShareMutation.getFragment('query')},
      }
    `,
  },
});
