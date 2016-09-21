import React from 'react';
import Relay from 'react-relay';
import IoCube from 'react-icons/lib/io/cube';
import GoRepo from 'react-icons/lib/go/repo';
import IoIosLocation from 'react-icons/lib/io/ios-location';
import IoIosHeart from 'react-icons/lib/io/ios-heart';
import IoIosHeartOutline from 'react-icons/lib/io/ios-heart-outline';

import EditLand from './EditLand';
import NewProject from './NewProject';
import HeartLand from './HeartLand';
import OfferResourceToLand from './OfferResourceToLand';
import ItemActionTabs from '../../shared/components/ItemActionTabs';
import ItemActionTabsMenu from '../../shared/components/ItemActionTabsMenu';
import ItemActionTabButton from '../../shared/components/ItemActionTabButton';
import ItemActionTabsLabel from '../../shared/components/ItemActionTabsLabel';
import ItemActionTabTitle from '../../shared/components/ItemActionTabTitle';
import ItemActionTabsBody from '../../shared/components/ItemActionTabsBody';
import ItemActionTabClose from '../../shared/components/ItemActionTabClose';
import ItemActionTabContent from '../../shared/components/ItemActionTabContent';

const LandActionTabs = (props) => <ItemActionTabs>
  <ItemActionTabsMenu>
    <ItemActionTabButton disabled />
    <ItemActionTabButton
      disabled={!props.isAdmin}
      icon={<GoRepo />}
      value={'new-project'}
    />
    <ItemActionTabButton
      disabled={!props.isAdmin}
      icon={<IoIosLocation />}
      value={'edit-land'}
      hero
    />
    <ItemActionTabButton
      disabled={!props.doesLike && !props.isAdmin}
      icon={<IoCube />}
      value={'offer-resource'}
    />
    <ItemActionTabButton
      icon={props.doesLike ? <IoIosHeart /> : <IoIosHeartOutline />}
      value={'bookmark'}
    />
  </ItemActionTabsMenu>
  <ItemActionTabsLabel>
    <ItemActionTabTitle value={'new-project'} text={'New Project'} />
    <ItemActionTabTitle value={'edit-land'} text={'Edit Land'} />
    <ItemActionTabTitle value={'offer-resource'} text={'Offer Resource'} />
    <ItemActionTabTitle value={'bookmark'} text={'Bookmark'} />
  </ItemActionTabsLabel>
  <ItemActionTabsBody>
    <ItemActionTabClose />
    <ItemActionTabContent value={'new-project'}>
      <NewProject master={props.master} land={props.land} user={props.user} />
    </ItemActionTabContent>
    <ItemActionTabContent value={'edit-land'}>
      <EditLand master={props.master} land={props.land} user={props.user} />
    </ItemActionTabContent>
    <ItemActionTabContent value={'offer-resource'}>
      <OfferResourceToLand land={props.land} user={props.user} />
    </ItemActionTabContent>
    <ItemActionTabContent value={'bookmark'}>
      <HeartLand land={props.land} user={props.user} doesLike={props.doesLike} />
    </ItemActionTabContent>
  </ItemActionTabsBody>
</ItemActionTabs>;

LandActionTabs.propTypes = {
  isAdmin: React.PropTypes.bool,
  doesLike: React.PropTypes.bool,
  master: React.PropTypes.object,
  land: React.PropTypes.object,
  user: React.PropTypes.object,
};

LandActionTabs.contextTypes = {
  router: React.PropTypes.object,
  location: React.PropTypes.object,
};

export default Relay.createContainer(LandActionTabs, {
  fragments: {
    master: () => Relay.QL`
      fragment on Master {
        ${EditLand.getFragment('master')},
        ${NewProject.getFragment('master')}
      }
    `,
    land: () => Relay.QL`
      fragment on Land {
        ${EditLand.getFragment('land')},
        ${NewProject.getFragment('land')},
        ${HeartLand.getFragment('land')},
        ${OfferResourceToLand.getFragment('land')},
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        ${EditLand.getFragment('user')},
        ${NewProject.getFragment('user')},
        ${HeartLand.getFragment('user')},
        ${OfferResourceToLand.getFragment('user')},
      }
    `,
  },
});
