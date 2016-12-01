import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import ActionPanelForm from '../../shared/components/ActionPanelForm';
import Radio from '../../shared/components/Radio';
import RadioGroup from '../../shared/components/RadioGroup';
import ContactCard from '../../shared/components/ContactCard';
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
    error: false,
    authorized: false,
    isOwner: false,
    isMember: false,
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
      authorized: isOwner || isMember,
      isOwner,
      isMember,
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
  handleSuccess = response => {
    this.props.notifyClose();
  }
  handleFailure = transaction => {
    const error = transaction.getError() || new Error('Mutation failed.');
    this.setState({ error: !!error });
  }
  acceptResource = _ => {
    const {organizationResource} = this.props;

    Relay.Store.commitUpdate(
      new UpdateOrganizationResourceMutation({
        organizationResourcePatch: {
          status: 'ACCEPTED',
        },
        organizationResource,
      }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      }
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
      }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      }
    );
  }
  removeResource = _ => {
    const {organizationResource} = this.props;

    Relay.Store.commitUpdate(
      new DeleteOrganizationResourceMutation({
        organizationResource,
      }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      }
    );
  }
  render () {
    const {authorized, isOwner, isMember, error} = this.state;
    const {organizationResource, notifyClose} = this.props;
    const {status, contact, resourceByResourceId} = organizationResource;
    const showForm = (authorized
      && ((isMember && status === 'OFFERED')
        || (isOwner && status === 'REQUESTED'))
    );
    const onDelete = (authorized
      && ((isOwner && status === 'OFFERED')
        || (isMember && status === 'REQUESTED')
        || (status === 'ACCEPTED' || status === 'DECLINED'))
    ) ? this.handleDelete : null;

    return <ActionPanelForm
      title={`Resource ${status.toLowerCase()}`}
      bodyText={authorized ? <div>
        <p className={classNames.text}>
          <Link to={`/resource/${resourceByResourceId.rowId}`} className={classNames.link}>
            {resourceByResourceId.name}
          </Link>
        </p>
        {contact && <ContactCard text={contact} />}
      </div> : null}
      showForm={showForm}
      formBlockedMessage={''}
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

export default Relay.createContainer(EditOrganizationResourceForm, {
  initialVariables: {
    organizationResourceId: null,
  },
  fragments: {
    organizationResource: () => Relay.QL`
      fragment on OrganizationResource {
        status,
        contact,
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
