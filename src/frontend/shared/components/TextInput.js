import React from 'react';
import {FormsyText} from 'formsy-material-ui';
import Colors from 'material-ui/lib/styles/colors';

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
  };
  static defaultProps = {
    required: false,
    style: {
      display: 'block',
      fontFamily: 'Simonetta, serif',
    },
  };
  render () {
    return (
      <FormsyText
        name={this.props.name}
        style={this.props.style}
        floatingLabelStyle={{color: Colors.blueGrey900}}
        underlineFocusStyle={{borderColor: Colors.blueGrey900}}
        hintText={this.props.placeholder}
        floatingLabelText={this.props.label}
        value={this.props.initialValue}
        validations={this.props.validations}
        required={this.props.required}
      />
    );
  }
}
