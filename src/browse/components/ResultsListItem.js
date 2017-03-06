import React from 'react';
import {
  LocationIcon,
  LocationOutlineIcon,
  LinkIcon,
} from 'shared/components/Icons';
import {IconButton} from 'shared/components/Material';
import classNamesContext from 'classnames/bind';
import classNames from '../styles/ResultsListItemStylesheet.css';

const cx = classNamesContext.bind(classNames);
const styles = {
  button: {
    padding: 6, width: 36, height: 36,
  },
};

class ResultsListItem extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    itemUrl: React.PropTypes.string,
    itemId: React.PropTypes.string,
    active: React.PropTypes.bool,
    setActive: React.PropTypes.func,
    isAdmin: React.PropTypes.bool,
  };
  static contextTypes = {
    router: React.PropTypes.object,
  };
  handleClick = _ => {
    const {setActive, itemId} = this.props;
    setActive(itemId);
  }
  handleLink = _ => {
    const { itemUrl, itemId } = this.props;
    const {router} = this.context;
    router.push(`/${itemUrl}/${itemId}`);
  }
  render () {
    const { name, active } = this.props;

    return <div className={cx({this: true, active})}>
      <IconButton style={styles.button} onClick={this.handleClick}>
        {active
          ? <LocationIcon className={classNames.icon} />
          : <LocationOutlineIcon className={classNames.icon} />
        }
      </IconButton>
      <IconButton onClick={this.handleLink}>
        <LinkIcon className={classNames.icon} />
      </IconButton>
      <span>{name}</span>
    </div>;
  }
}

export default ResultsListItem;
