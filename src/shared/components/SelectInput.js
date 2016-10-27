import React from 'react';
import FormsySelect from 'formsy-material-ui/lib/FormsySelect';
import {blueGrey900} from 'material-ui/styles/colors';

import classNames from '../styles/SelectInputStylesheet.css';

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
      fontFamily: 'Simonetta, serif',
    },
  };
  render () {
    return <div className={classNames.this}>
      <FormsySelect
        name={this.props.name}
        style={this.props.style}
        floatingLabelStyle={{color: blueGrey900}}
        underlineFocusStyle={{borderColor: blueGrey900}}
        hintText={this.props.placeholder}
        floatingLabelText={this.props.label}
        value={this.props.initialValue}
        validations={this.props.validations}
        required={this.props.required}
      >
        {this.props.children}
      </FormsySelect>
    </div>;
  }
}

