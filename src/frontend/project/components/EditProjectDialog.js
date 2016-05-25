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
import UpdateProject from './UpdateProject';
import DeleteProject from './DeleteProject';

import classNames from '../styles/EditProjectDialogStylesheet.css';

class EditProjectDialog extends React.Component {
  static propTypes = {
    project: React.PropTypes.object,
    priorities: React.PropTypes.array.isRequired,
  };
  static defaultProps = {
    priorities: ['Low', 'Mid', 'High', 'Urgent', 'Hold'],
  };
  state = {
    open: false,
    canSubmit: false,
    attributes: {
      name: '',
      category: '',
    },
    categoryIndex: null,
  };
  componentWillMount () {
    const {project, priorities} = this.props;
    const categoryIndex = priorities.indexOf(project.category);

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
    const {name, categoryIndex} = currentValues;

    this.setState({
      attributes: {
        name,
        category: this.props.priorities[categoryIndex],
      },
      canSubmit: true,
    });
  }
  handleInvalid = () => {
    this.setState({canSubmit: false});
  }
  handleChange = (currentValues, isChanged) => {
    const {name, categoryIndex} = currentValues;

    if (isChanged) {
      this.setState({
        attributes: {
          name,
          category: this.props.priorities[categoryIndex],
        },
      });
    }
  }
  render () {
    const {project, priorities, master} = this.props;
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
    const projectPriorities = priorities.map((item, index) => {
      return <MenuItem key={item} value={index} primaryText={item} />;
    });

    return <div className={classNames.this}>
      <IconButton onTouchTap={this.handleOpen} >
        <IoEdit className={classNames.icon} />
      </IconButton>
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
            label={'Title'}
            initialValue={project.name}
            validations={{matchRegexp: /[A-Za-z,0-9]*/, maxLength: 500}}
          />
          <SelectInput
            name={'categoryIndex'}
            label={'Priority'}
            initialValue={categoryIndex}
            validations={'isNumeric,isExisty'}
            required
          >
            {projectPriorities}
          </SelectInput>
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

