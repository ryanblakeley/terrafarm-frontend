import React from 'react';
import Relay from 'react-relay';
import IoAndroidRadioButtonOn from 'react-icons/lib/io/android-radio-button-on';
import IoCube from 'react-icons/lib/io/cube';
import GoRepo from 'react-icons/lib/go/repo';
import IoIosBriefcase from 'react-icons/lib/io/ios-briefcase';
import IoIosHeart from 'react-icons/lib/io/ios-heart';
import ItemActionTabs from '../../shared/components/ItemActionTabs';
import ItemActionTabsMenu from '../../shared/components/ItemActionTabsMenu';
import ItemActionTabButton from '../../shared/components/ItemActionTabButton';
import ItemActionTabsLabel from '../../shared/components/ItemActionTabsLabel';
import ItemActionTabTitle from '../../shared/components/ItemActionTabTitle';
import ItemActionTabsBody from '../../shared/components/ItemActionTabsBody';
import ItemActionTabClose from '../../shared/components/ItemActionTabClose';
import ItemActionTabContent from '../../shared/components/ItemActionTabContent';
import RequestResourceForOrganizationForm from './RequestResourceForOrganizationForm';
import OfferResourceToOrganizationForm from './OfferResourceToOrganizationForm';
import EditOrganizationForm from './EditOrganizationForm';
import CreateProjectForm from './CreateProjectForm';

const OrganizationActionTabs = props => <ItemActionTabs>
  <ItemActionTabsMenu>
    <ItemActionTabButton
      disabled={!props.isAdmin}
      icon={<IoAndroidRadioButtonOn />}
      value={'request-resource'}
    />
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
    <ItemActionTabTitle value={'request-resource'} text={'Request Resource'} />
    <ItemActionTabTitle value={'new-project'} text={'New Project'} />
    <ItemActionTabTitle value={'edit-organization'} text={'Edit Organization'} />
    <ItemActionTabTitle value={'offer-resource'} text={'Offer Resource'} />
    <ItemActionTabTitle value={'bookmark'} text={'Bookmark'} />
  </ItemActionTabsLabel>
  <ItemActionTabsBody>
    <ItemActionTabClose />
    <ItemActionTabContent value={'request-resource'}>
      <RequestResourceForOrganizationForm organization={props.organization} query={props.query} />
    </ItemActionTabContent>
    <ItemActionTabContent value={'new-project'}>
      <CreateProjectForm organization={props.organization} query={props.query} />
    </ItemActionTabContent>
    <ItemActionTabContent value={'edit-organization'}>
      <EditOrganizationForm organization={props.organization} query={props.query} />
    </ItemActionTabContent>
    <ItemActionTabContent value={'offer-resource'}>
      <OfferResourceToOrganizationForm organization={props.organization} query={props.query} />
    </ItemActionTabContent>
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
        ${RequestResourceForOrganizationForm.getFragment('organization')},
        ${OfferResourceToOrganizationForm.getFragment('organization')},
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        ${EditOrganizationForm.getFragment('query')},
        ${CreateProjectForm.getFragment('query')},
        ${RequestResourceForOrganizationForm.getFragment('query')},
        ${OfferResourceToOrganizationForm.getFragment('query')},
      }
    `,
  },
});
