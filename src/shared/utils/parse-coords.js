// input: '(100,-80)'
// output: {lat: 100, lng: -80}
export function parsePoint (coordsString) {
  let coords = coordsString.substring(1, coordsString.length - 1);
  coords = coords.split(',');
  coords = {
    lat: parseFloat(coords[0]),
    lng: parseFloat(coords[1]),
  };

  return coords;
}

// input: '((100,-80),(140,-40))'
// output: {sw:{lat: 100, lng: -80},ne:{lat: 140, lng: -40}}
export function parseBounds (boundsString) {
}

// input: {sw:{lat: 100, lng: -80},ne:{lat: 140, lng: -40}}
// output: '((100,-80),(140,-40))'
export function stringifyBounds (bounds) {
  const boundsString = `((${bounds.sw.lat},${bounds.sw.lng}),(${bounds.ne.lat},${bounds.ne.lng}))`;
  return boundsString;
}
