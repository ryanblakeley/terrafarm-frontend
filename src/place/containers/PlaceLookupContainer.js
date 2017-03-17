import React from 'react';
import Relay from 'react-relay';
import CreatePlaceMutation from '../mutations/CreatePlaceMutation';

class PlaceLookupContainer extends React.Component {
  static propTypes = {
    relay: React.PropTypes.object,
    place: React.PropTypes.object,
    parentPath: React.PropTypes.string,
  };
  static contextTypes = {
    router: React.PropTypes.object,
    location: React.PropTypes.object,
  };
  state = {
    error: React.PropTypes.string,
  };
  componentDidMount () {
    const {place, relay} = this.props;
    const {location} = this.context;
    const placeData = location.state && location.state.placeData;

    if (place) {
      console.log('Place already exists.');
      this.handleSuccess({
        createPlace: {
          place: placeData,
        },
      });
      return;
    }

    relay.commitUpdate(
      new CreatePlaceMutation({ placeData }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      },
    );
  }
  handleSuccess = response => {
    const {router, location} = this.context;

    router.replace({
      pathname: location.pathname.substring(0,
        location.pathname.indexOf('/place-lookup')),
      state: {
        placeData: response.createPlace.place,
        placeStatus: 'READY',
      },
    });
  }
  handleFailure = transaction => {
    console.error('Error: create place failed.');
    const error = transaction.getError() || new Error('Mutation failed.');
    this.setState({ error: !!error });
  }
  render () {
    return null;
  }
}

export default Relay.createContainer(PlaceLookupContainer, {
  initialVariables: {
    placeId: null,
  },
  fragments: {
    place: () => Relay.QL`
      fragment on Place {
        id,
        rowId,
      }
    `,
  },
});
