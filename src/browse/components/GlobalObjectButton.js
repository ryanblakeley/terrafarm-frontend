import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import classNames from 'classnames/bind';
import classNamesContext from '../styles/GlobalObjectButtonStylesheet.css';

const cx = classNames.bind(classNamesContext);

export default class GlobalObjectButton extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    // handleNotify: React.PropTypes.func.isRequired,
    // active: React.PropTypes.bool,
  };
  static contextTypes = {
    location: React.PropTypes.object,
    router: React.PropTypes.object,
  };
  state = {
    active: false,
  };
  componentWillMount () {
    const {query} = this.context.location;
    this.handleQuery(query);
  }
  componentWillReceiveProps (nextProps, nextContext) {
    const {query} = nextContext.location;
    this.handleQuery(query);
  }
  handleQuery (query) {
    const {name} = this.props;
    const {objects} = query;

    if (objects) {
      this.setState({
        active: objects.search(name) > -1,
      });
    }
  }
  handleClick = () => {
    const {name} = this.props;
    const {location, router} = this.context;

    router.push({
      pathname: location.pathname,
      query: {objects: name},
    });
  }
  render () {
    const {name} = this.props;
    const {active} = this.state;

    return <FlatButton
      secondary={!active}
      primary={active}
      className={cx({
        this: true,
        active,
      })}
      label={name}
      onClick={this.handleClick}
    />;
  }
}
