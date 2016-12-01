import React from 'react';
import Relay from 'react-relay';
import {GoogleApiWrapper} from 'google-maps-react';
import ActionPanelForm from '../../shared/components/ActionPanelForm';
import TextInput from '../../shared/components/TextInput';
import formatAddress from '../../shared/utils/formatAddress';
import UpdateResourceMutation from '../mutations/UpdateResourceMutation';
import DeleteResourceMutation from '../mutations/DeleteResourceMutation';

class Container extends React.Component {
  static propTypes = {
    resource: React.PropTypes.object,
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
    authorized: false,
  };
  componentWillMount () {
    const {resource, currentPerson} = this.props;
    const authorized = resource.ownerId === currentPerson.rowId;
    this.setState({authorized});
  }
  componentWillReceiveProps (props, context) {
    const {location} = context;
    const {formData, placeReady} = this.state;
    const placeData = location.state && location.state.placeData;
    const placeStatus = location.state && location.state.placeStatus;

    if (placeData
      && placeStatus === 'READY'
      && placeReady) {
      this.setState({placeReady: null});
      this.updateResource(Object.assign(formData, {
        placeId: placeData.rowId,
      }));
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
    this.setState({ formData: data, placeReady: true });

    this.geocode({address: data.location}, (results, status) => {
      if (status === 'OK') {
        this.handlePlaceRegistry(results[0]);
      }
    });
  }
  handlePlaceRegistry = geocodeResult => {
    const {router} = this.context;
    const {resource} = this.props;
    const lat = geocodeResult.geometry.location.lat();
    const lng = geocodeResult.geometry.location.lng();

    router.replace({
      pathname: `/resource/${resource.rowId}/edit/place-registry/${geocodeResult.place_id}`,
      state: {
        placeData: {
          rowId: geocodeResult.place_id,
          address: formatAddress(geocodeResult.address_components),
          coords: `(${lat},${lng})`,
        },
      },
    });
  }
  handleDelete = () => {
    const {resource, query} = this.props;

    Relay.Store.commitUpdate(
      new DeleteResourceMutation({
        resource,
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
  updateResource (patch) {
    const { resource } = this.props;
    // the form data has a `location` input which was resolved into a `placeId`
    // we need to drop the location key from the data object so we can use the
    // otherwise intact patch object for the update.
    delete patch.location; // eslint-disable-line

    Relay.Store.commitUpdate(
      new UpdateResourceMutation({
        resourcePatch: patch,
        resource,
      }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      }
    );
  }
  geocode = (request, callback) => {
    const {google} = this.props;
    const Geocoder = new google.maps.Geocoder();
    Geocoder.geocode(request, callback);
  }
  render () {
    const {resource, notifyClose, children} = this.props;
    const {error, authorized} = this.state;

    return <ActionPanelForm
      title={'Edit Resource'}
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
      onDelete={authorized ? this.handleDelete : null}
      error={error}
      showForm={authorized}
    >
      <TextInput
        name={'name'}
        label={'Name'}
        initialValue={resource.name}
        validations={{matchRegexp: /[A-Za-z,\.0-9]*/}}
        required
      />
      <TextInput
        name={'location'}
        label={'Location'}
        initialValue={resource.placeByPlaceId && resource.placeByPlaceId.address}
        validations={{matchRegexp: /[A-Za-z,0-9]*/}}
        required
      />
      <TextInput
        name={'description'}
        label={'Description'}
        initialValue={resource.description}
        validations={{matchRegexp: /[A-Za-z,\.0-9]*/, maxLength: 500}}
        required
        multiLine
        rows={3}
      />
      <TextInput
        name={'imageUrl'}
        label={'Image'}
        initialValue={resource.imageUrl}
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
  initialVariables: {
    resourceId: null,
  },
  fragments: {
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        rowId,
        name,
        ownerId,
        placeByPlaceId {
          address,
        },
        description,
        imageUrl,
        ${UpdateResourceMutation.getFragment('resource')},
        ${DeleteResourceMutation.getFragment('resource')},
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        ${DeleteResourceMutation.getFragment('query')},
      }
    `,
    currentPerson: () => Relay.QL`
      fragment on User {
        rowId,
      }
    `,
  },
});
