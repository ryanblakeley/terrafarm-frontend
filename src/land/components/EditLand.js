import React from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import FlatButton from 'material-ui/lib/flat-button';
import TextInput from '../../shared/components/TextInput';
import SaveEditLand from './SaveEditLand';
import DeleteLand from './DeleteLand';

import classNames from '../styles/EditLandStylesheet.css';

class EditLand extends React.Component {
  static propTypes = {
    master: React.PropTypes.object,
    land: React.PropTypes.object,
    user: React.PropTypes.object,
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
    const {land, master, user} = this.props;
    const {attributes, canSubmit} = this.state;

    return <div className={classNames.this} >
      <Formsy.Form
        ref={'form'}
        onChange={this.handleChange}
        onValid={this.handleValid}
        onInvalid={this.handleInvalid}
      >
        <TextInput
          name={'name'}
          label={'Name'}
          initialValue={land.name}
          validations={{matchRegexp: /[A-Za-z,0-9]*/}}
        />
        <TextInput
          name={'size'}
          label={'Size'}
          initialValue={land.size}
          validations={{matchRegexp: /[A-Za-z,0-9]*/, maxLength: 80}}
          required
        />
        <TextInput
          name={'location'}
          label={'Location'}
          initialValue={land.location}
          validations={{matchRegexp: /[A-Za-z,0-9]*/}}
        />
        <TextInput
          name={'description'}
          label={'Description'}
          initialValue={land.description}
          validations={{matchRegexp: /[A-Za-z,0-9]*/, maxLength: 500}}
          multiLine
          rows={3}
        />
        <TextInput
          name={'image'}
          label={'Image'}
          initialValue={land.image}
          validations={'isUrl'}
        />
      </Formsy.Form>
      <div className={classNames.buttons} >
        <DeleteLand
          land={land}
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
        <SaveEditLand
          land={land}
          primary
          attributes={attributes}
          onComplete={this.handleClose}
          disabled={!canSubmit}
        />
      </div>
    </div>;
  }
}

export default Relay.createContainer(EditLand, {
  fragments: {
    land: () => Relay.QL`
      fragment on Land {
        id,
        name,
        location,
        description,
        size,
        image,
        ${SaveEditLand.getFragment('land')},
        ${DeleteLand.getFragment('land')},
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        id,
        ${DeleteLand.getFragment('master')},
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        id,
        ${DeleteLand.getFragment('user')},
      }
    `,
  },
});
