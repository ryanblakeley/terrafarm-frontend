import React from 'react';
import Relay from 'react-relay';
import IoCube from 'react-icons/lib/io/cube';
import IoIosPaperOutline from 'react-icons/lib/io/ios-paper-outline';

import EditTaskForm from './EditTaskForm';
import ItemActionTabs from '../../shared/components/ItemActionTabs';
import ItemActionTabsMenu from '../../shared/components/ItemActionTabsMenu';
import ItemActionTabButton from '../../shared/components/ItemActionTabButton';
import ItemActionTabsLabel from '../../shared/components/ItemActionTabsLabel';
import ItemActionTabTitle from '../../shared/components/ItemActionTabTitle';
import ItemActionTabsBody from '../../shared/components/ItemActionTabsBody';
import ItemActionTabClose from '../../shared/components/ItemActionTabClose';
import ItemActionTabContent from '../../shared/components/ItemActionTabContent';

const TaskActionTabs = props => <ItemActionTabs>
  <ItemActionTabsMenu>
    <ItemActionTabButton disabled />
    <ItemActionTabButton disabled />
    <ItemActionTabButton
      disabled={!props.isAdmin}
      icon={<IoIosPaperOutline />}
      value={'edit-task'}
      hero
    />
    <ItemActionTabButton
      disabled={!props.isAdmin}
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
      <EditTaskForm task={props.task} query={props.query} />
    </ItemActionTabContent>
    <ItemActionTabContent value={'offer-resource'} />
  </ItemActionTabsBody>
</ItemActionTabs>;

TaskActionTabs.propTypes = {
  isAdmin: React.PropTypes.bool,
  task: React.PropTypes.object,
  query: React.PropTypes.object,
};

TaskActionTabs.contextTypes = {
  router: React.PropTypes.object,
  location: React.PropTypes.object,
};

export default Relay.createContainer(TaskActionTabs, {
  fragments: {
    task: () => Relay.QL`
      fragment on Task {
        ${EditTaskForm.getFragment('task')},
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        ${EditTaskForm.getFragment('query')},
      }
    `,
  },
});
