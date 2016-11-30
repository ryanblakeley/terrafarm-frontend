import React from 'react';
import Relay from 'react-relay';
import MenuItem from 'material-ui/MenuItem';
import ActionPanelForm from '../../shared/components/ActionPanelForm';
import Radio from '../../shared/components/Radio';
import RadioGroup from '../../shared/components/RadioGroup';
import SelectInput from '../../shared/components/SelectInput';
// import SelectInputItem from '../../shared/components/SelectInputItem';
import CreateOrganizationResourceMutation from '../../organization/mutations/CreateOrganizationResourceMutation';
import CreateTaskResourceMutation from '../../task/mutations/CreateTaskResourceMutation';

import classNames from '../styles/RequestResourceFormStylesheet.css';

class RequestResourceForm extends React.Component {
  static propTypes = {
    resource: React.PropTypes.object,
    currentPerson: React.PropTypes.object,
    notifyClose: React.PropTypes.func,
  };
  state = {
    submitFor: 'task',
    tasksToConsider: [],
    error: false,
  };
  componentWillMount () {
    const {currentPerson} = this.props;
    const {organizationMembersByMemberId, tasksByAuthorId} = currentPerson;
    this.setTasksToConsider(organizationMembersByMemberId, tasksByAuthorId);
  }
  setTasksToConsider (viaOrganizations, viaAuthor) {
    // concat tasks from organizations
    this.setState({
      tasksToConsider: viaAuthor.edges,
    });
  }
  submitForOrganization (data) {
    Relay.Store.commitUpdate(
      new CreateOrganizationResourceMutation({
        resource: this.props.resource,
        organization: data.organization,
        status: 'REQUESTED',
      }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      }
    );
  }
  submitForTask (data) {
    Relay.Store.commitUpdate(
      new CreateTaskResourceMutation({
        resource: this.props.resource,
        task: data.task,
        status: 'REQUESTED',
      }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      }
    );
  }
  handleSubmit = data => {
    if (this.state.submitFor === 'organization') {
      this.submitForOrganization(data);
    } else if (this.state.submitFor === 'task') {
      this.submitForTask(data);
    }
  }
  handleChange = (event, value) => {
    this.setState({submitFor: value});
  }
  handleSuccess = response => {
    this.props.notifyClose();
  }
  handleFailure = transaction => {
    const error = transaction.getError() || new Error('Mutation failed.');
    this.setState({ error: !!error });
  }
  render () {
    const {currentPerson, notifyClose} = this.props;
    const {submitFor, tasksToConsider, error} = this.state;
    const { organizationMembersByMemberId } = currentPerson;

    return <ActionPanelForm
      title={'Request Resource'}
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
      error={error}
    >
      <p className={classNames.text}>
        For:
      </p>
      <RadioGroup
        name={'submitFor'}
        defaultSelected={'task'}
        onChange={this.handleChange}
        required
      >
        <Radio value={'organization'} label={'Organization'} />
        <Radio value={'task'} label={'Task'} />
      </RadioGroup>
      {submitFor === 'organization'
        && <div>
          <SelectInput
            name={'organization'}
            label={'Organizations you are a member of'}
            required
          >
            {organizationMembersByMemberId.edges.map(edge => (
              <MenuItem
                value={edge.node.organizationByOrganizationId}
                key={edge.node.organizationByOrganizationId.rowId}
                primaryText={edge.node.organizationByOrganizationId.name}
              />
            ))}
          </SelectInput>
        </div>
      }
      {submitFor === 'task'
        && <div>
          <SelectInput
            name={'task'}
            label={'Tasks you created'}
            required
          >
            {tasksToConsider.map(edge => (
              <MenuItem
                value={edge.node}
                key={edge.node.rowId}
                primaryText={edge.node.name}
              />
            ))}
          </SelectInput>
        </div>
      }
    </ActionPanelForm>;
  }
}

export default Relay.createContainer(RequestResourceForm, {
  initialVariables: {
    resourceId: null,
  },
  fragments: {
    resource: () => Relay.QL`
      fragment on Resource {
        ${CreateOrganizationResourceMutation.getFragment('resource')},
        ${CreateTaskResourceMutation.getFragment('resource')},
      }
    `,
    currentPerson: () => Relay.QL`
      fragment on User {
        organizationMembersByMemberId(first: 5) {
          edges {
            node {
              organizationByOrganizationId {
                rowId,
                name,
                ${CreateOrganizationResourceMutation.getFragment('organization')},
              }
            }
          }
        },
        tasksByAuthorId(first: 10) {
          edges {
            node {
              rowId,
              name,
              ${CreateTaskResourceMutation.getFragment('task')},
            }
          }
        },
      }
    `,
  },
});
