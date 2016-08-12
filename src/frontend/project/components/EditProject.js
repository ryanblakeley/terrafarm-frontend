import React from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import FlatButton from 'material-ui/lib/flat-button';
import MenuItem from 'material-ui/lib/menus/menu-item';
import TextInput from '../../shared/components/TextInput';
import SelectInput from '../../shared/components/SelectInput';
import SaveEditProject from './SaveEditProject';
import DeleteProject from './DeleteProject';

import classNames from '../styles/EditProjectStylesheet.css';

class EditProject extends React.Component {
  static propTypes = {
    master: React.PropTypes.object,
    project: React.PropTypes.object,
    categories: React.PropTypes.array.isRequired,
    notifyClose: React.PropTypes.func,
  };
  static defaultProps = {
    categories: ['Active', 'Paused', 'Urgent', 'Complete'],
  };
  state = {
    canSubmit: false,
    attributes: {
      name: '',
      category: '',
      description: '',
    },
    categoryIndex: null,
  };
  componentWillMount () {
    const {project, categories} = this.props;
    const categoryIndex = categories.indexOf(project.category);

    this.setState({categoryIndex});
  }
  handleValid = () => {
    const currentValues = this.refs.form.getCurrentValues();
    const {name, description, categoryIndex} = currentValues;

    this.setState({
      attributes: {
        name,
        description,
        category: this.props.categories[categoryIndex],
      },
      canSubmit: true,
    });
  }
  handleInvalid = () => {
    this.setState({canSubmit: false});
  }
  handleChange = (currentValues, isChanged) => {
    const {name, description, categoryIndex} = currentValues;

    if (isChanged) {
      this.setState({
        attributes: {
          name,
          description,
          category: this.props.categories[categoryIndex],
        },
      });
    }
  }
  handleClose = () => {
    const {notifyClose} = this.props;
    if (notifyClose) notifyClose();
  }
  render () {
    const {project, categories, master} = this.props;
    const {attributes, canSubmit, categoryIndex} = this.state;
    const projectCategories = categories.map((item, index) => <MenuItem
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
          initialValue={project.name}
          validations={{matchRegexp: /[A-Za-z,0-9]*/, maxLength: 500}}
        />
        <SelectInput
          name={'categoryIndex'}
          label={'Category'}
          initialValue={categoryIndex}
          validations={'isNumeric,isExisty'}
          required
        >
          {projectCategories}
        </SelectInput>
        <TextInput
          name={'description'}
          label={'Description'}
          initialValue={project.description}
          validations={{matchRegexp: /[A-Za-z,0-9]*/, maxLength: 500}}
          multiLine
          rows={3}
        />
      </Formsy.Form>
      <div className={classNames.buttons}>
        <DeleteProject
          project={project}
          master={master}
          default
          onComplete={this.handleClose}
        />
        <FlatButton
          label={'Cancel'}
          secondary
          onTouchTap={this.handleClose}
        />
        <SaveEditProject
          project={project}
          primary
          attributes={attributes}
          onComplete={this.handleClose}
          disabled={!canSubmit}
        />
      </div>
    </div>;
  }
}

export default Relay.createContainer(EditProject, {
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        id,
        name,
        category,
        description,
        ${SaveEditProject.getFragment('project')},
        ${DeleteProject.getFragment('project')},
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        id,
        ${DeleteProject.getFragment('master')},
      }
    `,
  },
});
