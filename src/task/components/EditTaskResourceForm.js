import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import ActionPanelForm from '../../shared/components/ActionPanelForm';
import Radio from '../../shared/components/Radio';
import RadioGroup from '../../shared/components/RadioGroup';
import UpdateTaskResourceMutation from '../mutations/UpdateTaskResourceMutation';
import DeleteTaskResourceMutation from '../mutations/DeleteTaskResourceMutation';

import classNames from '../styles/EditTaskResourceFormStylesheet.css';

class EditTaskResourceForm extends React.Component {
  static propTypes = {
    taskResource: React.PropTypes.object,
    currentPerson: React.PropTypes.object,
    notifyClose: React.PropTypes.func,
  };
  state = {
    isMember: false,
    isOwner: false,
    error: false,
  };
  componentWillMount () {
    const {currentPerson, taskResource} = this.props;
    // this is an insufficient way to checking for a member because the search
    // is limited by the `first:x` argument in the Relay.QL query
    const isMember = taskResource
      .taskByTaskId
      .projectByProjectId
      .organizationByOrganizationId
      .organizationMembersByOrganizationId.edges.findIndex(edge => (
        edge.node.userByMemberId.id === currentPerson.id
      )) > -1;
    const isOwner = taskResource.resourceByResourceId.ownerId === currentPerson.rowId;

    this.setState({
      isMember,
      isOwner,
    });
  }
  handleSubmit = data => {
    if (data.status === 'accept') {
      this.acceptResource();
    } else if (data.status === 'decline') {
      this.declineResource();
    }
  }
  handleDelete = () => {
    this.removeResource();
  }
  acceptResource = _ => {
    const {taskResource} = this.props;

    Relay.Store.commitUpdate(
      new UpdateTaskResourceMutation({
        taskResourcePatch: {
          status: 'ACCEPTED',
        },
        taskResource,
      }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      }
    );
  }
  declineResource = _ => {
    const {taskResource} = this.props;

    Relay.Store.commitUpdate(
      new UpdateTaskResourceMutation({
        taskResourcePatch: {
          status: 'DECLINED',
        },
        taskResource,
      }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      }
    );
  }
  removeResource = _ => {
    const {taskResource} = this.props;

    Relay.Store.commitUpdate(
      new DeleteTaskResourceMutation({
        taskResource,
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
    const {isMember, isOwner, error} = this.state;
    const {taskResource, notifyClose} = this.props;
    const {status, resourceByResourceId} = taskResource;
    const showForm = (
      (isMember && status === 'OFFERED')
        || (isOwner && status === 'REQUESTED')
    ) || null;
    const onDelete = (
      (status === 'OFFERED' && isOwner)
        || (status === 'REQUESTED' && isMember)
        || (
          (status === 'ACCEPTED' || status === 'DECLINED')
            && (isMember || isOwner)
        )
    ) && this.handleDelete;

    return <ActionPanelForm
      title={`Resource ${status.toLowerCase()}`}
      bodyText={<p className={classNames.text}>
        <Link to={`/resource/${resourceByResourceId.rowId}`} className={classNames.link}>
          {resourceByResourceId.name}
        </Link>
      </p>}
      showForm={showForm}
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
      onDelete={onDelete}
      error={error}
    >
      <RadioGroup name={'status'} required>
        <Radio value={'accept'} label={'Accept'} />
        <Radio value={'decline'} label={'Decline'} />
      </RadioGroup>
    </ActionPanelForm>;
  }
}

export default Relay.createContainer(EditTaskResourceForm, {
  initialVariables: {
    taskResourceId: null,
  },
  fragments: {
    taskResource: () => Relay.QL`
      fragment on TaskResource {
        status,
        resourceByResourceId {
          rowId,
          name,
          ownerId,
        },
        taskByTaskId {
          projectByProjectId {
            organizationByOrganizationId {
              organizationMembersByOrganizationId(first: 15) {
                edges {
                  node {
                    userByMemberId {
                      id,
                    },
                  }
                }
              },
            },
          },
        },
        ${UpdateTaskResourceMutation.getFragment('taskResource')},
        ${DeleteTaskResourceMutation.getFragment('taskResource')},
      }
    `,
    currentPerson: () => Relay.QL`
      fragment on User {
        id,
        rowId,
      }
    `,
  },
});
