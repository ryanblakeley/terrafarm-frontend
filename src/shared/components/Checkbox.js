import React from 'react';
import FormsyCheckbox from 'formsy-material-ui/lib/FormsyCheckbox';

import classNames from '../styles/SelectInputStylesheet.css';

export default class SelectInput extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    style: React.PropTypes.object,
    label: React.PropTypes.string,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string, React.PropTypes.number,
    ]),
  };
  static defaultProps = {
    style: {
      fontFamily: 'Simonetta, serif',
    },
  };
  render () {
    return <div className={classNames.this}>
      <FormsyCheckbox
        name={this.props.name}
        style={this.props.style}
        label={this.props.label}
        value={this.props.value}
      />
    </div>;
  }
}

