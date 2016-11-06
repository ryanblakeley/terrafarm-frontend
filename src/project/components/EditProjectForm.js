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
  handleSubmit = data => {
    const {project} = this.props;

    Relay.Store.commitUpdate(
      new UpdateProjectMutation({
        projectPatch: data,
        project,
      })
    );
  }
  handleDelete = () => {
    const {project, query} = this.props;
    const {router} = this.context;
    const organizationId = project.organizationByOrganizationId.rowId;

    Relay.Store.commitUpdate(
      new DeleteProjectMutation({
        project,
        query,
      })
    );

    router.push(`/organization/${organizationId}`);
  }
  render () {
    const {project, notifyClose} = this.props;

    return <ActionPanelForm
      title={'Edit'}
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
      onDelete={this.handleDelete}
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
