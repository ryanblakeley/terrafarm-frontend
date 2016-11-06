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
    query: React.PropTypes.object,
    notifyClose: React.PropTypes.func,
  };
  handleSubmit = data => {
    const {project} = this.props;

    Relay.Store.commitUpdate(
      new CreateProjectResourceMutation({
        project,
        resource: data.resource,
        status: 'REQUESTED',
      })
    );
  }
  render () {
    const {query, notifyClose} = this.props;

    return <ActionPanelForm
      title={'Request Resource'}
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
    >
      <SelectInput
        name={'resource'}
        label={'Select a resource to request'}
        required
      >
        {query.allResources.edges.map(edge => <MenuItem
          value={edge.node}
          key={edge.node.id}
          primaryText={edge.node.name}
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
    query: () => Relay.QL`
      fragment on Query {
        allResources(first: 10) {
          edges {
            node {
              id,
              name,
              ${CreateProjectResourceMutation.getFragment('resource')},
            }
          }
        },
      }
    `,
  },
});
