import React from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import SelectInput from '../../shared/components/SelectInput';
import CreateOrganizationResourceMutation from '../../organization/mutations/CreateOrganizationResourceMutation';
import CreateProjectResourceMutation from '../../project/mutations/CreateProjectResourceMutation';
import CreateTaskResourceMutation from '../../task/mutations/CreateTaskResourceMutation';

import classNames from '../styles/RequestResourceFormStylesheet.css';

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

class RequestObjectiveForm extends React.Component {
  static propTypes = {
    resource: React.PropTypes.object,
    query: React.PropTypes.object,
    notifyClose: React.PropTypes.func,
  };
  static contextTypes = {
    router: React.PropTypes.object,
  };
  state = {
    canSubmit: false,
    submitFor: 'task',
  };
  handleValid = () => {
    this.setState({ canSubmit: true });
  }
  handleInvalid = () => {
    this.setState({ canSubmit: false });
  }
  handleClose = () => {
    const {notifyClose} = this.props;
    if (notifyClose) notifyClose();
  }
  handleFormError = data => {
    console.error('Form error:', data);
  }
  handleSubmit = data => {
    if (!this.state.canSubmit) {
      console.warn('Form is not valid');
      return;
    }

    if (this.state.submitFor === 'organization') {
      this.submitForOrganization(data);
    } else if (this.state.submitFor === 'project') {
      this.submitForProject(data);
    } else if (this.state.submitFor === 'task') {
      this.submitForTask(data);
    }

    this.handleClose();
  }
  submitForOrganization (data) {
    Relay.Store.commitUpdate(
      new CreateOrganizationResourceMutation({
        resource: this.props.resource,
        organization: data.organization,
        status: 'REQUESTED',
      })
    );
  }
  submitForProject (data) {
    Relay.Store.commitUpdate(
      new CreateProjectResourceMutation({
        resource: this.props.resource,
        project: data.project,
        status: 'REQUESTED',
      })
    );
  }
  submitForTask (data) {
    Relay.Store.commitUpdate(
      new CreateTaskResourceMutation({
        resource: this.props.resource,
        task: data.task,
        status: 'REQUESTED',
      })
    );
  }
  handleChange = (event, value) => {
    this.setState({submitFor: value});
  }
  render () {
    const {query} = this.props;
    const {canSubmit, submitFor} = this.state;

    return <div className={classNames.this} >
      <Formsy.Form
        onValid={this.handleValid}
        onInvalid={this.handleInvalid}
        onValidSubmit={this.handleSubmit}
        onInvalidSubmit={this.handleFormError}
      >
        <RadioButtonGroup
          name={'submitFor'}
          defaultSelected={'task'}
          onChange={this.handleChange}
          className={classNames.radioButtonGroup}
        >
          <RadioButton
            value={'organization'}
            label={'Organization'}
            style={styles.radioButton}
          />
          <RadioButton
            value={'project'}
            label={'Project'}
            style={styles.radioButton}
          />
          <RadioButton
            value={'task'}
            label={'Task'}
            style={styles.radioButton}
          />
        </RadioButtonGroup>
        {submitFor === 'organization'
          && <SelectInput
            name={'organization'}
            label={'Select an organization'}
            required
          >
            {query.allOrganizations.edges.map(edge => <MenuItem
              value={edge.node}
              key={edge.node.id}
              primaryText={edge.node.name}
            />)}
          </SelectInput>
        }
        {submitFor === 'project'
          && <SelectInput
            name={'project'}
            label={'Select a project'}
            required
          >
            {query.allProjects.edges.map(edge => <MenuItem
              value={edge.node}
              key={edge.node.id}
              primaryText={edge.node.name}
            />)}
          </SelectInput>
        }
        {submitFor === 'task'
          && <SelectInput
            name={'task'}
            label={'Select a task'}
            required
          >
            {query.allTasks.edges.map(edge => <MenuItem
              value={edge.node}
              key={edge.node.id}
              primaryText={edge.node.name}
            />)}
          </SelectInput>
        }
        <div className={classNames.buttons}>
          <FlatButton
            label={'Cancel'}
            secondary
            onTouchTap={this.handleClose}
          />
          <RaisedButton
            label={'Save'}
            primary
            type={'submit'}
            disabled={!canSubmit}
          />
        </div>
      </Formsy.Form>
    </div>;
  }
}

export default Relay.createContainer(RequestObjectiveForm, {
  fragments: {
    resource: () => Relay.QL`
      fragment on Resource {
        ${CreateOrganizationResourceMutation.getFragment('resource')},
        ${CreateProjectResourceMutation.getFragment('resource')},
        ${CreateTaskResourceMutation.getFragment('resource')},
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        allOrganizations(first: 10) {
          edges {
            node {
              id,
              name,
              ${CreateOrganizationResourceMutation.getFragment('organization')},
            }
          }
        },
        allProjects(first: 10) {
          edges {
            node {
              id,
              name,
              ${CreateProjectResourceMutation.getFragment('project')},
            }
          }
        },
        allTasks(first: 10) {
          edges {
            node {
              id,
              name,
              ${CreateTaskResourceMutation.getFragment('task')},
            }
          }
        },
      }
    `,
  },
});
