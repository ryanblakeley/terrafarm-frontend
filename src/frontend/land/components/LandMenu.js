import React from 'react';
import IoCube from 'react-icons/lib/io/cube';
import GoRepo from 'react-icons/lib/go/repo';
import IoIosLocation from 'react-icons/lib/io/ios-location';
import IoIosHeart from 'react-icons/lib/io/ios-heart';
import PageMenu from '../../shared/components/PageMenu';
import PageMenuItem from '../../shared/components/PageMenuItem';
import PageMenuSubMenuItem from '../../shared/components/PageMenuSubMenuItem';

const LandMenu = (props) => <PageMenu>
  <PageMenuItem disabled />
  <PageMenuItem disabled={!props.isAdmin} icon={<GoRepo />} >
    <PageMenuSubMenuItem
      text={'New Project'}
      path={'new-project'}
    />
  </PageMenuItem>
  <PageMenuItem disabled={!props.isAdmin} icon={<IoIosLocation large />} >
    <PageMenuSubMenuItem
      text={'Edit Land'}
      path={'edit-land'}
    />
  </PageMenuItem>
  <PageMenuItem icon={<IoCube />} >
    <PageMenuSubMenuItem
      text={'Offer Resource'}
      path={'offer-resource'}
    />
  </PageMenuItem>
  <PageMenuItem icon={<IoIosHeart />}>
    <PageMenuSubMenuItem
      text={'Like'}
      path={'like'}
    />
  </PageMenuItem>
</PageMenu>;

LandMenu.propTypes = {
  isAdmin: React.PropTypes.bool,
};

export default LandMenu;
