import React from 'react';
import Relay from 'react-relay';
import ActionPanelForm from '../../shared/components/ActionPanelForm';
import TextInput from '../../shared/components/TextInput';
import UpdateProjectMutation from '../mutations/UpdateProjectMutation';
import DeleteProjectMutation from '../mutations/DeleteProjectMutation';

class EditProjectForm extends React.Component {
  static propTypes = {
    project: React.PropTypes.object,
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
    const {project} = this.props;

    Relay.Store.commitUpdate(
      new UpdateProjectMutation({
        projectPatch: data,
        project,
      }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      }
    );
  }
  handleDelete = () => {
    const {project, query} = this.props;

    Relay.Store.commitUpdate(
      new DeleteProjectMutation({
        project,
        query,
      }), {
        onSuccess: this.handleSuccessDelete,
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
  handleSuccessDelete = response => {
    const {project} = this.props;
    const {router} = this.context;
    const organizationId = project.organizationByOrganizationId.rowId;
    router.replace(`/organization/${organizationId}`);
  }
  render () {
    const {project, notifyClose} = this.props;
    const { error } = this.state;

    return <ActionPanelForm
      title={'Edit'}
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
      onDelete={this.handleDelete}
      error={error}
    >
      <TextInput
        name={'name'}
        label={'Name'}
        initialValue={project.name}
        validations={{matchRegexp: /[A-Za-z,\.0-9]*/}}
        required
      />
      <TextInput
        name={'description'}
        label={'Description'}
        initialValue={project.description}
        validations={{matchRegexp: /[A-Za-z,\.0-9]*/, maxLength: 500}}
        required
        multiLine
        rows={3}
      />
      <TextInput
        name={'imageUrl'}
        label={'Image'}
        initialValue={project.imageUrl}
        validations={'isUrl'}
      />
    </ActionPanelForm>;
  }
}

export default Relay.createContainer(EditProjectForm, {
  initialVariables: {
    projectId: null,
  },
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        name,
        description,
        organizationByOrganizationId {
          rowId,
        },
        ${UpdateProjectMutation.getFragment('project')},
        ${DeleteProjectMutation.getFragment('project')},
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        ${DeleteProjectMutation.getFragment('query')},
      }
    `,
  },
});
