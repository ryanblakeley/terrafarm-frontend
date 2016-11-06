import React from 'react';
import Relay from 'react-relay';
import ActionPanelForm from '../../shared/components/ActionPanelForm';
import TextInput from '../../shared/components/TextInput';
import UpdateResourceMutation from '../mutations/UpdateResourceMutation';
import DeleteResourceMutation from '../mutations/DeleteResourceMutation';

class EditResourceForm extends React.Component {
  static propTypes = {
    resource: React.PropTypes.object,
    query: React.PropTypes.object,
    notifyClose: React.PropTypes.func,
  };
  static contextTypes = {
    router: React.PropTypes.object,
  };
  handleSubmit = data => {
    const {resource} = this.props;

    Relay.Store.commitUpdate(
      new UpdateResourceMutation({
        resourcePatch: data,
        resource,
      })
    );
  }
  handleDelete = () => {
    const {resource, query} = this.props;
    const {router} = this.context;

    Relay.Store.commitUpdate(
      new DeleteResourceMutation({
        resource,
        query,
      })
    );

    router.push('/profile');
  }
  render () {
    const {resource, notifyClose} = this.props;

    return <ActionPanelForm
      title={'Edit'}
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
      onDelete={this.handleDelete}
    >
      <TextInput
        name={'name'}
        label={'Name'}
        initialValue={resource.name}
        validations={{matchRegexp: /[A-Za-z,\.0-9]*/}}
        required
      />
      <TextInput
        name={'location'}
        label={'Location'}
        initialValue={resource.location}
        validations={{matchRegexp: /[A-Za-z,0-9]*/}}
        required
      />
      <TextInput
        name={'description'}
        label={'Description'}
        initialValue={resource.description}
        validations={{matchRegexp: /[A-Za-z,\.0-9]*/, maxLength: 500}}
        required
        multiLine
        rows={3}
      />
      <TextInput
        name={'imageUrl'}
        label={'Image'}
        initialValue={resource.imageUrl}
        validations={'isUrl'}
      />
    </ActionPanelForm>;
  }
}

export default Relay.createContainer(EditResourceForm, {
  initialVariables: {
    resourceId: null,
  },
  fragments: {
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
        description,
        location,
        imageUrl,
        ${UpdateResourceMutation.getFragment('resource')},
        ${DeleteResourceMutation.getFragment('resource')},
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        ${DeleteResourceMutation.getFragment('query')},
      }
    `,
  },
});
