import React from 'react';
import Relay from 'react-relay';
import IoCube from 'react-icons/lib/io/cube';
import IoIosHeart from 'react-icons/lib/io/ios-heart';
import IoIosHeartOutline from 'react-icons/lib/io/ios-heart-outline';

import EditResource from './EditResource';
import HeartResource from './HeartResource';
import ItemActionTabs from '../../shared/components/ItemActionTabs';
import ItemActionTabsMenu from '../../shared/components/ItemActionTabsMenu';
import ItemActionTabButton from '../../shared/components/ItemActionTabButton';
import ItemActionTabsLabel from '../../shared/components/ItemActionTabsLabel';
import ItemActionTabTitle from '../../shared/components/ItemActionTabTitle';
import ItemActionTabsBody from '../../shared/components/ItemActionTabsBody';
import ItemActionTabClose from '../../shared/components/ItemActionTabClose';
import ItemActionTabContent from '../../shared/components/ItemActionTabContent';

const ResourceActionTabs = (props) => <ItemActionTabs>
  <ItemActionTabsMenu>
    <ItemActionTabButton disabled />
    <ItemActionTabButton disabled />
    <ItemActionTabButton
      disabled={!props.isAdmin}
      icon={<IoCube />}
      value={'edit-resource'}
      hero
    />
    <ItemActionTabButton disabled />
    <ItemActionTabButton
      icon={props.doesLike ? <IoIosHeart /> : <IoIosHeartOutline />}
      value={'bookmark'}
    />
  </ItemActionTabsMenu>
  <ItemActionTabsLabel>
    <ItemActionTabTitle value={'edit-resource'} text={'Edit Resource'} />
    <ItemActionTabTitle value={'bookmark'} text={'Bookmark'} />
  </ItemActionTabsLabel>
  <ItemActionTabsBody>
    <ItemActionTabClose />
    <ItemActionTabContent value={'edit-resource'}>
      <EditResource master={props.master} resource={props.resource} user={props.user} />
    </ItemActionTabContent>
    <ItemActionTabContent value={'bookmark'}>
      <HeartResource resource={props.resource} user={props.user} doesLike={props.doesLike} />
    </ItemActionTabContent>
  </ItemActionTabsBody>
</ItemActionTabs>;

ResourceActionTabs.propTypes = {
  isAdmin: React.PropTypes.bool,
  doesLike: React.PropTypes.bool,
  master: React.PropTypes.object,
  resource: React.PropTypes.object,
  user: React.PropTypes.object,
};

ResourceActionTabs.contextTypes = {
  router: React.PropTypes.object,
  location: React.PropTypes.object,
};

export default Relay.createContainer(ResourceActionTabs, {
  fragments: {
    master: () => Relay.QL`
      fragment on Master {
        ${EditResource.getFragment('master')}
      }
    `,
    resource: () => Relay.QL`
      fragment on Resource {
        ${EditResource.getFragment('resource')},
        ${HeartResource.getFragment('resource')},
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        ${EditResource.getFragment('user')},
        ${HeartResource.getFragment('user')},
      }
    `,
  },
});
