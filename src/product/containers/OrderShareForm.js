import React from 'react';
import Relay from 'react-relay';
import ActionPanelForm from 'shared/components/ActionPanelForm';
import TextInput from 'shared/components/TextInput';
import OrderShareMutation from '../mutations/OrderShareMutation';

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
    this.orderShare(Object.assign(data, {
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
  orderShare (data) {
    const {user, product, query} = this.props;

    Relay.Store.commitUpdate(
      new OrderShareMutation({
        shareData: data,
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
    const {children} = this.props;

    return <ActionPanelForm
      title={'Order a share'}
      notifyClose={this.props.notifyClose}
      onValidSubmit={this.handleSubmit}
      error={error}
    >
      <TextInput
        name={'customerName'}
        label={'Name'}
        validations={{matchRegexp: /[A-Za-z,.0-9]*/}}
      />
      <TextInput
        name={'customerContact'}
        label={'Contact'}
        validations={{matchRegexp: /[A-Za-z,.0-9]*/}}
        required
      />
      <TextInput
        name={'customerNotes'}
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
    userId: null,
    productId: null,
  },
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        ${OrderShareMutation.getFragment('user')},
      }
    `,
    product: () => Relay.QL`
      fragment on User {
        ${OrderShareMutation.getFragment('product')},
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        ${OrderShareMutation.getFragment('query')},
      }
    `,
  },
});
