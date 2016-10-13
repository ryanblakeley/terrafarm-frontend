import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import transitionNames from '../styles/_transitions.css';
/*
const TransitionWrapper = props => <CSSTransitionGroup
  transitionName={transitionNames}
  transitionAppear
  transitionAppearTimeout={350}
  transitionEnterTimeout={350}
  transitionLeave={false}
>
  {props.children}
</CSSTransitionGroup>;
*/
const TransitionWrapper = props => <div>
  {props.children}
</div>;

TransitionWrapper.propTypes = {
  children: React.PropTypes.object,
};

export default TransitionWrapper;
