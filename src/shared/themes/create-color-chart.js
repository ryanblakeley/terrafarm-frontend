import {
  brown400,
  cyan400,
  grey800,
  indigo400,
  orange400,
  red400,
} from 'material-ui/styles/colors';

export default function createColorChart (ids) {
  const colorOptions = [
    red400,
    cyan400,
    brown400,
    indigo400,
    orange400,
    grey800,
  ];
  const colorChart = {};

  if (ids.length) {
    ids.map((id, i) => (colorChart[id] = colorOptions[i]));
  }

  return colorChart;
}

