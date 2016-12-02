import React from 'react';
import IconButton from 'material-ui/IconButton';
import IoIosLocation from 'react-icons/lib/io/ios-location';
import IoIosLocationOutline from 'react-icons/lib/io/ios-locatoutline';
import IoLink from 'react-icons/lib/io/link';
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
      {active
        ? <IconButton style={styles.button} onClick={this.handleClick}>
          <IoIosLocation className={classNames.icon} />
        </IconButton>
        : <IconButton style={styles.button} onClick={this.handleClick}>
          <IoIosLocationOutline className={classNames.icon} />
        </IconButton>
      }
      <IconButton onClick={this.handleLink}>
        <IoLink className={classNames.icon} />
      </IconButton>
      <span className={classNames.name}>
        {name}
      </span>
    </div>;
  }
}

export default ResultsListItem;
