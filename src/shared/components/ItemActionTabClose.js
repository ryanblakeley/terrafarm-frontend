import React from 'react';
import IconButton from 'material-ui/IconButton';
import MdClose from 'react-icons/lib/md/close';

import classNames from '../styles/ItemActionTabCloseStylesheet.css';

const ItemActionTabClose = props => <div className={classNames.this}>
  <IconButton className={classNames.button} onClick={props.notifyClose}>
    <MdClose className={classNames.icon} />
  </IconButton>
</div>;

ItemActionTabClose.propTypes = {
  notifyClose: React.PropTypes.func,
};

export default ItemActionTabClose;
