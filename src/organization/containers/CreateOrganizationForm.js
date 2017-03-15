import React from 'react';
import Relay from 'react-relay';
import {GoogleApiWrapper} from 'google-maps-react';
import formatAddress from 'shared/utils/formatAddress';
import ActionPanelForm from 'shared/components/ActionPanelForm';
import {TextInput} from 'shared/components/Form';
import CreateOrganizationMutation from '../mutations/CreateOrganizationMutation';

class Container extends React.Component {
  static propTypes = {
    relay: React.PropTypes.object,
    currentPerson: React.PropTypes.object,
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
    placeReady: false,
    formData: {},
  };
  componentWillReceiveProps (props, context) {
    const {location} = context;
    const {formData, placeReady} = this.state;
    const placeData = location.state && location.state.placeData;
    const placeStatus = location.state && location.state.placeStatus;

    // listens for the right conditions in context and state to call the function
    // which calls the mutation.
    if (placeData
      && placeStatus === 'READY'
      && placeReady) {
      this.setState({placeReady: null});

      // the form data has a `location` input which was resolved into a `placeId`
      // we need to drop the location key from the data object so before passing it on.
      delete formData.location;
      this.createOrganization(Object.assign(formData, {
        placeId: placeData.rowId,
        ownerId: props.currentPerson.rowId,
      }));
    }
  }
  handleSubmit = data => {
    // form submits `data` and we pass the `location` input to the geocoder
    // to get a standardized response about that geographical location.
    //
    // The top result from the geocoder is passed to our `place-lookup` container
    // This container looks up if we have the `placeId` registered in our db.
    // An entry is created if it is new. The router returns to the form with the
    // place data store in `context.location.state`
    this.setState({ formData: data, placeReady: true });

    this.geocode({address: data.location}, (results, status) => {
      if (status === 'OK') {
        this.handlePlaceRegistry(results[0]);
      }
    });
  }
  handlePlaceRegistry = geocodeResult => {
    const {router} = this.context;
    const lat = geocodeResult.geometry.location.lat();
    const lng = geocodeResult.geometry.location.lng();

    router.replace({
      pathname: `/profile/create-farm/place-lookup/${geocodeResult.place_id}`,
      state: {
        placeData: {
          rowId: geocodeResult.place_id,
          address: formatAddress(geocodeResult.address_components),
          coords: `(${lat},${lng})`,
        },
      },
    });
  }
  handleSuccess = response => {
    const {router} = this.context;
    const organizationId = response.createOrganization.organizationEdge.node.rowId;
    router.push(`/organization/${organizationId}`);
  }
  handleFailure = transaction => {
    const error = transaction.getError() || new Error('Mutation failed.');
    this.setState({ error: !!error });
  }
  createOrganization (data) {
    const {currentPerson, query, relay} = this.props;

    relay.commitUpdate(
      new CreateOrganizationMutation({
        organizationData: data,
        user: currentPerson,
        query,
      }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      },
    );
  }
  geocode = (request, callback) => {
    const {google} = this.props;
    const Geocoder = new google.maps.Geocoder();
    Geocoder.geocode(request, callback);
  }
  render () {
    const {error} = this.state;
    const {children} = this.props;

    return <ActionPanelForm
      title={'Create Farm'}
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
        name={'location'}
        label={'Location'}
        validations={{matchRegexp: /[A-Za-z,0-9]*/}}
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
        name={'imageUrl'}
        label={'Image'}
        validations={'isUrl'}
      />
      {children}
    </ActionPanelForm>;
  }
}

const GoogleAPIWrappedContainer = GoogleApiWrapper({ // eslint-disable-line
  apiKey: process.env.GOOGLE_MAPS_KEY,
})(Container);

export default Relay.createContainer(GoogleAPIWrappedContainer, {
  initialVariables: {},
  fragments: {
    currentPerson: () => Relay.QL`
      fragment on User {
        rowId,
        ${CreateOrganizationMutation.getFragment('user')},
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        ${CreateOrganizationMutation.getFragment('query')},
      }
    `,
  },
});
