import React from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import Dialog from 'material-ui/lib/dialog';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FlatButton from 'material-ui/lib/flat-button';
import TextInput from '../../shared/components/TextInput';
import SelectInput from '../../shared/components/SelectInput';
import UpdateProject from './UpdateProject';
import DeleteProject from './DeleteProject';

import classNames from '../styles/EditProjectDialogStylesheet.css';

class EditProjectDialog extends React.Component {
  static propTypes = {
    master: React.PropTypes.object,
    project: React.PropTypes.object,
    categories: React.PropTypes.array.isRequired,
  };
  static defaultProps = {
    categories: ['Hold', 'Ready', 'Urgent', 'Done'],
  };
  state = {
    open: false,
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
  handleOpen = () => {
    this.setState({open: true});
  }
  handleClose = () => {
    this.setState({open: false});
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
  render () {
    const {project, categories, master} = this.props;
    const {attributes, canSubmit, open, categoryIndex} = this.state;
    const actions = [
      <DeleteProject
        project={project}
        master={master}
        default
        onComplete={this.handleClose}
      />,
      <FlatButton
        label={'Cancel'}
        secondary
        onTouchTap={this.handleClose}
      />,
      <UpdateProject
        project={project}
        primary
        attributes={attributes}
        onComplete={this.handleClose}
        disabled={!canSubmit}
      />,
    ];
    const projectCategories = categories.map((item, index) => <MenuItem
      key={item}
      value={index}
      primaryText={item}
    />);

    return <div className={classNames.this}>
      <MenuItem primaryText={'Edit project'} onTouchTap={this.handleOpen} />
      <Dialog
        name={'Edit Project'}
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
      </Dialog>
    </div>;
  }
}

export default Relay.createContainer(EditProjectDialog, {
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        id,
        name,
        category,
        description,
        ${UpdateProject.getFragment('project')},
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

