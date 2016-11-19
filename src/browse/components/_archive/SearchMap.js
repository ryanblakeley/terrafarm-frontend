import React from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import classNames from '../styles/SearchMapStylesheet.css';

const styles = {
  map: {
    width: '100%',
    height: '60vh',
  },
};

export class Container extends React.Component {
  static propTypes = {
    google: React.PropTypes.object,
    initialCenter: React.PropTypes.object,
    mapType: React.PropTypes.oneOf([
      'roadmap', 'satellite', 'hybrid', 'terrain',
    ]),
    places: React.PropTypes.arrayOf(React.PropTypes.shape({
      lat: React.PropTypes.number,
      lng: React.PropTypes.number,
    })),
  };
  static defaultProps = {
    google: window.google,
    initialCenter: {
      lat: 45,
      lng: -117,
    },
    mapType: 'terrain',
  };
  state = {
    zoom: 5,
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };
  handleMapClick = (mapProps, map, clickEvent) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  }
  handleMapMoved = (mapProps, map) => {
    // ...
  }
  handleMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  }
  handleMarkerMouseover = (props, marker, e) => {
    // ...
  }
  handleChangeMapCenter = () => {
    // ...
  }
  handleCurrentLocation = () => {
    // ...
    // this.handleChangeMapCenter(result point)
  }
  render () {
    const {google, initialCenter, mapType, places} = this.props;
    const {zoom} = this.state;

    console.log('places:', places);

    return <div className={classNames.this}>
      <Map
        google={google}
        zoom={zoom}
        initialCenter={initialCenter}
        mapType={mapType}
        onReady={this.fetchPlaces}
        visible
        onClick={this.handleMapClick}
        onDragend={this.handleMapMoved}
        containerStyle={styles.map}
      >
        {places.map((place, i) => <Marker
          name={place.name}
          position={place.position}
          key={i}
        />)}
      </Map>
    </div>;
  }
}

export default GoogleApiWrapper({ // eslint-disable-line
  apiKey: process.env.GOOGLE_MAPS_KEY,
})(Container);
