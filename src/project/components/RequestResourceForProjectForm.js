import React from 'react';
import Relay from 'react-relay';
import MenuItem from 'material-ui/MenuItem';
import ActionPanelForm from '../../shared/components/ActionPanelForm';
import SelectInput from '../../shared/components/SelectInput';
// import SelectInputItem from '../../shared/components/SelectInputItem';
import CreateProjectResourceMutation from '../mutations/CreateProjectResourceMutation';

class RequestResourceForProjectForm extends React.Component {
  static propTypes = {
    project: React.PropTypes.object,
    currentPerson: React.PropTypes.object,
    notifyClose: React.PropTypes.func,
  };
  state = {
    error: false,
  };
  handleSubmit = data => {
    const {project} = this.props;

    Relay.Store.commitUpdate(
      new CreateProjectResourceMutation({
        project,
        resource: data.resource,
        status: 'REQUESTED',
      }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      }
    );
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
    const { error } = this.state;

    return <ActionPanelForm
      title={'Request Resource'}
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
      error={error}
    >
      <SelectInput
        name={'resource'}
        label={'Resources you starred'}
        required
      >
        {currentPerson.resourceStarsByUserId.edges.map(edge => <MenuItem
          value={edge.node.resourceByResourceId}
          key={edge.node.resourceByResourceId.id}
          primaryText={edge.node.resourceByResourceId.name}
        />)}
      </SelectInput>
    </ActionPanelForm>;
  }
}

export default Relay.createContainer(RequestResourceForProjectForm, {
  initialVariables: {
    projectId: null,
  },
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        ${CreateProjectResourceMutation.getFragment('project')},
      }
    `,
    currentPerson: () => Relay.QL`
      fragment on User {
        resourceStarsByUserId(first: 10) {
          edges {
            node {
              resourceByResourceId {
                id,
                name,
                ${CreateProjectResourceMutation.getFragment('resource')},
              }
            }
          }
        },
      }
    `,
  },
});
