import React from 'react';
import Relay from 'react-relay';
import GoRepo from 'react-icons/lib/go/repo';
import IoIosPaperOutline from 'react-icons/lib/io/ios-paper-outline';
import IoCube from 'react-icons/lib/io/cube';
import IoIosHeart from 'react-icons/lib/io/ios-heart';

import EditProjectForm from './EditProjectForm';
import CreateTaskForm from './CreateTaskForm';
import ItemActionTabs from '../../shared/components/ItemActionTabs';
import ItemActionTabsMenu from '../../shared/components/ItemActionTabsMenu';
import ItemActionTabButton from '../../shared/components/ItemActionTabButton';
import ItemActionTabsLabel from '../../shared/components/ItemActionTabsLabel';
import ItemActionTabTitle from '../../shared/components/ItemActionTabTitle';
import ItemActionTabsBody from '../../shared/components/ItemActionTabsBody';
import ItemActionTabClose from '../../shared/components/ItemActionTabClose';
import ItemActionTabContent from '../../shared/components/ItemActionTabContent';

const ProjectActionTabs = props => <ItemActionTabs>
  <ItemActionTabsMenu>
    <ItemActionTabButton disabled />
    <ItemActionTabButton
      disabled={!props.isAdmin}
      icon={<IoIosPaperOutline />}
      value={'new-task'}
    />
    <ItemActionTabButton
      disabled={!props.isAdmin}
      icon={<GoRepo />}
      value={'edit-project'}
      hero
    />
    <ItemActionTabButton
      disabled={!props.isAdmin}
      icon={<IoCube />}
      value={'offer-resource'}
    />
    <ItemActionTabButton
      icon={<IoIosHeart />}
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
      <CreateTaskForm project={props.project} query={props.query} />
    </ItemActionTabContent>
    <ItemActionTabContent value={'edit-project'}>
      <EditProjectForm project={props.project} query={props.query} />
    </ItemActionTabContent>
    <ItemActionTabContent value={'offer-resource'} />
    <ItemActionTabContent value={'bookmark'} />
  </ItemActionTabsBody>
</ItemActionTabs>;

ProjectActionTabs.propTypes = {
  isAdmin: React.PropTypes.bool,
  project: React.PropTypes.object,
  query: React.PropTypes.object,
};

ProjectActionTabs.contextTypes = {
  router: React.PropTypes.object,
  location: React.PropTypes.object,
};

export default Relay.createContainer(ProjectActionTabs, {
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        ${EditProjectForm.getFragment('project')},
        ${CreateTaskForm.getFragment('project')},
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        ${EditProjectForm.getFragment('query')},
        ${CreateTaskForm.getFragment('query')},
      }
    `,
  },
});
