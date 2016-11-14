import React from 'react';
import Relay from 'react-relay';
import ActionPanelForm from '../../shared/components/ActionPanelForm';
import TextInput from '../../shared/components/TextInput';
import CreateProjectMutation from '../mutations/CreateProjectMutation';

class CreateProjectForm extends React.Component {
  static propTypes = {
    organization: React.PropTypes.object,
    query: React.PropTypes.object,
    notifyClose: React.PropTypes.func,
  };
  static contextTypes = {
    router: React.PropTypes.object,
  };
  state = {
    error: false,
  };
  handleSubmit = data => {
    const {organization, query} = this.props;

    Relay.Store.commitUpdate(
      new CreateProjectMutation({
        projectData: data,
        organization,
        query,
      }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      }
    );
  }
  handleSuccess = response => {
    const {router} = this.context;
    const projectId = response.createProject.projectEdge.node.rowId;
    router.replace(`/project/${projectId}`);
  }
  handleFailure = transaction => {
    const error = transaction.getError() || new Error('Mutation failed.');
    this.setState({ error: !!error });
  }
  render () {
    const {notifyClose} = this.props;
    const {error} = this.state;
    return <ActionPanelForm
      title={'New Project'}
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
      error={error}
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
        validations={{matchRegexp: /[A-Za-z,\.0-9]*/, maxLength: 500}}
        required
        multiLine
        rows={5}
      />
      <TextInput
        name={'imageUrl'}
        label={'Image'}
        validations={'isUrl'}
        placeholder={'http://i.imgur.com/PURgCqt.jpg'}
      />
    </ActionPanelForm>;
  }
}

export default Relay.createContainer(CreateProjectForm, {
  initialVariables: {
    organizationId: null,
  },
  fragments: {
    organization: () => Relay.QL`
      fragment on Organization {
        ${CreateProjectMutation.getFragment('organization')},
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        ${CreateProjectMutation.getFragment('query')},
      }
    `,
  },
});
