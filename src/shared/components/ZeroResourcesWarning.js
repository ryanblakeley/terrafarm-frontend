import React from 'react';
import {Link} from 'react-router';
import classNames from '../styles/ZeroResourcesWarningStylesheet.css';

const LinkToGuide = _ => <Link
  to={'/docs/how-to-post-a-resource'}
  className={classNames.link}
>
  here
</Link>;

const ZeroResourcesWarning = props => <div className={classNames.this}>
  <p className={classNames.text}>
    You have not posted any resources. To post a resource, check <LinkToGuide />.
  </p>
</div>;

ZeroResourcesWarning.propTypes = {
  // text: React.PropTypes.string,
};

ZeroResourcesWarning.defaultProps = {
};

export default ZeroResourcesWarning;
