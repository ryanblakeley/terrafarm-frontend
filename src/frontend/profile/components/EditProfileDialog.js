import React from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import Dialog from 'material-ui/lib/dialog';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';
import IoEdit from 'react-icons/lib/io/edit';
import TextInput from '../../shared/components/TextInput';
import SelectInput from '../../shared/components/SelectInput';
import UpdateProfile from './UpdateProfile';
import DeleteUser from './DeleteUser';

import classNames from '../styles/EditProfileDialogStylesheet.css';

class EditProfileDialog extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
  };
  state = {
    open: false,
    canSubmit: false,
    attributes: {
      name: '',
      location: '',
      description: '',
      image: '',
    },
  };
  handleOpen = () => {
    this.setState({open: true});
  }
  handleClose = () => {
    this.setState({open: false});
  }
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
  render () {
    const {user, master} = this.props;
    const {attributes, canSubmit, open} = this.state;
    const actions = [
      <DeleteUser
        master={master}
        user={user}
        default
        onComplete={this.handleClose}
      />,
      <FlatButton
        label={'Cancel'}
        secondary
        onTouchTap={this.handleClose}
      />,
      <UpdateProfile
        user={user}
        primary
        attributes={attributes}
        onComplete={this.handleClose}
        disabled={!canSubmit}
      />,
    ];

    return <div className={classNames.this}>
      <IconButton onTouchTap={this.handleOpen} >
        <IoEdit className={classNames.icon} />
      </IconButton>
      <Dialog
        title={'Edit Profile'}
        actions={actions}
        onRequestClose={null}
        open={open}
      >
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
          />
          <TextInput
            name={'location'}
            label={'Location'}
            initialValue={user.location}
            validations={{matchRegexp: /[A-Za-z,0-9]*/}}
          />
          <TextInput
            name={'description'}
            label={'Description'}
            initialValue={user.description}
            validations={{matchRegexp: /[A-Za-z,0-9]*/, maxLength: 500}}
          />
          <TextInput
            name={'image'}
            label={'Image'}
            placeholder={'http://i.imgur.com/GI2cAh6.jpg'}
            initialValue={user.image}
            validations={'isUrl'}
          />
        </Formsy.Form>
      </Dialog>
    </div>;
  }
}

export default Relay.createContainer(EditProfileDialog, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id,
        name,
        location,
        description,
        image,
        ${UpdateProfile.getFragment('user')},
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
