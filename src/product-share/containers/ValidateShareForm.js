import React from 'react';
import Relay from 'react-relay';
import ActionPanelForm from 'shared/components/ActionPanelForm';
import {TextInput, validationErrors} from 'shared/components/Form';

class Container extends React.Component {
  static propTypes = {
    share: React.PropTypes.object,
    currentPerson: React.PropTypes.object,
    relay: React.PropTypes.object,
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
    isShareholder: false,
    isFarmOwner: false,
  };
  componentWillMount () {
    const {share, currentPerson} = this.props;
    const isShareholder = share.userId === currentPerson.rowId;
    const isFarmOwner = share.productByProductId.organizationByOrganizationId.ownerId
      === currentPerson.rowId;

    this.setState({isShareholder, isFarmOwner});
  }
  handleSubmit = data => {
    this.submitToken(data);
  }
  handleSuccess = response => {
    this.props.notifyClose();
  }
  handleFailure = transaction => {
    const error = transaction.getError() || new Error('Mutation failed.');
    this.setState({ error: !!error });
  }
  submitToken (formData) {
    const { share } = this.props;
    const { router } = this.context;
    const { shareToken } = formData;
    router.push(`/share/${share.rowId}/activate/${shareToken}`);
  }
  render () {
    const { share, notifyClose, children } = this.props;
    const { error, isShareholder, isFarmOwner } = this.state;

    return children
      ? <div>{React.Children.map(children, child => React.cloneElement(child, {notifyClose}))}</div>
      : <ActionPanelForm
        title={'Activate Share'}
        notifyClose={notifyClose}
        onValidSubmit={this.handleSubmit}
        error={error}
        showForm={isShareholder || isFarmOwner}
      >
        <TextInput
          name={'shareToken'}
          label={'Token'}
          validations={'isExisty'}
          value={isFarmOwner ? share.token : ''}
          validationError={validationErrors.token}
          required
        />
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
        id,
        rowId,
        userId,
        token,
        productByProductId {
          organizationByOrganizationId {
            ownerId,
          },
        },
      }
    `,
    currentPerson: () => Relay.QL`
      fragment on User {
        rowId,
      }
    `,
  },
});

/*
* or first router.push to share page with edit panel open and status "RECEIVED"
* and "DONATED" enabled with the former being selected
* save buton enabled
*/
