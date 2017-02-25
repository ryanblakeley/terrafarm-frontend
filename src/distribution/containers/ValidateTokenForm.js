import React from 'react';
import Relay from 'react-relay';
import ActionPanelForm from 'shared/components/ActionPanelForm';
import TextInput from 'shared/components/TextInput';

class Container extends React.Component {
  static propTypes = {
    organization: React.PropTypes.object,
    currentPerson: React.PropTypes.object,
    query: React.PropTypes.object,
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
    const {organization, currentPerson, query} = this.props;
    const shareholderId = query.allDistributions.edges[0]
      && query.allDistributions.edges[0].node.shareByShareId.userId;
    const authorized = organization.ownerId === currentPerson.rowId
      || shareholderId === currentPerson.rowId;

    console.log('shareholder id:', shareholderId, 'owner id:', organization.ownerId, 'current person id:', currentPerson.rowId);
    console.log('AUTHORIZED:', authorized);

    this.setState({authorized});
  }
  componentWillReceiveProps (nextProps) {
    const {organization, query} = nextProps;
    const distributionId = query.allDistributions.edges[0] && query.allDistributions.edges[0].node.rowId;
    if (this.state.authorized && distributionId) {
      router.push(`/distribution/${distributionId}`);
    }
  }
  handleSubmit = data => {
    // form submits `data` and we pass the `location` input to the geocoder
    // to get a standardized response about that geographical location.
    //
    // The top result from the geocoder is passed to our `place-registry` container
    // This container looks up if we have the `placeId` registered in our db.
    // An entry is created if it is new. The router returns to the form with the
    // place data store in `context.location.state`
    this.validateToken(Object.assign(data, {
    }));
  }
  handleSuccess = response => {
    this.props.notifyClose();
  }
  handleFailure = transaction => {
    const error = transaction.getError() || new Error('Mutation failed.');
    this.setState({ error: !!error });
  }
  validateToken (formData) {
    const { organization, relay } = this.props;
    const { distributionToken } = formData;
    relay.setVariables({
      distributionToken,
    });
    /*
     * or first router.push to distribution page with edit panel open and status "RECEIVED" and "DONATED" enabled with the former being selected
     * save buton enabled
     *
    Relay.Store.commitUpdate(
      new UpdateOrganizationMutation({
        organizationPatch: patch,
        organization,
      }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      }
    );
    */
  }
  render () {
    const {organization, notifyClose, children} = this.props;
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
    distributionToken: null,
  },
  fragments: {
    organization: () => Relay.QL`
      fragment on Organization {
        id,
        rowId,
        ownerId,
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        allDistributions(condition:{token:$distributionToken}) {
          edges {
            node {
              id,
              rowId,
              shareByShareId {
                productByProductId {
                  organizationId
                }
              }
            }
          }
        }
      }
    `,
    currentPerson: () => Relay.QL`
      fragment on User {
        rowId,
      }
    `,
  },
});
