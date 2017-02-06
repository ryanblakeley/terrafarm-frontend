import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import ActionPanelForm from 'shared/components/ActionPanelForm';
import Radio from 'shared/components/Radio';
import RadioGroup from 'shared/components/RadioGroup';
import NotAuthorized from 'shared/components/NotAuthorized';
import UpdateOrganizationMemberMutation from '../mutations/UpdateOrganizationMemberMutation';
import classNames from '../styles/EditMemberFormStylesheet.css';

class EditMemberForm extends React.Component {
  static propTypes = {
    organizationMember: React.PropTypes.object,
    currentPerson: React.PropTypes.object,
    notifyClose: React.PropTypes.func,
  };
  state = {
    error: false,
    authorized: false,
  };
  componentWillMount () {
    const {currentPerson, organizationMember} = this.props;
    const authorized = organizationMember.memberId === currentPerson.rowId;

    this.setState({authorized});
  }
  handleSubmit = data => {
    if (data.status === 'accept') {
      this.acceptMember();
    } else if (data.status === 'decline') {
      this.declineMember();
    }
  }
  handleDelete = () => {
    this.removeMember();
  }
  handleSuccess = response => {
    this.props.notifyClose();
  }
  handleFailure = transaction => {
    const error = transaction.getError() || new Error('Mutation failed.');
    this.setState({ error: !!error });
  }
  acceptMember = _ => {
    const {organizationMember} = this.props;

    Relay.Store.commitUpdate(
      new UpdateOrganizationMemberMutation({
        organizationMemberPatch: {
          status: 'ACCEPTED',
        },
        organizationMember,
      }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      }
    );
  }
  declineMember = _ => {
    const {organizationMember} = this.props;

    Relay.Store.commitUpdate(
      new UpdateOrganizationMemberMutation({
        organizationMemberPatch: {
          status: 'DECLINED',
        },
        organizationMember,
      }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      }
    );
  }
  render () {
    const {authorized, error} = this.state;
    const {organizationMember, notifyClose} = this.props;
    const {status, organizationByOrganizationId} = organizationMember;
    const showForm = status === 'OFFERED';

    return <ActionPanelForm
      title={`Membership ${status.toLowerCase()}`}
      bodyText={<div>
        <p className={classNames.text}>
          <Link to={`/farm/${organizationByOrganizationId.rowId}`} className={classNames.link}>
            {organizationByOrganizationId.name}
          </Link>
        </p>
      </div>}
      showForm={showForm}
      formBlockedMessage={authorized ? null : <NotAuthorized />}
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
      onDelete={null}
      error={error}
    >
      <RadioGroup name={'status'} required>
        <Radio value={'accept'} label={'Accept'} />
        <Radio value={'decline'} label={'Decline'} />
      </RadioGroup>
    </ActionPanelForm>;
  }
}

export default Relay.createContainer(EditMemberForm, {
  initialVariables: {
    organizationMemberId: null,
  },
  fragments: {
    organizationMember: () => Relay.QL`
      fragment on OrganizationMember {
        status,
        memberId,
        organizationByOrganizationId {
          rowId,
          name,
        },
        ${UpdateOrganizationMemberMutation.getFragment('organizationMember')},
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
