import { Spacing } from 'shared/components/Material';
import {
  fade,
  blueGrey50,
  blueGrey300,
  blueGrey500,
  blueGrey900,
  cyan700,
  red200,
  red500,
  red700,
  lightBlack,
} from './colors';

const terrafarmRawTheme = {
  spacing: Spacing,
  fontFamily: 'Overlock, sans-serif',
  palette: {
    primary1Color: blueGrey500,
    primary2Color: cyan700,
    primary3Color: lightBlack,
    accent1Color: red500,
    accent2Color: red200,
    accent3Color: red700,
    textColor: blueGrey900,
    alternateTextColor: blueGrey50,
    canvasColor: blueGrey50,
    borderColor: blueGrey300,
    disabledColor: fade(blueGrey900, 0.3),
  },
  menuItem: {
    dataHeight: 24,
    height: 28,
  },
  tabs: {
    backgroundColor: blueGrey50,
    textColor: blueGrey500,
    selectedTextColor: blueGrey900,
  },
};

export default terrafarmRawTheme;
