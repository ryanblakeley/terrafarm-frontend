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
          <h4 className={classNames.contentSubheading}>Motivation</h4>
          <p>
            Small-scale farming with thoughtful stewardship, manual labor, and
            natural ecologies is hard work. Up-front resource requirements are
            prohibitive for many people who are otherwise interested in:
          </p>
          <ul className={classNames.bulletList}>
            <li>Food that tastes better and is more nutritious</li>
            <li>Connection with the natural world</li>
            <li>Efficienct use of space, water, and waste</li>
          </ul>
          <h4 className={classNames.contentSubheading}>Base Premise</h4>
          <p>
            The resources for cultivating better food are right under our noses.
            But assembling those resources to produce something useful requires
            a concert of efforts.
          </p>
          <p>
            Community farming is an ancient concept, but has dropped out of the
            mainstream. Up until this point, there hasn't been a compelling web
            app for organizing community farms and starting new cultivation
            projects close to home.
          </p>
          <h4 className={classNames.contentSubheading}>Using the App</h4>
          <p>Post resources to your profile:</p>
          <ul className={classNames.bulletList}>
            <li>Equipment</li>
            <li>Labor</li>
            <li>Materials</li>
            <li>Compost</li>
            <li>Seeds</li>
          </ul>
          <p>Create a group by posting space:</p>
          <ul className={classNames.bulletList}>
            <li>Yard</li>
            <li>Garage</li>
            <li>Porch</li>
            <li>Rooftop</li>
          </ul>
          <p>
            Favoriting a group enables you to offer your resources to that
            group. The group admin reviews the offer which includes your email
            address.
          </p>
          <h4 className={classNames.contentSubheading}>Feedback</h4>
          <p>
            We have a long way to go towards making this app more useful for its
            intended purpose. It is under active development, so interface
            updates should be expected.
          </p>
          <p>
            If you encounter a bug, please do your best to document it in an
            email sent to <a href={linkUrls.bugs} className={classNames.bodyLink}>
            terrafarmapp+bugs@gmail.com</a>.
          </p>
          <p>
            Thank you for checking us out. Please direct general questions and
            feedback via the button below:
          </p>
        </div>
        <div className={classNames.social}>
          <FloatingActionButton
            linkButton
            href={linkUrls.email}
            className={classNames.button}
            secondary
            touch
          >
            <MdMailOutline className={classNames.icon} />
          </FloatingActionButton>
        </div>
      </div>
    </CSSTransitionGroup>;
  }
}
