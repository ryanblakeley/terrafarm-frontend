import React from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextInput from '../../shared/components/TextInput';
import UpdateProjectMutation from '../mutations/UpdateProjectMutation';
import DeleteProjectMutation from '../mutations/DeleteProjectMutation';

import classNames from '../styles/EditProjectFormStylesheet.css';

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
    canSubmit: false,
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
    const {project} = this.props;

    if (!this.state.canSubmit) {
      console.warn('New resource is not ready');
      return;
    }

    Relay.Store.commitUpdate(
      new UpdateProjectMutation({
        projectPatch: data,
        project,
      })
    );

    this.handleClose();
  }
  handleDelete = () => {
    const {project, query} = this.props;
    const {router} = this.context;
    const organizationId = project.organizationByOrganizationId.id;

    Relay.Store.commitUpdate(
      new DeleteProjectMutation({
        project,
        query,
      })
    );

    this.handleClose();

    router.push(`/organization/${organizationId}`);
  }
  render () {
    const {project} = this.props;
    const {canSubmit} = this.state;

    return <div className={classNames.this} >
      <Formsy.Form
        onValid={this.handleValid}
        onInvalid={this.handleInvalid}
        onValidSubmit={this.handleSubmit}
        onInvalidSubmit={this.handleFormError}
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
        <div className={classNames.buttons}>
          <FlatButton
            label={'Delete'}
            onTouchTap={this.handleDelete}
          />
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

export default Relay.createContainer(EditProjectForm, {
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        id,
        name,
        description,
        organizationByOrganizationId {
          id,
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
