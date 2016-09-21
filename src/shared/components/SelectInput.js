import React from 'react';
import {FormsySelect} from 'formsy-material-ui';
import Colors from 'material-ui/lib/styles/colors';

export default class SelectInput extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    style: React.PropTypes.object,
    label: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    initialValue: React.PropTypes.number,
    validations: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),
    required: React.PropTypes.bool,
    children: React.PropTypes.array,
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
    return (
      <FormsySelect
        name={this.props.name}
        style={this.props.style}
        floatingLabelStyle={{color: Colors.blueGrey900}}
        underlineFocusStyle={{borderColor: Colors.blueGrey900}}
        hintText={this.props.placeholder}
        floatingLabelText={this.props.label}
        value={this.props.initialValue}
        validations={this.props.validations}
        required={this.props.required}
      >
        {this.props.children}
      </FormsySelect>
    );
  }
}

