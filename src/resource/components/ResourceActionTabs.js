import React from 'react';
import Relay from 'react-relay';
import IoCube from 'react-icons/lib/io/cube';
import IoAndroidRadioButtonOn from 'react-icons/lib/io/android-radio-button-on';
import EditResourceForm from './EditResourceForm';
import RequestResourceForm from './RequestResourceForm';
import ItemActionTabs from '../../shared/components/ItemActionTabs';
import ItemActionTabsMenu from '../../shared/components/ItemActionTabsMenu';
import ItemActionTabButton from '../../shared/components/ItemActionTabButton';
import ItemActionTabsLabel from '../../shared/components/ItemActionTabsLabel';
import ItemActionTabTitle from '../../shared/components/ItemActionTabTitle';
import ItemActionTabsBody from '../../shared/components/ItemActionTabsBody';
import ItemActionTabClose from '../../shared/components/ItemActionTabClose';
import ItemActionTabContent from '../../shared/components/ItemActionTabContent';

const ResourceActionTabs = props => <ItemActionTabs>
  <ItemActionTabsMenu>
    <ItemActionTabButton disabled />
    <ItemActionTabButton
      disabled={!props.isAdmin}
      icon={<IoAndroidRadioButtonOn />}
      value={'request-resource'}
    />
    <ItemActionTabButton
      disabled={!props.isAdmin}
      icon={<IoCube />}
      value={'edit-resource'}
      hero
    />
    <ItemActionTabButton disabled />
    <ItemActionTabButton disabled />
  </ItemActionTabsMenu>
  <ItemActionTabsLabel>
    <ItemActionTabTitle value={'request-resource'} text={'Request Resource'} />
    <ItemActionTabTitle value={'edit-resource'} text={'Edit Resource'} />
    <ItemActionTabTitle value={'bookmark'} text={'Bookmark'} />
  </ItemActionTabsLabel>
  <ItemActionTabsBody>
    <ItemActionTabClose />
    <ItemActionTabContent value={'request-resource'}>
      <RequestResourceForm resource={props.resource} query={props.query} />
    </ItemActionTabContent>
    <ItemActionTabContent value={'edit-resource'}>
      <EditResourceForm resource={props.resource} query={props.query} />
    </ItemActionTabContent>
    <ItemActionTabContent value={'bookmark'}>
      {/* <HeartResource resource={props.resource} /> */}
    </ItemActionTabContent>
  </ItemActionTabsBody>
</ItemActionTabs>;

ResourceActionTabs.propTypes = {
  isAdmin: React.PropTypes.bool,
  resource: React.PropTypes.object,
  query: React.PropTypes.object,
};

ResourceActionTabs.contextTypes = {
  router: React.PropTypes.object,
  location: React.PropTypes.object,
};

export default Relay.createContainer(ResourceActionTabs, {
  fragments: {
    resource: () => Relay.QL`
      fragment on Resource {
        ${EditResourceForm.getFragment('resource')},
        ${RequestResourceForm.getFragment('resource')},
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        ${EditResourceForm.getFragment('query')},
        ${RequestResourceForm.getFragment('query')},
      }
    `,
  },
});
