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
import UpdateLand from './UpdateLand';
import DeleteLand from './DeleteLand';

import classNames from '../styles/EditLandDialogStylesheet.css';

class EditLandDialog extends React.Component {
  static propTypes = {
    master: React.PropTypes.object,
    land: React.PropTypes.object,
    user: React.PropTypes.object,
    categories: React.PropTypes.array.isRequired,
  };
  static defaultProps = {
    categories: ['Farm', 'Private Yard', 'Shared Lot', 'School'],
  };
  state = {
    open: false,
    canSubmit: false,
    attributes: {
      name: '',
      location: '',
      description: '',
      category: '',
      image: '',
    },
    categoryIndex: null,
  };
  componentWillMount () {
    const {land, categories} = this.props;
    const categoryIndex = categories.indexOf(land.category);

    this.setState({categoryIndex});
  }
  handleOpen = () => {
    this.setState({open: true});
  }
  handleClose = () => {
    this.setState({open: false});
  }
  handleValid = () => {
    const currentValues = this.refs.form.getCurrentValues();
    const {name, location, description, categoryIndex, image} = currentValues;

    this.setState({
      attributes: {
        name,
        location,
        description,
        category: this.props.categories[categoryIndex],
        image,
      },
      canSubmit: true,
    });
  }
  handleInvalid = () => {
    this.setState({canSubmit: false});
  }
  handleChange = (currentValues, isChanged) => {
    const {name, description, categoryIndex, image} = currentValues;

    if (isChanged) {
      this.setState({
        attributes: {
          name,
          location,
          description,
          category: this.props.categories[categoryIndex],
          image,
        },
      });
    }
  }
  render () {
    const {land, categories, master, user} = this.props;
    const {attributes, canSubmit, open, categoryIndex} = this.state;
    const actions = [
      <DeleteLand
        land={land}
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
      <UpdateLand
        land={land}
        primary
        attributes={attributes}
        onComplete={this.handleClose}
        disabled={!canSubmit}
      />,
    ];
    const landCategories = categories.map((item, index) => <MenuItem
      key={item}
      value={index}
      primaryText={item}
    />);

    return <div className={classNames.this}>
      <IconButton onTouchTap={this.handleOpen} >
        <IoEdit className={classNames.icon} />
      </IconButton>
      <Dialog
        title={'Edit Land'}
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
            initialValue={land.name}
            validations={{matchRegexp: /[A-Za-z,0-9]*/}}
          />
          <TextInput
            name={'location'}
            label={'Location'}
            initialValue={land.location}
            validations={{matchRegexp: /[A-Za-z,0-9]*/}}
          />
          <TextInput
            name={'description'}
            label={'Descriptions'}
            initialValue={land.description}
            validations={{matchRegexp: /[A-Za-z,0-9]*/, maxLength: 500}}
            multiLine
            rows={3}
          />
          <SelectInput
            name={'categoryIndex'}
            label={'Category'}
            initialValue={categoryIndex}
            validations={'isNumeric,isExisty'}
            required
          >
            {landCategories}
          </SelectInput>
          <TextInput
            name={'image'}
            label={'Image'}
            placeholder={'http://i.imgur.com/GI2cAh6.jpg'}
            initialValue={land.image}
            validations={'isUrl'}
          />
        </Formsy.Form>
      </Dialog>
    </div>;
  }
}

export default Relay.createContainer(EditLandDialog, {
  fragments: {
    land: () => Relay.QL`
      fragment on Land {
        id,
        name,
        location,
        description,
        category,
        image,
        ${UpdateLand.getFragment('land')},
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

