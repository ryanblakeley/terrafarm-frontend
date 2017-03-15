import React from 'react';
import Relay from 'react-relay';
import {GoogleApiWrapper} from 'google-maps-react';
import ActionPanelForm from 'shared/components/ActionPanelForm';
import {TextInput} from 'shared/components/Form';
import formatAddress from 'shared/utils/formatAddress';
import UpdateUserMutation from '../mutations/UpdateUserMutation';
import DeleteUserMutation from '../mutations/DeleteUserMutation';

class Container extends React.Component {
  static propTypes = {
    relay: React.PropTypes.object,
    currentPerson: React.PropTypes.object,
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

    if (placeData
      && placeStatus === 'READY'
      && placeReady) {
      this.setState({placeReady: false});
      this.updateUser(Object.assign(formData, {
        placeId: placeData.rowId,
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
      pathname: `/profile/edit/place-lookup/${geocodeResult.place_id}`,
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
    this.props.notifyClose();
  }
  handleFailure = transaction => {
    const error = transaction.getError() || new Error('Mutation failed.');
    this.setState({ error: !!error });
  }
  updateUser (patch) {
    const {currentPerson, relay} = this.props;
    // the form data has a `location` input which was resolved into a `placeId`
    // we need to drop the location key from the data object so we can use the
    // otherwise intact patch object for the update.
    delete patch.location; // eslint-disable-line

    relay.commitUpdate(
      new UpdateUserMutation({
        userPatch: patch,
        user: currentPerson,
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
    const {currentPerson, notifyClose, children} = this.props;
    const {error} = this.state;

    return <ActionPanelForm
      title={'Edit Profile'}
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
      error={error}
    >
      <TextInput
        name={'name'}
        label={'Name'}
        value={currentPerson.name}
        validations={{matchRegexp: /[A-Za-z,.0-9]*/}}
        required
      />
      <TextInput
        name={'location'}
        label={'Location'}
        value={currentPerson.placeByPlaceId && currentPerson.placeByPlaceId.address}
        validations={{matchRegexp: /[A-Za-z,0-9]*/}}
        onChange={this.handleChangeLocation}
        required
      />
      <TextInput
        name={'description'}
        label={'Description'}
        value={currentPerson.description}
        validations={{matchRegexp: /[A-Za-z,.0-9]*/, maxLength: 500}}
        required
        multiLine
        rows={3}
      />
      <TextInput
        name={'imageUrl'}
        label={'Image'}
        value={currentPerson.imageUrl}
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
        id,
        name,
        description,
        imageUrl,
        placeByPlaceId {
          rowId,
          address,
        },
        ${UpdateUserMutation.getFragment('user')},
        ${DeleteUserMutation.getFragment('user')},
      }
    `,
  },
});

  /* not implemented yet
  handleDelete = () => {
    const {user} = this.props;
    const {router} = this.context;

    Relay.Store.commitUpdate(
      new DeleteUserMutation({user}), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      }
    );

    this.handleClose();

    localStorage.removeItem('id_token');
    localStorage.removeItem('user_uuid');
    router.replace('/');
  }
  */
