import React from 'react';
import GlobalObjectButton from './GlobalObjectButton';
import classNames from '../styles/GlobalObjectMenuStylesheet.css';

const GlobalObjectMenu = _ => <div className={classNames.this} >
  <GlobalObjectButton name={'users'} />
  <GlobalObjectButton name={'resources'} />
  <GlobalObjectButton name={'organizations'} />
  <GlobalObjectButton name={'projects'} />
  <GlobalObjectButton name={'tasks'} />
</div>;

export default GlobalObjectMenu;

/*
  static propTypes = {
    activeEntity: React.PropTypes.string,
    notifySelectEntity: React.PropTypes.func,
  };
  render () {
    const {activeEntity, notifySelectEntity} = this.props;

      <EntityButton
        handleNotify={notifySelectEntity}
        name={'users'}
        active={activeEntity === 'users'}
      />
      <EntityButton
        handleNotify={notifySelectEntity}
        name={'locations'}
        active={activeEntity === 'locations'}
      />
      <EntityButton
        handleNotify={notifySelectEntity}
        name={'resources'}
        active={activeEntity === 'resources'}
      />
*/
