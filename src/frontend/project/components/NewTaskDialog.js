import React from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import Dialog from 'material-ui/lib/dialog';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FlatButton from 'material-ui/lib/flat-button';
import TextInput from '../../shared/components/TextInput';
import SelectInput from '../../shared/components/SelectInput';
import NewTask from './NewTask';

import classNames from '../styles/NewTaskDialogStylesheet.css';

class NewTaskDialog extends React.Component {
  static propTypes = {
    project: React.PropTypes.object,
    master: React.PropTypes.object,
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
      description: '',
      category: '',
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
    const {master, project, categories} = this.props;
    const {attributes, canSubmit, open, categoryIndex} = this.state;
    const actions = [
      <FlatButton
        label={'Cancel'}
        secondary
        onTouchTap={this.handleClose}
      />,
      <NewTask
        project={project}
        master={master}
        primary
        onComplete={this.handleClose}
        attributes={attributes}
        disabled={!canSubmit}
      />,
    ];
    const taskCategories = categories.map((item, index) => <MenuItem
      key={item}
      value={index}
      primaryText={item}
    />);

    return <div className={classNames.this} >
      <MenuItem primaryText={'New task'} onTouchTap={this.handleOpen} />
      <Dialog
        title={'New Task'}
        actions={actions}
        onRequestClost={null}
        open={open}
      >
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
          <TextInput
            name={'description'}
            label={'Description'}
            placeholder={'Overview of task specification.'}
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
            {taskCategories}
          </SelectInput>
        </Formsy.Form>
      </Dialog>
    </div>;
  }
}

export default Relay.createContainer(NewTaskDialog, {
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        ${NewTask.getFragment('project')},
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        ${NewTask.getFragment('master')},
      }
    `,
  },
});

