import React from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import Dialog from 'material-ui/lib/dialog';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';
import MdLandAdd from 'react-icons/lib/md/group-add';
import TextInput from '../../shared/components/TextInput';
import SelectInput from '../../shared/components/SelectInput';
import NewLand from './NewLand';

import classNames from '../styles/NewLandDialogStylesheet.css';

class NewLandDialog extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
    master: React.PropTypes.object,
    categories: React.PropTypes.array.isRequired,
  };
  static defaultProps = {
    categories: ['Yard', 'Vacant lot', 'Indoor', 'Rooftop'],
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
    const {name, location, description, categoryIndex, image} = currentValues;

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
    const {master, user, categories} = this.props;
    const {attributes, canSubmit, open, categoryIndex} = this.state;
    const actions = [
      <FlatButton
        label={'Cancel'}
        secondary
        onTouchTap={this.handleClose}
      />,
      <NewLand
        master={master}
        user={user}
        primary
        onComplete={this.handleClose}
        attributes={attributes}
        disabled={!canSubmit}
      />,
    ];
    const landCategories = categories.map((item, index) => {
      return <MenuItem key={item} value={index} primaryText={item} />;
    });

    return <div className={classNames.this} >
      <IconButton onTouchTap={this.handleOpen} >
        <MdLandAdd className={classNames.icon} />
      </IconButton>
      <Dialog
        title={'New Land'}
        actions={actions}
        onRequestClost={null}
        open={open}
      >
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
            name={'location'}
            label={'Location'}
            placeholder={'City, ST'}
            validations={{matchRegexp: /[A-Za-z,0-9]*/}}
            required
          />
          <TextInput
            name={'description'}
            label={'Description'}
            placeholder={'Overview of plot size, resource needs, rules, etc.'}
            validations={{matchRegexp: /[A-Za-z,\.0-9]*/, maxLength: 500}}
            required
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
            placeholder={'http://i.imgur.com/H9HLNjq.jpg'}
            validations={'isUrl'}
          />
        </Formsy.Form>
      </Dialog>
    </div>;
  }
}

export default Relay.createContainer(NewLandDialog, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        ${NewLand.getFragment('user')},
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        ${NewLand.getFragment('master')},
      }
    `,
  },
});

