import React from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import Dialog from 'material-ui/lib/dialog';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FlatButton from 'material-ui/lib/flat-button';
import TextInput from '../../shared/components/TextInput';
import SelectInput from '../../shared/components/SelectInput';
import UpdateTask from './UpdateTask';
import DeleteTask from './DeleteTask';

import classNames from '../styles/EditTaskDialogStylesheet.css';

class EditTaskDialog extends React.Component {
  static propTypes = {
    master: React.PropTypes.object,
    task: React.PropTypes.object,
    categories: React.PropTypes.array.isRequired,
  };
  static defaultProps = {
    categories: ['Hold', 'Ready', 'Blocked', 'Urgent', 'Done'],
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
    const {task, categories} = this.props;
    const categoryIndex = categories.indexOf(task.category);

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
    const {name, categoryIndex, description} = currentValues;

    this.setState({
      attributes: {
        name,
        category: this.props.categories[categoryIndex],
        description,
      },
      canSubmit: true,
    });
  }
  handleInvalid = () => {
    this.setState({canSubmit: false});
  }
  handleChange = (currentValues, isChanged) => {
    const {name, categoryIndex, description} = currentValues;

    if (isChanged) {
      this.setState({
        attributes: {
          name,
          category: this.props.categories[categoryIndex],
          description,
        },
      });
    }
  }
  render () {
    const {task, categories, master} = this.props;
    const {attributes, canSubmit, open, categoryIndex} = this.state;
    const actions = [
      <DeleteTask
        task={task}
        master={master}
        default
        onComplete={this.handleClose}
      />,
      <FlatButton
        label={'Cancel'}
        secondary
        onTouchTap={this.handleClose}
      />,
      <UpdateTask
        task={task}
        primary
        attributes={attributes}
        onComplete={this.handleClose}
        disabled={!canSubmit}
      />,
    ];
    const taskStatus = categories.map((item, index) => <MenuItem
      key={item}
      value={index}
      primaryText={item}
    />);

    return <div className={classNames.this}>
      <MenuItem primaryText={'Edit task'} onTouchTap={this.handleOpen} />
      <Dialog
        name={'Edit Task'}
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
            initialValue={task.name}
            validations={{matchRegexp: /[A-Za-z,0-9]*/, maxLength: 50}}
          />
          <SelectInput
            name={'categoryIndex'}
            label={'Category'}
            initialValue={categoryIndex}
            validations={'isNumeric,isExisty'}
            required
          >
            {taskStatus}
          </SelectInput>
          <TextInput
            name={'description'}
            label={'Description'}
            initialValue={task.description}
            validations={{matchRegexp: /[A-Za-z,0-9]*/, maxLength: 500}}
            multiLine
            rows={3}
          />
        </Formsy.Form>
      </Dialog>
    </div>;
  }
}

export default Relay.createContainer(EditTaskDialog, {
  fragments: {
    task: () => Relay.QL`
      fragment on Task {
        id,
        name,
        category,
        description,
        ${UpdateTask.getFragment('task')},
        ${DeleteTask.getFragment('task')},
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        id,
        ${DeleteTask.getFragment('master')},
      }
    `,
  },
});

