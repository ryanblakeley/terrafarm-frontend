import PropTypes from 'prop-types';
import React from 'react';
import { H2 } from 'shared/components/Typography';
import classNames from '../styles/MenuListItemStylesheet.css';

const propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  closeImmediate: PropTypes.func,
  // disabled: PropTypes.bool,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

const defaultProps = {
  closeImmediate: false,
  disabled: false,
};

class MenuListItem extends React.Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;
  handleClick =() => {
    const { baseUrl, url, closeImmediate, router, location } = this.props;
    router.push({
      pathname: `${baseUrl}/${url}`,
      query: location.query,
      state: location.state,
    });
    closeImmediate();
  }
  render () {
    const { icon, title } = this.props;
    return <div className={classNames.this} onTouchTap={this.handleClick} >
      <div className={classNames.flexWrapper}>
        <div className={classNames.iconWrapper}>
          {React.cloneElement(icon, { className: classNames.iconSize })}
        </div>
        <div className={classNames.titleWrapper}>
          <H2 className={classNames.title}>{title}</H2>
        </div>
      </div>
    </div>;
  }
}

export default MenuListItem;
