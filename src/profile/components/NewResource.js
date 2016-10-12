import React from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import TextInput from '../../shared/components/TextInput';
import SelectInput from '../../shared/components/SelectInput';
import SaveNewResource from './SaveNewResource';

import classNames from '../styles/NewResourceStylesheet.css';

class NewResource extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
    master: React.PropTypes.object,
    categories: React.PropTypes.array.isRequired,
    notifyClose: React.PropTypes.func,
  };
  static defaultProps = {
    categories: ['Equipment', 'Labor', 'Materials', 'Compost', 'Seeds'],
  };
  state = {
    canSubmit: false,
    attributes: {
      name: '',
      description: '',
      category: '',
      image: '',
    },
    categoryIndex: null,
  };
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
    const {master, user, categories} = this.props;
    const {attributes, canSubmit, categoryIndex} = this.state;
    const resourceCategories = categories.map((item, index) => <MenuItem
      key={item}
      value={index}
      primaryText={item}
    />);

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
          validations={{matchRegexp: /[A-Za-z,\.0-9]*/}}
          required
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
        <SaveNewResource
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

export default Relay.createContainer(NewResource, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        ${SaveNewResource.getFragment('user')},
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        ${SaveNewResource.getFragment('master')},
      }
    `,
  },
});
