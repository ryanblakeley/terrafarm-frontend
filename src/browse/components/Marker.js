// https://raw.githubusercontent.com/fullstackreact/google-maps-react/master/src/components/Marker.js
/* eslint prefer-const: 0, no-var: 0, react/prop-types: 0, consistent-return: 0 */
import React, { PropTypes as T } from 'react';

const camelize = str => (
  str.split(' ').map(word => (
    word.charAt(0).toUpperCase() + word.slice(1)
  )).join('')
);

const evtNames = ['click', 'mouseover', 'recenter', 'dragend'];

const wrappedPromise = () => {
  var result = {};
  var promise = new Promise((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
  });
  result.then = promise.then.bind(promise);
  result.catch = promise.catch.bind(promise);
  result.promise = promise;

  return result;
};

class Marker extends React.Component {

  componentDidMount () {
    this.markerPromise = wrappedPromise();
    this.renderMarker();
  }

  componentDidUpdate (prevProps) {
    if ((this.props.map !== prevProps.map)
      || (this.props.position !== prevProps.position)) {
      if (this.marker) {
        this.marker.setMap(null);
      }
      this.renderMarker();
    }
  }

  componentWillUnmount () {
    if (this.marker) {
      this.marker.setMap(null);
    }
  }

  getMarker () {
    return this.markerPromise;
  }

  handleEvent (evt) {
    return e => {
      const evtName = `on${camelize(evt)}`;
      if (this.props[evtName]) {
        this.props[evtName](this.props, this.marker, e);
      }
    };
  }

  renderMarker () {
    let { map, google, position, mapCenter, icon, label, draggable } = this.props;
    if (!google) {
      return null;
    }

    let pos = position || mapCenter;
    if (!(pos instanceof google.maps.LatLng)) {
      position = new google.maps.LatLng(pos.lat, pos.lng);
    }

    const pref = {
      map,
      position,
      icon,
      label,
      draggable,
    };
    this.marker = new google.maps.Marker(pref);

    evtNames.forEach(e => {
      this.marker.addListener(e, this.handleEvent(e));
    });

    this.markerPromise.resolve(this.marker);
  }

  render () {
    return null;
  }
}

Marker.propTypes = {
  position: T.object,
  map: T.object,
};

evtNames.forEach(e => (Marker.propTypes[e] = T.func));

Marker.defaultProps = {
  name: 'Marker',
};

export default Marker;
