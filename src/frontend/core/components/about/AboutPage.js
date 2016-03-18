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
      bugs: 'mailto:terrafarmapp+bug@gmail.com',
      general: 'mailto:terrafarmapp@gmail.com',
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
            Small-scale farming with thoughtful stewardship, manual labor, and
            natural ecologies is hard work. The payoff is healthy and resilient
            living systems and premium flavor.
          </p>
          <p>
            Industrial agriculture is destroying life on this planet faster than
            any other human activity. Food that is robbed of flavor and nutrition
            is distributed all over the world and often ends up in landfills.
          </p>
          <p>
            In the face of today's challenges: climate change, soil depletion,
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
            Favoriting a group enables you to offer your resources to that
            group. If you offer a resource, the group admin reviews the offer
            which includes your email address.
          </p>
          <h4 className={classNames.contentSubheading}>Feedback</h4>
          <p>
            If you encounter a problem with the app, have a question, or a comment,
            please send us an <a href={linkUrls.bugs} className={classNames.bodyLink}>email</a>.
          </p>
          <p>
            We look forward to hearing from you!
          </p>
        </div>
      </div>
    </CSSTransitionGroup>;
  }
}
