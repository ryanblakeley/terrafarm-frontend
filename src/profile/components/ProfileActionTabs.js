import React from 'react';
import Relay from 'react-relay';
import IoIosBriefcase from 'react-icons/lib/io/ios-briefcase';
import IoPerson from 'react-icons/lib/io/person';
import IoCube from 'react-icons/lib/io/cube';

import EditProfileForm from './EditProfileForm';
import CreateOrganizationForm from './CreateOrganizationForm';
import CreateResourceForm from './CreateResourceForm';
import ItemActionTabs from '../../shared/components/ItemActionTabs';
import ItemActionTabsMenu from '../../shared/components/ItemActionTabsMenu';
import ItemActionTabButton from '../../shared/components/ItemActionTabButton';
import ItemActionTabsLabel from '../../shared/components/ItemActionTabsLabel';
import ItemActionTabTitle from '../../shared/components/ItemActionTabTitle';
import ItemActionTabsBody from '../../shared/components/ItemActionTabsBody';
import ItemActionTabClose from '../../shared/components/ItemActionTabClose';
import ItemActionTabContent from '../../shared/components/ItemActionTabContent';

const ProfileActionTabs = props => <ItemActionTabs>
  <ItemActionTabsMenu>
    <ItemActionTabButton disabled />
    <ItemActionTabButton
      icon={<IoIosBriefcase />}
      value={'new-organization'}
    />
    <ItemActionTabButton
      icon={<IoPerson />}
      value={'edit-profile'}
      hero
    />
    <ItemActionTabButton
      icon={<IoCube />}
      value={'new-resource'}
    />
    <ItemActionTabButton disabled />
  </ItemActionTabsMenu>
  <ItemActionTabsLabel>
    <ItemActionTabTitle value={'new-organization'} text={'New Organization'} />
    <ItemActionTabTitle value={'edit-profile'} text={'Edit Profile'} />
    <ItemActionTabTitle value={'new-resource'} text={'New Resource'} />
  </ItemActionTabsLabel>
  <ItemActionTabsBody>
    <ItemActionTabClose />
    <ItemActionTabContent value={'new-organization'}>
      <CreateOrganizationForm user={props.user} query={props.query} />
    </ItemActionTabContent>
    <ItemActionTabContent value={'edit-profile'}>
      <EditProfileForm user={props.user} />
    </ItemActionTabContent>
    <ItemActionTabContent value={'new-resource'}>
      <CreateResourceForm user={props.user} query={props.query} />
    </ItemActionTabContent>
  </ItemActionTabsBody>
</ItemActionTabs>;

ProfileActionTabs.propTypes = {
  user: React.PropTypes.object,
  query: React.PropTypes.object,
};

ProfileActionTabs.contextTypes = {
  router: React.PropTypes.object,
  location: React.PropTypes.object,
};

export default Relay.createContainer(ProfileActionTabs, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id,
        ${EditProfileForm.getFragment('user')},
        ${CreateOrganizationForm.getFragment('user')},
        ${CreateResourceForm.getFragment('user')}
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        ${CreateResourceForm.getFragment('query')},
        ${CreateOrganizationForm.getFragment('query')},
      }
    `,
  },
});
