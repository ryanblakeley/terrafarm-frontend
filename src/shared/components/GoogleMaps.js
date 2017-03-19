import React from 'react';
import {
  Map as Map0,
  InfoWindow as InfoWindow0,
  GoogleApiWrapper as GoogleApiWrapper0,
} from 'google-maps-react';

const Map = props => <Map0 {...props} />;
const InfoWindow = props => <InfoWindow0 {...props} />;
const GoogleApiWrapper = container => {
  const defaultOptions = {
    apiKey: process.env.GOOGLE_MAPS_KEY,
    version: process.env.GOOGLE_MAPS_VERSION,
  };
  return GoogleApiWrapper0(defaultOptions)(container);
};

const defaultPropTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
    React.PropTypes.object,
    React.PropTypes.array,
  ]),
};

Map.propTypes = Object.assign(defaultPropTypes, {
  icon: React.PropTypes.element,
});
InfoWindow.propTypes = Object.assign(defaultPropTypes, {});

export {Map, InfoWindow, GoogleApiWrapper};
