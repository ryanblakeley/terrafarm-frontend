import React from 'react';
import Relay from 'react-relay';
import GoRepo from 'react-icons/lib/go/repo';
import IoLeaf from 'react-icons/lib/io/leaf';
import IoCube from 'react-icons/lib/io/cube';
import IoIosHeart from 'react-icons/lib/io/ios-heart';
import IoIosHeartOutline from 'react-icons/lib/io/ios-heart-outline';

import EditProject from './EditProject';
import NewTask from './NewTask';
import HeartProject from './HeartProject';
import OfferResourceToProject from './OfferResourceToProject';
import ItemActionTabs from '../../shared/components/ItemActionTabs';
import ItemActionTabsMenu from '../../shared/components/ItemActionTabsMenu';
import ItemActionTabButton from '../../shared/components/ItemActionTabButton';
import ItemActionTabsLabel from '../../shared/components/ItemActionTabsLabel';
import ItemActionTabTitle from '../../shared/components/ItemActionTabTitle';
import ItemActionTabsBody from '../../shared/components/ItemActionTabsBody';
import ItemActionTabClose from '../../shared/components/ItemActionTabClose';
import ItemActionTabContent from '../../shared/components/ItemActionTabContent';

const ProjectActionTabs = (props) => <ItemActionTabs>
  <ItemActionTabsMenu>
    <ItemActionTabButton disabled />
    <ItemActionTabButton
      disabled={!props.isAdmin}
      icon={<IoLeaf />}
      value={'new-task'}
    />
    <ItemActionTabButton
      disabled={!props.isAdmin}
      icon={<GoRepo />}
      value={'edit-project'}
      hero
    />
    <ItemActionTabButton
      disabled={!props.doesLike || !props.isAdmin}
      icon={<IoCube />}
      value={'offer-resource'}
    />
    <ItemActionTabButton
      icon={props.doesLike ? <IoIosHeart /> : <IoIosHeartOutline />}
      value={'bookmark'}
    />
  </ItemActionTabsMenu>
  <ItemActionTabsLabel>
    <ItemActionTabTitle value={'new-task'} text={'New Task'} />
    <ItemActionTabTitle value={'edit-project'} text={'Edit Project'} />
    <ItemActionTabTitle value={'offer-resource'} text={'Offer Resource'} />
    <ItemActionTabTitle value={'bookmark'} text={'Bookmark'} />
  </ItemActionTabsLabel>
  <ItemActionTabsBody>
    <ItemActionTabClose />
    <ItemActionTabContent value={'new-task'}>
      <NewTask master={props.master} project={props.project} />
    </ItemActionTabContent>
    <ItemActionTabContent value={'edit-project'}>
      <EditProject master={props.master} project={props.project} />
    </ItemActionTabContent>
    <ItemActionTabContent value={'offer-resource'}>
      <OfferResourceToProject project={props.project} user={props.user} />
    </ItemActionTabContent>
    <ItemActionTabContent value={'bookmark'}>
      <HeartProject project={props.project} user={props.user} doesLike={props.doesLike} />
    </ItemActionTabContent>
  </ItemActionTabsBody>
</ItemActionTabs>;

ProjectActionTabs.propTypes = {
  isAdmin: React.PropTypes.bool,
  doesLike: React.PropTypes.bool,
  master: React.PropTypes.object,
  project: React.PropTypes.object,
  user: React.PropTypes.object,
};

ProjectActionTabs.contextTypes = {
  router: React.PropTypes.object,
  location: React.PropTypes.object,
};

export default Relay.createContainer(ProjectActionTabs, {
  fragments: {
    master: () => Relay.QL`
      fragment on Master {
        ${EditProject.getFragment('master')},
        ${NewTask.getFragment('master')},
      }
    `,
    project: () => Relay.QL`
      fragment on Project {
        ${EditProject.getFragment('project')},
        ${NewTask.getFragment('project')},
        ${HeartProject.getFragment('project')},
        ${OfferResourceToProject.getFragment('project')},
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        id,
        ${HeartProject.getFragment('user')},
        ${OfferResourceToProject.getFragment('user')},
      }
    `,
  },
});
