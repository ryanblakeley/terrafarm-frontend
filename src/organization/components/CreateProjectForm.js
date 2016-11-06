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
  handleSubmit = data => {
    const {organization, query} = this.props;
    const {router} = this.context;

    Relay.Store.commitUpdate(
      new CreateProjectMutation({
        projectData: data,
        organization,
        query,
      }), {
        onSuccess: response => {
          const projectId = response.createProject.projectEdge.node.rowId;
          router.push(`/project/${projectId}`);
        },
      }
    );
  }
  render () {
    return <ActionPanelForm
      title={'New Project'}
      notifyClose={this.props.notifyClose}
      onValidSubmit={this.handleSubmit}
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
