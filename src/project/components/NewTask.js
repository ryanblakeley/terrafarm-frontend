import React from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import TextInput from '../../shared/components/TextInput';
import SelectInput from '../../shared/components/SelectInput';
import SaveNewTask from './SaveNewTask';

import classNames from '../styles/NewTaskStylesheet.css';

class NewTask extends React.Component {
  static propTypes = {
    master: React.PropTypes.object,
    project: React.PropTypes.object,
    categories: React.PropTypes.array.isRequired,
    notifyClose: React.PropTypes.func,
  };
  static defaultProps = {
    categories: ['Active', 'Paused', 'Urgent'],
  };
  state = {
    canSubmit: false,
    attributes: {
      name: '',
      description: '',
      category: '',
    },
    categoryIndex: null,
  };
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
    const {master, project, categories} = this.props;
    const {attributes, canSubmit, categoryIndex} = this.state;
    const taskCategories = categories.map((item, index) => <MenuItem
      key={item}
      value={index}
      primaryText={item}
    />);

    return <div className={classNames.this} >
      <Formsy.Form
        ref={'form'}
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
          {taskCategories}
        </SelectInput>
        <TextInput
          name={'description'}
          label={'Description'}
          validations={{matchRegexp: /[A-Za-z,\.0-9]*/, maxLength: 500}}
          required
          multiLine
          rows={3}
        />
      </Formsy.Form>
      <div className={classNames.buttons}>
        <FlatButton
          label={'Cancel'}
          secondary
          onTouchTap={this.handleClose}
        />
        <SaveNewTask
          project={project}
          master={master}
          primary
          onComplete={this.handleClose}
          attributes={attributes}
          disabled={!canSubmit}
        />
      </div>
    </div>;
  }
}

export default Relay.createContainer(NewTask, {
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        ${SaveNewTask.getFragment('project')},
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        ${SaveNewTask.getFragment('master')},
      }
    `,
  },
});
