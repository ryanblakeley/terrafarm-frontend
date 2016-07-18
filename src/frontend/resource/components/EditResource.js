import React from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FlatButton from 'material-ui/lib/flat-button';
import TextInput from '../../shared/components/TextInput';
import SelectInput from '../../shared/components/SelectInput';
import SaveEditResource from './SaveEditResource';
import DeleteResource from './DeleteResource';

import classNames from '../styles/EditResourceStylesheet.css';

class EditResource extends React.Component {
  static propTypes = {
    master: React.PropTypes.object,
    user: React.PropTypes.object,
    resource: React.PropTypes.object,
    categories: React.PropTypes.array.isRequired,
    notifyClose: React.PropTypes.func,
  };
  static defaultProps = {
    categories: ['Equipment', 'Labor', 'Materials', 'Compost', 'Seeds'],
  };
  state = {
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
  handleClose = () => {
    const {notifyClose} = this.props;
    if (notifyClose) notifyClose();
  }
  render () {
    const {resource, categories, master, user} = this.props;
    const {attributes, canSubmit, categoryIndex} = this.state;
    const resourceCategories = categories.map((item, index) => <MenuItem
      key={item}
      value={index}
      primaryText={item}
    />);

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
          initialValue={resource.name}
          validations={{matchRegexp: /[A-Za-z,0-9]*/}}
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
          name={'description'}
          label={'Description'}
          initialValue={resource.description}
          validations={{matchRegexp: /[A-Za-z,0-9]*/, maxLength: 500}}
          multiLine
          maxRows={3}
        />
        <TextInput
          name={'image'}
          label={'Image'}
          initialValue={resource.image}
          validations={'isUrl'}
        />
      </Formsy.Form>
      <div className={classNames.buttons}>
        <DeleteResource
          resource={resource}
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
        <SaveEditResource
          resource={resource}
          primary
          attributes={attributes}
          onComplete={this.handleClose}
          disabled={!canSubmit}
        />
      </div>
    </div>;
  }
}

export default Relay.createContainer(EditResource, {
  fragments: {
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
        description,
        category,
        image,
        ${SaveEditResource.getFragment('resource')},
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
