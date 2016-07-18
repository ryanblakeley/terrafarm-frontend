import React from 'react';
import Relay from 'react-relay';
import IoCube from 'react-icons/lib/io/cube';
import IoLeaf from 'react-icons/lib/io/leaf';

import EditTask from './EditTask';
import OfferResourceToTask from './OfferResourceToTask';
import ItemActionTabs from '../../shared/components/ItemActionTabs';
import ItemActionTabsMenu from '../../shared/components/ItemActionTabsMenu';
import ItemActionTabButton from '../../shared/components/ItemActionTabButton';
import ItemActionTabsLabel from '../../shared/components/ItemActionTabsLabel';
import ItemActionTabTitle from '../../shared/components/ItemActionTabTitle';
import ItemActionTabsBody from '../../shared/components/ItemActionTabsBody';
import ItemActionTabClose from '../../shared/components/ItemActionTabClose';
import ItemActionTabContent from '../../shared/components/ItemActionTabContent';

const TaskActionTabs = (props) => <ItemActionTabs>
  <ItemActionTabsMenu>
    <ItemActionTabButton disabled />
    <ItemActionTabButton disabled />
    <ItemActionTabButton
      disabled={!props.isAdmin}
      icon={<IoLeaf />}
      value={'edit-task'}
      hero
    />
    <ItemActionTabButton
      disabled={!props.doesLike || !props.isAdmin}
      icon={<IoCube />}
      value={'offer-resource'}
    />
    <ItemActionTabButton disabled />
  </ItemActionTabsMenu>
  <ItemActionTabsLabel>
    <ItemActionTabTitle value={'edit-task'} text={'Edit Task'} />
    <ItemActionTabTitle value={'offer-resource'} text={'Offer Resource'} />
  </ItemActionTabsLabel>
  <ItemActionTabsBody>
    <ItemActionTabClose />
    <ItemActionTabContent value={'edit-task'}>
      <EditTask master={props.master} task={props.task} />
    </ItemActionTabContent>
    <ItemActionTabContent value={'offer-resource'}>
      <OfferResourceToTask task={props.task} user={props.user} />
    </ItemActionTabContent>
  </ItemActionTabsBody>
</ItemActionTabs>;

TaskActionTabs.propTypes = {
  isAdmin: React.PropTypes.bool,
  doesLike: React.PropTypes.bool,
  master: React.PropTypes.object,
  task: React.PropTypes.object,
  user: React.PropTypes.object,
};

TaskActionTabs.contextTypes = {
  router: React.PropTypes.object,
  location: React.PropTypes.object,
};

export default Relay.createContainer(TaskActionTabs, {
  fragments: {
    master: () => Relay.QL`
      fragment on Master {
        ${EditTask.getFragment('master')}
      }
    `,
    task: () => Relay.QL`
      fragment on Task {
        ${EditTask.getFragment('task')},
        ${OfferResourceToTask.getFragment('task')},
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        id,
        ${OfferResourceToTask.getFragment('user')},
      }
    `,
  },
});
