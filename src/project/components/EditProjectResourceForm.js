import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import ActionPanelForm from '../../shared/components/ActionPanelForm';
import Radio from '../../shared/components/Radio';
import RadioGroup from '../../shared/components/RadioGroup';
import UpdateProjectResourceMutation from '../mutations/UpdateProjectResourceMutation';
import DeleteProjectResourceMutation from '../mutations/DeleteProjectResourceMutation';

import classNames from '../styles/EditProjectResourceFormStylesheet.css';

class EditProjectResourceForm extends React.Component {
  static propTypes = {
    projectResource: React.PropTypes.object,
    currentPerson: React.PropTypes.object,
    notifyClose: React.PropTypes.func,
  };
  state = {
    isMember: false,
    isOwner: false,
  };
  componentWillMount () {
    const {currentPerson, projectResource} = this.props;
    // this is an insufficient way to checking for a member because the search
    // is limited by the `first:x` argument in the Relay.QL query
    const isMember = projectResource
      .projectByProjectId
      .organizationByOrganizationId
      .organizationMembersByOrganizationId.edges.findIndex(edge => (
        edge.node.userByMemberId.id === currentPerson.id
      )) > -1;
    const isOwner = projectResource.resourceByResourceId.ownerId === currentPerson.rowId;

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
    const {projectResource} = this.props;

    Relay.Store.commitUpdate(
      new UpdateProjectResourceMutation({
        projectResourcePatch: {
          status: 'ACCEPTED',
        },
        projectResource,
      })
    );
  }
  declineResource = _ => {
    const {projectResource} = this.props;

    Relay.Store.commitUpdate(
      new UpdateProjectResourceMutation({
        projectResourcePatch: {
          status: 'DECLINED',
        },
        projectResource,
      })
    );
  }
  removeResource = _ => {
    const {projectResource} = this.props;

    Relay.Store.commitUpdate(
      new DeleteProjectResourceMutation({
        projectResource,
      })
    );
  }
  render () {
    const {isMember, isOwner} = this.state;
    const {projectResource, notifyClose} = this.props;
    const {status, resourceByResourceId} = projectResource;
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
      showForm={showForm}
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
      onDelete={onDelete}
      bodyText={<p className={classNames.text}>
        <Link to={`/resource/${resourceByResourceId.rowId}`} className={classNames.link}>
          {resourceByResourceId.name}
        </Link>
      </p>}
    >
      <RadioGroup name={'status'} required>
        <Radio value={'accept'} label={'Accept'} />
        <Radio value={'decline'} label={'Decline'} />
      </RadioGroup>
    </ActionPanelForm>;
  }
}

export default Relay.createContainer(EditProjectResourceForm, {
  initialVariables: {
    projectResourceId: null,
  },
  fragments: {
    projectResource: () => Relay.QL`
      fragment on ProjectResource {
        status,
        resourceByResourceId {
          rowId,
          name,
          ownerId,
        },
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
        ${UpdateProjectResourceMutation.getFragment('projectResource')},
        ${DeleteProjectResourceMutation.getFragment('projectResource')},
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
