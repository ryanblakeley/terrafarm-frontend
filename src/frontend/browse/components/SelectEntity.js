import React from 'react';
import EntityButton from './EntityButton';

import classNames from '../styles/SelectEntityStylesheet.css';

export default class SelectEntity extends React.Component {
  /*
  static propTypes = {
    activeEntity: React.PropTypes.string,
    notifySelectEntity: React.PropTypes.func,
  };
  */
  render () {
/*
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
    return <div className={classNames.this} >
      <EntityButton name={'users'} />
      <EntityButton name={'lands'} />
      <EntityButton name={'resources'} />
    </div>;
  }
}
