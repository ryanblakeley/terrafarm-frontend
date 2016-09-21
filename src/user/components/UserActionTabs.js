import React from 'react';
import IoPerson from 'react-icons/lib/io/person';

import ItemActionTabs from '../../shared/components/ItemActionTabs';
import ItemActionTabsMenu from '../../shared/components/ItemActionTabsMenu';
import ItemActionTabButton from '../../shared/components/ItemActionTabButton';

const UserActionTabs = (props) => <ItemActionTabs>
  <ItemActionTabsMenu>
    <ItemActionTabButton disabled />
    <ItemActionTabButton disabled />
    <ItemActionTabButton
      icon={<IoPerson />}
      hero
      disabled
    />
    <ItemActionTabButton disabled />
    <ItemActionTabButton disabled />
  </ItemActionTabsMenu>
</ItemActionTabs>;

UserActionTabs.propTypes = {
};

UserActionTabs.contextTypes = {
};

export default UserActionTabs;
