import React from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import {stringifyBounds} from '../../shared/utils/parse-coords';
import classNames from '../styles/BrowseMapStylesheet.css';

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
    searchResults: React.PropTypes.arrayOf(React.PropTypes.shape({
      rowId: React.PropTypes.string,
      url: React.PropTypes.string,
      name: React.PropTypes.string,
      coords: React.PropTypes.shape({
        lat: React.PropTypes.number,
        lng: React.PropTypes.number,
      }),
    })),
    setSearchParams: React.PropTypes.func,
  };
  static defaultProps = {
    google: window.google,
    initialCenter: {
      lat: 45,
      lng: -117,
    },
    mapType: 'terrain',
  };
  static contextTypes = {
    location: React.PropTypes.object,
  };
  state = {
    zoom: 3,
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    mapCenter: {
      lat: '',
      lng: '',
    },
    boundsChangedTimeoutId: null,
  };
  getBoundsString = rawBounds => {
    const boundsObj = {
      sw: {
        lat: rawBounds.getSouthWest().lat(),
        lng: rawBounds.getSouthWest().lng(),
      },
      ne: {
        lat: rawBounds.getNorthEast().lat(),
        lng: rawBounds.getNorthEast().lng(),
      },
    };
    const bounds = stringifyBounds(boundsObj);

    return bounds;
  }
  handleReady = (mapProps, map) => {
    const {google, setSearchParams} = this.props;
    let timeoutId = null;

    google.maps.event.addListener(map, 'bounds_changed', () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        const rawBounds = map.getBounds();
        const lat = map.center.lat();
        const lng = map.center.lng();
        const bounds = this.getBoundsString(rawBounds);

        setSearchParams({bounds, lat, lng});
      }, 100);
    });
  }
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
    console.log('hover marker, props:', props);
  }
  handleCurrentLocation = () => {
    // get users current location
    // this.changeMapCenter(result point)
  }
  changeMapCenter = coords => {
    const {setSearchParams} = this.props;

    setSearchParams({
      lat: coords.lat,
      lng: coords.lng,
    });
  }
  focusResultItem = itemId => {
    const {setSearchParams} = this.props;

    setSearchParams({
      focusedResultItemId: itemId,
    });

    // setSearchState for non-query related data
    // - focused item
    // - zoom
    // - center address
    // - center lat and lng
    // and keep query params in setSearchParams
    // - bounds
    // - search
    // - count
  }
  render () {
    const {google, initialCenter, mapType, searchResults} = this.props;
    const {location} = this.context;
    const {zoom} = this.state;
    const center = location.query.lat && location.query.lng
      ? { lat: location.query.lat, lng: location.query.lng }
      : initialCenter;

    return <div className={classNames.this}>
      <Map
        google={google}
        zoom={zoom}
        initialCenter={center}
        center={center}
        mapType={mapType}
        visible
        onReady={this.handleReady}
        onClick={this.handleMapClick}
        onDragend={this.handleMapMoved}
        containerStyle={styles.map}
      >
        {searchResults.map(result => <Marker
          name={result.name}
          position={result.coords}
          key={result.rowId}
        />)}
      </Map>
    </div>;
  }
}

export default GoogleApiWrapper({ // eslint-disable-line
  apiKey: process.env.GOOGLE_MAPS_KEY,
})(Container);
