import React from 'react';
import Relay from 'react-relay';
import MenuItem from 'material-ui/MenuItem';
import ActionPanelForm from '../../shared/components/ActionPanelForm';
import Radio from '../../shared/components/Radio';
import RadioGroup from '../../shared/components/RadioGroup';
import SelectInput from '../../shared/components/SelectInput';
// import SelectInputItem from '../../shared/components/SelectInputItem';
import CreateOrganizationResourceMutation from '../../organization/mutations/CreateOrganizationResourceMutation';
import CreateProjectResourceMutation from '../../project/mutations/CreateProjectResourceMutation';
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
    this.setProjectsToConsider(organizationMembersByMemberId);
  }
  setTasksToConsider (viaOrganizations, viaAuthor) {
    const tasksViaOrganizations = viaOrganizations
      .edges.reduce((accrue, current) => accrue.concat(
        current.node.organizationByOrganizationId.projectsByOrganizationId
          .edges.reduce((accrue2, current2) => accrue2.concat(
            current2.node.tasksByProjectId.edges
          ), [])
      ), []);
    const tasksViaAuthor = viaAuthor.edges.filter(edge => (
      tasksViaOrganizations.find(edge2 => edge2.node.rowId === edge.node.rowId) < 0
    ));

    this.setState({
      tasksToConsider: tasksViaOrganizations.concat(tasksViaAuthor),
    });
  }
  setProjectsToConsider (viaOrganizations) {
    const projectsViaOrganizations = viaOrganizations
      .edges.reduce((accrue, current) => accrue.concat(
        current.node.organizationByOrganizationId.projectsByOrganizationId.edges
      ), []);

    this.setState({
      projectsToConsider: projectsViaOrganizations,
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
  submitForProject (data) {
    Relay.Store.commitUpdate(
      new CreateProjectResourceMutation({
        resource: this.props.resource,
        project: data.project,
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
    } else if (this.state.submitFor === 'project') {
      this.submitForProject(data);
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
    const {submitFor, tasksToConsider, projectsToConsider, error} = this.state;
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
        <Radio value={'project'} label={'Project'} />
        <Radio value={'task'} label={'Task'} />
      </RadioGroup>
      {submitFor === 'organization'
        && <SelectInput
          name={'organization'}
          label={'Select an organization'}
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
      }
      {submitFor === 'project'
        && <SelectInput
          name={'project'}
          label={'Select a project'}
          required
        >
          {projectsToConsider.map(edge => <MenuItem
            value={edge.node}
            key={edge.node.rowId}
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
          {tasksToConsider.map(edge => (
            <MenuItem
              value={edge.node}
              key={edge.node.rowId}
              primaryText={edge.node.name}
            />
          ))}
        </SelectInput>
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
        ${CreateProjectResourceMutation.getFragment('resource')},
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
                projectsByOrganizationId(first: 8) {
                  edges {
                    node {
                      rowId,
                      name,
                      tasksByProjectId(first: 5) {
                        edges {
                          node {
                            rowId,
                            name,
                            ${CreateTaskResourceMutation.getFragment('task')},
                          }
                        }
                      },
                      ${CreateProjectResourceMutation.getFragment('project')},
                    }
                  }
                },
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
