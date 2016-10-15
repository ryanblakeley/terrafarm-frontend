import React from 'react';
import {blueGrey900} from 'material-ui/styles/colors';
import FormsyText from 'formsy-material-ui/lib/FormsyText';

export default class TextInput extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    style: React.PropTypes.object,
    placeholder: React.PropTypes.string,
    label: React.PropTypes.string,
    validations: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),
    required: React.PropTypes.bool,
    initialValue: React.PropTypes.string,
    updateImmediately: React.PropTypes.bool,
  };
  static defaultProps = {
    required: false,
    style: {
      display: 'block',
      margin: '0 auto',
      fontFamily: 'Simonetta, serif',
    },
  };
  render () {
    const { updateImmediately, initialValue, ...rest } = this.props;

    return (
      <FormsyText
        {...rest}
        floatingLabelStyle={{color: blueGrey900}}
        underlineFocusStyle={{borderColor: blueGrey900}}
        hintText={this.props.placeholder}
        floatingLabelText={this.props.label}
        value={initialValue}
      />
    );
  }
}
