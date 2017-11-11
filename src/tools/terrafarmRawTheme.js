import { Spacing } from 'shared/components/Material';
import {
  fade,
  blueGrey50,
  blueGrey300,
  blueGrey500,
  blueGrey900,
  cyan700,
  indigo200,
  indigo500,
  indigo700,
  lightBlack,
} from './colors';

const terrafarmRawTheme = {
  spacing: Spacing,
  fontFamily: 'Overlock, sans-serif',
  palette: {
    primary1Color: blueGrey500,
    primary2Color: cyan700,
    primary3Color: lightBlack,
    accent1Color: indigo500,
    accent2Color: indigo200,
    accent3Color: indigo700,
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
  datePicker: {
    color: blueGrey500,
    textColor: blueGrey50,
    calendarTextColor: blueGrey900,
    selectColor: 'rgb(119, 204, 125)', // cyan700
    selectTextColor: blueGrey50,
    calendarYearBackgroundColor: blueGrey50,
    headerColor: blueGrey500,
  },
};

export default terrafarmRawTheme;
