import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import ActionPanelForm from '../../shared/components/ActionPanelForm';
import Radio from '../../shared/components/Radio';
import RadioGroup from '../../shared/components/RadioGroup';
import UpdateOrganizationResourceMutation from '../mutations/UpdateOrganizationResourceMutation';
import DeleteOrganizationResourceMutation from '../mutations/DeleteOrganizationResourceMutation';

import classNames from '../styles/EditOrganizationResourceFormStylesheet.css';

class EditOrganizationResourceForm extends React.Component {
  static propTypes = {
    organizationResource: React.PropTypes.object,
    currentPerson: React.PropTypes.object,
    notifyClose: React.PropTypes.func,
  };
  state = {
    isMember: false,
    isOwner: false,
  };
  componentWillMount () {
    const {currentPerson, organizationResource} = this.props;
    // this is an insufficient way to checking for a member because the search
    // is limited by the `first:x` argument in the Relay.QL query
    const isMember = organizationResource
      .organizationByOrganizationId
      .organizationMembersByOrganizationId.edges.findIndex(edge => (
        edge.node.userByMemberId.id === currentPerson.id
      )) > -1;
    const isOwner = organizationResource.resourceByResourceId.ownerId === currentPerson.rowId;

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
    const {organizationResource} = this.props;

    Relay.Store.commitUpdate(
      new UpdateOrganizationResourceMutation({
        organizationResourcePatch: {
          status: 'ACCEPTED',
        },
        organizationResource,
      })
    );
  }
  declineResource = _ => {
    const {organizationResource} = this.props;

    Relay.Store.commitUpdate(
      new UpdateOrganizationResourceMutation({
        organizationResourcePatch: {
          status: 'DECLINED',
        },
        organizationResource,
      })
    );
  }
  removeResource = _ => {
    const {organizationResource} = this.props;

    Relay.Store.commitUpdate(
      new DeleteOrganizationResourceMutation({
        organizationResource,
      })
    );
  }
  render () {
    const {isMember, isOwner} = this.state;
    const {organizationResource, notifyClose} = this.props;
    const {status, resourceByResourceId} = organizationResource;
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
    >
      <RadioGroup name={'status'} required>
        <Radio value={'accept'} label={'Accept'} />
        <Radio value={'decline'} label={'Decline'} />
      </RadioGroup>
    </ActionPanelForm>;
  }
}

export default Relay.createContainer(EditOrganizationResourceForm, {
  initialVariables: {
    organizationResourceId: null,
  },
  fragments: {
    organizationResource: () => Relay.QL`
      fragment on OrganizationResource {
        status,
        resourceByResourceId {
          rowId,
          name,
          ownerId,
        },
        organizationByOrganizationId {
          organizationMembersByOrganizationId(first: 15) {
            edges {
              node {
                userByMemberId {
                  id,
                },
              },
            },
          },
        },
        ${UpdateOrganizationResourceMutation.getFragment('organizationResource')},
        ${DeleteOrganizationResourceMutation.getFragment('organizationResource')},
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
