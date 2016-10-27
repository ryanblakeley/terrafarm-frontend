import {
  blueGrey50,
  blueGrey300,
  blueGrey500,
  blueGrey900,
  cyan700,
  green200,
  green500,
  green700,
  lightBlack,
  orange100,
  orange200,
  orange300,
  orange400,
  orange500,
  orange600,
  orange700,
  orange800,
  orange900,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import Spacing from 'material-ui/styles/spacing';

const TerrafarmRawTheme = {
  spacing: Spacing,
  fontFamily: 'Overlock, sans-serif',
  palette: {
    primary1Color: blueGrey500,
    primary2Color: cyan700,
    primary3Color: lightBlack,
    accent1Color: green500,
    accent2Color: green200,
    accent3Color: green700,
    textColor: blueGrey900,
    alternateTextColor: blueGrey50,
    canvasColor: blueGrey50,
    borderColor: blueGrey300,
    disabledColor: fade(blueGrey900, 0.3),
  },
  tabs: {
    backgroundColor: blueGrey50,
    textColor: blueGrey500,
    selectedTextColor: blueGrey900,
  },
  menuItem: {
    dataHeight: 24,
    height: 28,
  },
};

export default TerrafarmRawTheme;
