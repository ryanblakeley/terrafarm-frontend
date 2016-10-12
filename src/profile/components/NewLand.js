import React from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import FlatButton from 'material-ui/FlatButton';
import TextInput from '../../shared/components/TextInput';
import SaveNewLand from './SaveNewLand';

import classNames from '../styles/NewLandStylesheet.css';

class NewLand extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
    master: React.PropTypes.object,
    notifyClose: React.PropTypes.func,
  };
  state = {
    canSubmit: false,
    attributes: {
      name: '',
      size: '',
      location: '',
      description: '',
      image: '',
    },
    categoryIndex: null,
  };
  handleValid = () => {
    const currentValues = this.refs.form.getCurrentValues();
    const {name, size, location, description, image} = currentValues;

    this.setState({
      attributes: {
        name,
        size,
        location,
        description,
        image,
      },
      canSubmit: true,
    });
  }
  handleInvalid = () => {
    this.setState({canSubmit: false});
  }
  handleChange = (currentValues, isChanged) => {
    const {name, size, location, description, image} = currentValues;

    if (isChanged) {
      this.setState({
        attributes: {
          name,
          size,
          location,
          description,
          image,
        },
      });
    }
  }
  handleClose = () => {
    const {notifyClose} = this.props;
    if (notifyClose) notifyClose();
  }
  render () {
    const {master, user} = this.props;
    const {attributes, canSubmit} = this.state;

    return <div className={classNames.this} >
      <Formsy.Form
        ref={'form'}
        onValid={this.handleValid}
        onInvalid={this.handleInvalid}
      >
        <TextInput
          name={'name'}
          label={'Name'}
          validations={{matchRegexp: /[A-Za-z,\.0-9]*/}}
          required
        />
        <TextInput
          name={'size'}
          label={'Size'}
          validations={{matchRegexp: /[A-Za-z,0-9]*/, maxLength: 80}}
          required
        />
        <TextInput
          name={'location'}
          label={'Location'}
          validations={{matchRegexp: /[A-Za-z,0-9]*/}}
          required
        />
        <TextInput
          name={'description'}
          label={'Description'}
          validations={{matchRegexp: /[A-Za-z,\.0-9]*/, maxLength: 500}}
          required
          multiLine
          rows={3}
        />
        <TextInput
          name={'image'}
          label={'Image'}
          validations={'isUrl'}
        />
      </Formsy.Form>
      <div className={classNames.buttons}>
        <FlatButton
          label={'Cancel'}
          secondary
          onTouchTap={this.handleClose}
        />
        <SaveNewLand
          master={master}
          user={user}
          primary
          onComplete={this.handleClose}
          attributes={attributes}
          disabled={!canSubmit}
        />
      </div>
    </div>;
  }
}

export default Relay.createContainer(NewLand, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        ${SaveNewLand.getFragment('user')},
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        ${SaveNewLand.getFragment('master')},
      }
    `,
  },
});

