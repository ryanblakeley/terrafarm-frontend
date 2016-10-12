import React from 'react';
import Relay from 'react-relay';
import IoIosLocation from 'react-icons/lib/io/ios-location';
import IoPerson from 'react-icons/lib/io/person';
import IoCube from 'react-icons/lib/io/cube';

import EditProfile from './EditProfile';
import NewLand from './NewLand';
import NewResource from './NewResource';
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
      disabled={!props.isAdmin}
      icon={<IoIosLocation />}
      value={'new-land'}
    />
    <ItemActionTabButton
      disabled={!props.isAdmin}
      icon={<IoPerson />}
      value={'edit-profile'}
      hero
    />
    <ItemActionTabButton
      disabled={!props.isAdmin}
      icon={<IoCube />}
      value={'new-resource'}
    />
    <ItemActionTabButton disabled />
  </ItemActionTabsMenu>
  <ItemActionTabsLabel>
    <ItemActionTabTitle value={'new-land'} text={'New Land'} />
    <ItemActionTabTitle value={'edit-profile'} text={'Edit Profile'} />
    <ItemActionTabTitle value={'new-resource'} text={'New Resource'} />
  </ItemActionTabsLabel>
  <ItemActionTabsBody>
    <ItemActionTabClose />
    <ItemActionTabContent value={'new-land'}>
      <NewLand master={props.master} user={props.user} />
    </ItemActionTabContent>
    <ItemActionTabContent value={'edit-profile'}>
      <EditProfile master={props.master} user={props.user} />
    </ItemActionTabContent>
    <ItemActionTabContent value={'new-resource'}>
      <NewResource master={props.master} user={props.user} />
    </ItemActionTabContent>
  </ItemActionTabsBody>
</ItemActionTabs>;

ProfileActionTabs.propTypes = {
  isAdmin: React.PropTypes.bool,
  master: React.PropTypes.object,
  user: React.PropTypes.object,
};

ProfileActionTabs.contextTypes = {
  router: React.PropTypes.object,
  location: React.PropTypes.object,
};

export default Relay.createContainer(ProfileActionTabs, {
  fragments: {
    master: () => Relay.QL`
      fragment on Master {
        ${EditProfile.getFragment('master')},
        ${NewLand.getFragment('master')},
        ${NewResource.getFragment('master')}
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        ${EditProfile.getFragment('user')},
        ${NewLand.getFragment('user')},
        ${NewResource.getFragment('user')}
      }
    `,
  },
});
