import React from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import Dialog from 'material-ui/lib/dialog';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FlatButton from 'material-ui/lib/flat-button';
import TextInput from '../../shared/components/TextInput';
import SelectInput from '../../shared/components/SelectInput';
import UpdateResource from './UpdateResource';
import DeleteResource from './DeleteResource';

import classNames from '../styles/EditResourceDialogStylesheet.css';

class EditResourceDialog extends React.Component {
  static propTypes = {
    master: React.PropTypes.object,
    user: React.PropTypes.object,
    resource: React.PropTypes.object,
    categories: React.PropTypes.array.isRequired,
  };
  static defaultProps = {
    categories: ['Equipment', 'Labor', 'Materials', 'Compost', 'Seeds'],
  };
  state = {
    open: false,
    canSubmit: true,
    attributes: {
      name: '',
      description: '',
      category: '',
      image: '',
    },
    categoryIndex: null,
  };
  componentWillMount () {
    const {resource, categories} = this.props;
    const categoryIndex = categories.indexOf(resource.category);

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
    const {resource, categories, master, user} = this.props;
    const {attributes, canSubmit, open, categoryIndex} = this.state;
    const actions = [
      <DeleteResource
        resource={resource}
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
      <UpdateResource
        resource={resource}
        primary
        attributes={attributes}
        onComplete={this.handleClose}
        disabled={!canSubmit}
      />,
    ];
    const resourceCategories = categories.map((item, index) => <MenuItem
      key={item}
      value={index}
      primaryText={item}
    />);

    return <div className={classNames.this}>
      <MenuItem primaryText={'Edit resource'} onTouchTap={this.handleOpen} />
      <Dialog
        title={'Edit Resource'}
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
            initialValue={resource.name}
            validations={{matchRegexp: /[A-Za-z,0-9]*/}}
          />
          <TextInput
            name={'description'}
            label={'Description'}
            initialValue={resource.description}
            validations={{matchRegexp: /[A-Za-z,0-9]*/, maxLength: 500}}
            multiLine
            maxRows={3}
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
            placeholder={'http://i.imgur.com/q6apbuM.jpg'}
            initialValue={resource.image}
            validations={'isUrl'}
          />
        </Formsy.Form>
      </Dialog>
    </div>;
  }
}

export default Relay.createContainer(EditResourceDialog, {
  fragments: {
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
        description,
        category,
        image,
        ${UpdateResource.getFragment('resource')},
        ${DeleteResource.getFragment('resource')},
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        id,
        ${DeleteResource.getFragment('master')},
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        id,
        ${DeleteResource.getFragment('user')},
      }
    `,
  },
});

