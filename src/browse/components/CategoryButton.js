import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import classNames from 'classnames/bind';
import classNamesContext from '../styles/CategoryButtonStylesheet.css';

const cx = classNames.bind(classNamesContext);

export default class CategoryButton extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    handleNotify: React.PropTypes.func.isRequired,
    active: React.PropTypes.bool,
    activeEntity: React.PropTypes.oneOf(['users', 'locations', 'resources']),
  };
  static contextTypes = {
    location: React.PropTypes.object,
    router: React.PropTypes.object,
  };
  static defaultProps = {
    active: false,
  };
  handleClick = () => {
    const {name, handleNotify, activeEntity} = this.props;
    const {router} = this.context;

    if (handleNotify) {
      handleNotify(name);
    }

    router.push({
      pathname: '/browse',
      query: {
        entities: activeEntity,
        category: name,
      },
    });
  }
  render () {
    const {name, active} = this.props;

    return <FlatButton
      primary={active}
      secondary={!active}
      className={cx({
        this: true,
        active,
      })}
      label={name}
      onClick={this.handleClick}
    />;
  }
}
