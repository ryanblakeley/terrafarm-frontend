import React from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import Dialog from 'material-ui/lib/dialog';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';
import MdEdit from 'react-icons/lib/md/edit';
import TextInput from '../../shared/components/TextInput';
import SelectInput from '../../shared/components/SelectInput';
import UpdateGroup from './UpdateGroup';

import classNames from '../styles/EditGroupDialogStylesheet.css';

class EditGroupDialog extends React.Component {
  static propTypes = {
    group: React.PropTypes.object,
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
  componentWillMount () {
    const {group, categories} = this.props;
    const categoryIndex = categories.indexOf(group.category);

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
    const {group, categories} = this.props;
    const {attributes, canSubmit, open, categoryIndex} = this.state;
    const actions = [
      <FlatButton
        label={'Cancel'}
        secondary
        onTouchTap={this.handleClose}
      />,
      <UpdateGroup
        group={group}
        primary
        attributes={attributes}
        onComplete={this.handleClose}
        disabled={!canSubmit}
      />,
    ];
    const groupCategories = categories.map((item, index) => {
      return <MenuItem key={item} value={index} primaryText={item} />;
    });

    return <div className={classNames.this}>
      <IconButton onTouchTap={this.handleOpen} >
        <MdEdit className={classNames.icon} />
      </IconButton>
      <Dialog
        title={'Edit Group'}
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
            initialValue={group.name}
            validations={{matchRegexp: /[A-Za-z,0-9]*/}}
          />
          <TextInput
            name={'location'}
            label={'Location'}
            initialValue={group.location}
            validations={{matchRegexp: /[A-Za-z,0-9]*/}}
          />
          <TextInput
            name={'description'}
            label={'Description'}
            initialValue={group.description}
            validations={{matchRegexp: /[A-Za-z,0-9]*/, maxLength: 500}}
          />
          <SelectInput
            name={'categoryIndex'}
            label={'Category'}
            initialValue={categoryIndex}
            validations={'isNumeric,isExisty'}
            required
          >
            {groupCategories}
          </SelectInput>
          <TextInput
            name={'image'}
            label={'Image'}
            placeholder={'http://i.imgur.com/GI2cAh6.jpg'}
            initialValue={group.image}
            validations={'isUrl'}
          />
        </Formsy.Form>
      </Dialog>
    </div>;
  }
}

export default Relay.createContainer(EditGroupDialog, {
  fragments: {
    group: () => Relay.QL`
      fragment on Group {
        id,
        name,
        location,
        description,
        category,
        image,
        ${UpdateGroup.getFragment('group')},
      }
    `,
  },
});

