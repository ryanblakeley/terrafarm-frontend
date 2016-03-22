import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import MdMailOutline from 'react-icons/lib/md/mail-outline';

import transitionNames from '../../../shared/styles/transitions.css';
import classNames from './styles/AboutPageStylesheet.css';

export default class AboutPage extends React.Component {
  static propTypes = {
    linkUrls: React.PropTypes.objectOf(React.PropTypes.string),
  };
  static defaultProps = {
    linkUrls: {
      workforce: 'https://www.agclassroom.org/gan/timeline/farmers_land.htm',
      nature: 'http://www.cowspiracy.com/facts/',
      wwoof: 'http://www.wwoof.net/',
      feedback: 'mailto:terrafarmapp+feedback@gmail.com',
    },
  };
  render () {
    const {linkUrls} = this.props;

    return <CSSTransitionGroup
      transitionName={transitionNames}
      transitionAppear
      transitionAppearTimeout={350}
      transitionEnterTimeout={350}
      transitionLeave={false}
    >
      <div className={classNames.this}>
        <h2 className={classNames.pageHeading}>About</h2>
        <div className={classNames.content}>

          <h4 className={classNames.contentSubheading}>Questions</h4>
          <p>
            What are the principles of success for community farms?
          </p>
          <p>
            Would it be possible to create a web app that improves community farming?
          </p>

          <h4 className={classNames.contentSubheading}>Motivations</h4>
          <p>
            Farming at its best is an expression of thoughtful stewardship, 
            manual labor, and natural ecologies. The importance of healthy and 
            resilient living systems that provide nutrition and flavor should
            be appreciated.
          </p>
          <p>
            Industrial agriculture is destroying life on this planet faster than
            any other human activity. Industrial food is distributed all over 
            the world only to be passively eaten or end up in landfills.
          </p>
          <p>
            In the face of climate change, soil depletion, coastal flooding,
            and growing populations, a proliferation of sustainable farms is 
            hugely important.
          </p>

          <h4 className={classNames.contentSubheading}>Goals</h4>
          <p>
            Learn and share the wisdom of successful community farms and food cultures.
          </p>
          <p>
            Increase contact between resource owners and people interested in real food.
          </p>
          <p>
            Provide software for community farm research, design, and operation.
          </p>

          <h4 className={classNames.contentSubheading}>User Interface</h4>
          <p>
            A <strong>location</strong> is any place where food may be cultivated:
          </p>
          <ul className={classNames.bulletList}>
            <li>Yard</li>
            <li>Garage</li>
            <li>Porch</li>
            <li>Rooftop</li>
          </ul>
          <p>
            A <strong>resource</strong> is any project input, including:
          </p>
          <ul className={classNames.bulletList}>
            <li>Equipment</li>
            <li>Labor</li>
            <li>Materials</li>
            <li>Compost</li>
            <li>Seeds</li>
          </ul>
          <p>
            Favoriting a location enables you to offer your resources to that
            location. If you offer a resource, the location admin reviews the
            offer which includes your email address.
          </p>
          <h4 className={classNames.contentSubheading}>Feedback</h4>
          <p>
            If you encounter a problem with the app, have a question, or a comment,
            please send us an <a href={linkUrls.feedback} className={classNames.bodyLink}>email</a>.
          </p>
          <p>
            We look forward to hearing from you!
          </p>
        </div>
      </div>
    </CSSTransitionGroup>;
  }
}
