import React from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import TextInput from '../../shared/components/TextInput';
import SelectInput from '../../shared/components/SelectInput';
import SaveEditTask from './SaveEditTask';
import DeleteTask from './DeleteTask';

import classNames from '../styles/EditTaskStylesheet.css';

class EditTask extends React.Component {
  static propTypes = {
    master: React.PropTypes.object,
    task: React.PropTypes.object,
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
    const {task, categories} = this.props;
    const categoryIndex = categories.indexOf(task.category);

    this.setState({categoryIndex});
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
  handleClose = () => {
    const {notifyClose} = this.props;
    if (notifyClose) notifyClose();
  }
  render () {
    const {task, categories, master} = this.props;
    const {attributes, canSubmit, categoryIndex} = this.state;
    const taskStatus = categories.map((item, index) => <MenuItem
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
      <div className={classNames.buttons} >
        <DeleteTask
          task={task}
          master={master}
          default
          onComplete={this.handleClose}
        />
        <FlatButton
          label={'Cancel'}
          secondary
          onTouchTap={this.handleClose}
        />
        <SaveEditTask
          task={task}
          primary
          attributes={attributes}
          onComplete={this.handleClose}
          disabled={!canSubmit}
        />
      </div>
    </div>;
  }
}

export default Relay.createContainer(EditTask, {
  fragments: {
    task: () => Relay.QL`
      fragment on Task {
        id,
        name,
        category,
        description,
        ${SaveEditTask.getFragment('task')},
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

