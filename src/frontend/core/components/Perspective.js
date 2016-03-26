import React from 'react';
import MainMenu from './main-menu/MainMenu';
import MainMenuToggle from './main-menu/components/MainMenuToggle';
import Footer from './Footer';

import classNames from 'classnames/bind';
import classNamesContext from '../styles/PerspectiveStylesheet.css';
const cx = classNames.bind(classNamesContext);

export default class Perspective extends React.Component {
  static propTypes = {
    transEndEventNames: React.PropTypes.array,
    children: React.PropTypes.object,
  };
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
    loggedIn: React.PropTypes.bool,
  };
  static defaultProps = {
    transEndEventNames: [
      'webkitTransitionEnd',
      'transitionend',
      'oTransitionEnd',
      'MSTransitionEnd',
      'transitionend',
    ],
  };
  constructor (props) {
    super(props);
    this.state = {
      docScroll: 0,
      contentScroll: 0,
      modalview: false,
      animate: false,
      transform: false,
      menuShouldClose: true,
    };
  }
  scrollY () {
    return window.pageYOffset || window.document.documentElement.scrollTop;
  }
  handleMenuClick = () => {
    if (this.state.menuShouldClose) {
      this.handleShowMainMenu();
    }
    this.handleHideMainMenu();
  }
  handleShowMainMenu = () => {
    const scrollY = this.scrollY();
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    this.setState({
      docScroll: scrollY,
      contentScroll: scrollY * -1,
      modalview: true,
      menuShouldClose: false,
    });
    setTimeout(() => {
      this.setState({
        animate: true,
      });
    }, 25);
  }
  handleHideMainMenu = () => {
    const {transEndEventNames} = this.props;
    const {perspectiveWrapper, container} = this.refs;

    this.setState({transform: true, menuShouldClose: true});
    if (this.state.animate) {
      const onEndTransFn = (event) => {
        if (event.target !== container || event.propertyName.indexOf('transform') === -1) return;

        for (let i = 0; i < transEndEventNames.length; i += 1) {
          perspectiveWrapper.removeEventListener(transEndEventNames[i], onEndTransFn);
        }

        this.setState({
          contentScroll: 0,
          modalview: false,
          transform: false,
        });
        // mac chrome issue
        document.body.scrollTop = document.documentElement.scrollTop = this.state.docScroll;
      };

      for (let i = 0; i < transEndEventNames.length; i += 1) {
        perspectiveWrapper.addEventListener(transEndEventNames[i], onEndTransFn);
      }

      this.setState({animate: false});
    }
  }
  handleNullTap = () => {
    return false;
  }
  render () {
    return (
      <div
        ref={'perspectiveWrapper'}
        className={cx({
          perspective: true,
          'effect-movedown': true,
          modalview: this.state.modalview,
          animate: this.state.animate,
        })}
        onTouchTap={this.handleNullTap}
      >
        <div
          ref={'container'}
          className={cx({
            container: true,
            transform: this.state.transform,
          })}
          onTouchTap={this.handleHideMainMenu}
        >
          <MainMenuToggle onClick={this.handleMenuClick} />

          <div
            ref={'contentWrapper'}
            className={cx({wrapper: true})}
            style={{top: this.state.contentScroll}}
          >
            {React.cloneElement(this.props.children, {
              key: this.context.router.pathname,
            })}
          </div>

          <Footer />
        </div>
        <nav
          className={cx({
            'outer-nav': true,
            transform: this.state.transform,
          })}
        >
          <MainMenu
            close={this.state.menuShouldClose}
            onHide={this.handleHideMainMenu}
          />
        </nav>
      </div>
    );
  }
}
/*
import MenuGoo from './MenuGoo';
<MenuGoo
  shouldClose={this.state.menuShouldClose}
  onShow={this.handleShowMainMenu}
  onHide={this.handleHideMainMenu}
/>
*/
