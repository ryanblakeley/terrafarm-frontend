import React from 'react';
import Relay from 'react-relay';
import IoCube from 'react-icons/lib/io/cube';
import GoRepo from 'react-icons/lib/go/repo';
import IoIosBriefcase from 'react-icons/lib/io/ios-briefcase';
import IoIosHeart from 'react-icons/lib/io/ios-heart';

import EditOrganizationForm from './EditOrganizationForm';
import CreateProjectForm from './CreateProjectForm';
import ItemActionTabs from '../../shared/components/ItemActionTabs';
import ItemActionTabsMenu from '../../shared/components/ItemActionTabsMenu';
import ItemActionTabButton from '../../shared/components/ItemActionTabButton';
import ItemActionTabsLabel from '../../shared/components/ItemActionTabsLabel';
import ItemActionTabTitle from '../../shared/components/ItemActionTabTitle';
import ItemActionTabsBody from '../../shared/components/ItemActionTabsBody';
import ItemActionTabClose from '../../shared/components/ItemActionTabClose';
import ItemActionTabContent from '../../shared/components/ItemActionTabContent';

const OrganizationActionTabs = props => <ItemActionTabs>
  <ItemActionTabsMenu>
    <ItemActionTabButton disabled />
    <ItemActionTabButton
      disabled={!props.isAdmin}
      icon={<GoRepo />}
      value={'new-project'}
    />
    <ItemActionTabButton
      disabled={!props.isAdmin}
      icon={<IoIosBriefcase />}
      value={'edit-organization'}
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
    <ItemActionTabTitle value={'new-project'} text={'New Project'} />
    <ItemActionTabTitle value={'edit-organization'} text={'Edit Organization'} />
    <ItemActionTabTitle value={'offer-resource'} text={'Offer Resource'} />
    <ItemActionTabTitle value={'bookmark'} text={'Bookmark'} />
  </ItemActionTabsLabel>
  <ItemActionTabsBody>
    <ItemActionTabClose />
    <ItemActionTabContent value={'new-project'}>
      <CreateProjectForm organization={props.organization} query={props.query} />
    </ItemActionTabContent>
    <ItemActionTabContent value={'edit-organization'}>
      <EditOrganizationForm organization={props.organization} query={props.query} />
    </ItemActionTabContent>
    <ItemActionTabContent value={'offer-resource'} />
    <ItemActionTabContent value={'bookmark'} />
  </ItemActionTabsBody>
</ItemActionTabs>;

OrganizationActionTabs.propTypes = {
  isAdmin: React.PropTypes.bool,
  organization: React.PropTypes.object,
  query: React.PropTypes.object,
};

OrganizationActionTabs.contextTypes = {
  router: React.PropTypes.object,
  location: React.PropTypes.object,
};

export default Relay.createContainer(OrganizationActionTabs, {
  fragments: {
    organization: () => Relay.QL`
      fragment on Organization {
        ${EditOrganizationForm.getFragment('organization')},
        ${CreateProjectForm.getFragment('organization')},
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        ${EditOrganizationForm.getFragment('query')},
        ${CreateProjectForm.getFragment('query')},
      }
    `,
  },
});
