import PropTypes from 'prop-types';
import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import transitionNames from '../styles/_transitions.css';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const TransitionWrapper = props => <CSSTransitionGroup
  transitionName={transitionNames}
  transitionAppear
  transitionLeave={false}
  transitionAppearTimeout={350}
  transitionEnterTimeout={350}
>
  {props.children}
</CSSTransitionGroup>;

TransitionWrapper.propTypes = propTypes;

export default TransitionWrapper;
