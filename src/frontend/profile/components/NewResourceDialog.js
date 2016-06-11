import React from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import Dialog from 'material-ui/lib/dialog';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FlatButton from 'material-ui/lib/flat-button';
// import IconButton from 'material-ui/lib/icon-button';
// import IoCube from 'react-icons/lib/io/cube';
import TextInput from '../../shared/components/TextInput';
import SelectInput from '../../shared/components/SelectInput';
import NewResource from './NewResource';

import classNames from '../styles/NewResourceDialogStylesheet.css';

class NewResourceDialog extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
    master: React.PropTypes.object,
    categories: React.PropTypes.array.isRequired,
  };
  static defaultProps = {
    categories: ['Equipment', 'Labor', 'Materials', 'Compost', 'Seeds'],
  };
  state = {
    open: false,
    canSubmit: false,
    attributes: {
      name: '',
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
    const {name, description, categoryIndex, image} = currentValues;

    this.setState({
      attributes: {
        name,
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
      <NewResource
        master={master}
        user={user}
        primary
        onComplete={this.handleClose}
        attributes={attributes}
        disabled={!canSubmit}
      />,
    ];
    const resourceCategories = categories.map((item, index) => <MenuItem
      key={item}
      value={index}
      primaryText={item}
    />);

    return <div className={classNames.this} >
      <MenuItem primaryText={'New'} onTouchTap={this.handleOpen} />
      <Dialog
        title={'New Resource'}
        actions={actions}
        onRequestClost={null}
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
            validations={{matchRegexp: /[A-Za-z,\.0-9]*/}}
            required
          />
          <TextInput
            name={'description'}
            label={'Description'}
            placeholder={'Overview of capacity, quantity, availability, skill level, etc.'}
            validations={{matchRegexp: /[A-Za-z,\.0-9]*/, maxLength: 500}}
            required
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
            {resourceCategories}
          </SelectInput>
          <TextInput
            name={'image'}
            label={'Image'}
            placeholder={'http://i.imgur.com/BV1NwFi.jpg'}
            validations={'isUrl'}
          />
        </Formsy.Form>
      </Dialog>
    </div>;
  }
}

export default Relay.createContainer(NewResourceDialog, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        ${NewResource.getFragment('user')},
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        ${NewResource.getFragment('master')},
      }
    `,
  },
});
