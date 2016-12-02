import React from 'react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import InfoWindowContent from './InfoWindowContent';
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
    setActiveResultItemId: React.PropTypes.func,
    activeResultItemId: React.PropTypes.string,
    setSearchParams: React.PropTypes.func,
  };
  static defaultProps = {
    google: window.google,
    initialCenter: {
      lat: 39.06637007877095,
      lng: -95.37890625,
    },
    mapType: 'terrain',
  };
  static contextTypes = {
    location: React.PropTypes.object,
  };
  state = {
    zoom: 4,
    showingInfoWindow: false,
    activeMarker: null,
    markers: [],
    infoName: '',
    mapCenter: {
      lat: '',
      lng: '',
    },
    boundsChangedTimeoutId: null,
    boundsListener: null,
  };
  componentWillMount () {
    const {searchResults, activeResultItemId} = this.props;
    this.prepareMarkers(searchResults, activeResultItemId);
  }
  componentWillReceiveProps (nextProps) {
    const {searchResults, activeResultItemId} = nextProps;
    this.prepareMarkers(searchResults, activeResultItemId);
  }
  componentWillUnmount () {
    const {google} = this.props;
    const {boundsListener} = this.state;
    google.maps.event.removeListener(boundsListener);
  }
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
  prepareMarkers (searchResults, activeId) {
    const markers = searchResults.map((result, i) => {
      const m = <Marker
        name={result.name}
        position={result.coords}
        onClick={this.handleMarkerClick}
        key={result.rowId}
        itemId={result.rowId}
        ref={elem => (this[`marker${result.rowId}`] = elem)}
      />;

      if (result.rowId === activeId) {
        this.setState({
          activeMarker: this[`marker${result.rowId}`].marker,
          infoName: result.name,
          showingInfoWindow: true,
        });
      }

      return m;
    });
    this.setState({markers});
  }
  handleReady = (mapProps, map) => {
    const {google, setSearchParams} = this.props;
    let timeoutId = null;

    const boundsListener = google.maps.event.addListener(map, 'bounds_changed', () => {
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
    this.setState({boundsListener});
  }
  handleMapClick = (mapProps, map, clickEvent) => {
    const {setActiveResultItemId} = this.props;
    const {showingInfoWindow} = this.state;

    if (showingInfoWindow) {
      setActiveResultItemId('');
      this.setState({
        activeMarker: null,
        showingInfoWindow: false,
        infoName: '',
      });
    }
  }
  handleMapMoved = (mapProps, map) => {
    // ...
  }
  handleMarkerClick = (props, marker, e) => {
    const {setActiveResultItemId} = this.props;

    setActiveResultItemId(props.itemId);
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true,
      infoName: props.name,
    });
  }
  handleMarkerMouseover = (props, marker, e) => {
    // console.log('hover marker, props:', props);
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
    const {google, initialCenter, mapType } = this.props;
    const {location} = this.context;
    const {zoom, markers, activeMarker, showingInfoWindow, infoName} = this.state;
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
        {markers}
        <InfoWindow marker={activeMarker} visible={showingInfoWindow} >
          <InfoWindowContent name={infoName} />
        </InfoWindow>
      </Map>
    </div>;
  }
}

export default GoogleApiWrapper({ // eslint-disable-line
  apiKey: process.env.GOOGLE_MAPS_KEY,
})(Container);
