import React from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import FlatButton from 'material-ui/lib/flat-button';
import TextInput from '../../shared/components/TextInput';
import SaveEditProfile from './SaveEditProfile';
import DeleteUser from './DeleteUser';

import classNames from '../styles/EditProfileStylesheet.css';

class EditProfile extends React.Component {
  static propTypes = {
    master: React.PropTypes.object,
    user: React.PropTypes.object,
    notifyClose: React.PropTypes.func,
  };
  state = {
    canSubmit: false,
    attributes: {
      name: '',
      location: '',
      description: '',
      image: '',
    },
  };
  handleValid = () => {
    const currentValues = this.refs.form.getCurrentValues();
    const {name, location, description, image} = currentValues;

    this.setState({
      attributes: {
        name,
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
    const {name, location, description, image} = currentValues;

    if (isChanged) {
      this.setState({
        attributes: {
          name,
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
    const {user, master} = this.props;
    const {attributes, canSubmit} = this.state;

    return <div className={classNames.this}>
      <Formsy.Form
        ref={'form'}
        onChange={this.handleChange}
        onValid={this.handleValid}
        onInvalid={this.handleInvalid}
      >
        <TextInput
          name={'name'}
          label={'Name'}
          initialValue={user.name}
          validations={{matchRegexp: /[A-Za-z,0-9]*/}}
          className={classNames.input}
        />
        <TextInput
          name={'location'}
          label={'Location'}
          initialValue={user.location}
          validations={{matchRegexp: /[A-Za-z,0-9]*/}}
          className={classNames.input}
        />
        <TextInput
          name={'description'}
          label={'Description'}
          initialValue={user.description}
          validations={{matchRegexp: /[A-Za-z,0-9]*/, maxLength: 500}}
          multiLine
          rows={3}
          className={classNames.input}
        />
        <TextInput
          name={'image'}
          label={'Image'}
          initialValue={user.image}
          validations={'isUrl'}
          className={classNames.input}
        />
      </Formsy.Form>
      <div className={classNames.buttons} >
        <DeleteUser
          master={master}
          user={user}
          default
          onComplete={this.handleClose}
        />
        <FlatButton
          label={'Cancel'}
          secondary
          onTouchTap={this.handleClose}
        />
        <SaveEditProfile
          user={user}
          primary
          attributes={attributes}
          onComplete={this.handleClose}
          disabled={!canSubmit}
        />
      </div>
    </div>;
  }
}

export default Relay.createContainer(EditProfile, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id,
        name,
        location,
        description,
        image,
        ${SaveEditProfile.getFragment('user')},
        ${DeleteUser.getFragment('user')},
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        id,
        ${DeleteUser.getFragment('master')},
      }
    `,
  },
});
