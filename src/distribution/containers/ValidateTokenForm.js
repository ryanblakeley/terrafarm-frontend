import React from 'react';
import Relay from 'react-relay';
import ActionPanelForm from 'shared/components/ActionPanelForm';
import TextInput from 'shared/components/TextInput';

class Container extends React.Component {
  static propTypes = {
    organization: React.PropTypes.object,
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
    authorized: false,
  };
  componentWillMount () {
    const {organization, currentPerson} = this.props;
    // const shareholderId = query.validateToken
      // && query.validateToken.shareByShareId.userId;
    const authorized = organization.ownerId === currentPerson.rowId;
      // || shareholderId === currentPerson.rowId;

    this.setState({authorized});
  }
  handleSubmit = data => {
    this.validateToken(Object.assign(data, {}));
  }
  handleSuccess = response => {
    this.props.notifyClose();
  }
  handleFailure = transaction => {
    const error = transaction.getError() || new Error('Mutation failed.');
    this.setState({ error: !!error });
  }
  validateToken (formData) {
    const { organization } = this.props;
    const { router } = this.context;
    const { distributionToken } = formData;
    router.push(`/farm/${organization.rowId}/validate-token/${distributionToken}`);
  }
  render () {
    const {notifyClose, children} = this.props;
    const { error, authorized } = this.state;

    return <ActionPanelForm
      title={'Validate Token'}
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
      error={error}
      showForm={authorized}
    >
      <TextInput
        name={'distributionToken'}
        label={'Voucher Token'}
        validations={'isExisty'}
        required
      />
      {children}
    </ActionPanelForm>;
  }
}

export default Relay.createContainer(Container, {
  initialVariables: {
    organizationId: null,
  },
  fragments: {
    organization: () => Relay.QL`
      fragment on Organization {
        id,
        rowId,
        ownerId,
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
* or first router.push to distribution page with edit panel open and status "RECEIVED"
* and "DONATED" enabled with the former being selected
* save buton enabled
*/
