import React from 'react';
import {Link} from 'react-router';
import classNames from '../styles/AboutPageStylesheet.css';

const AboutPage = () => {
  const emailLink = <a
    className={classNames.link}
    href={'mailto:info@terra.farm'}
  >
    email
  </a>;
  const ryana = <a
    href={'http://rojobuffalo.com'}
    className={classNames.link}
  >
    Ryan Blakeley
  </a>;

  return <div className={classNames.this}>
    <h3 className={classNames.pageHeading}>
      About
    </h3>
    <p className={classNames.text}>
      <Link to={'/'} className={classNames.link}>Terrafarm</Link> exists to improve food system sustainability. This CSA app is for seasonal subscriptions to local farm products.
    </p>
    <h3 className={classNames.heading}>
      Content Library
    </h3>
    <p className={classNames.text}>
      A <a href={'https://terra.farm/blog'} className={classNames.link}>blog</a> and <a href={'https://terra.farm/wiki'} className={classNames.link}>wiki</a> companion site.
    </p>
    <h3 className={classNames.heading}>
      Contact
    </h3>
    <p className={classNames.text}>
      If you have any questions or feedback, please reach out via {emailLink}.
    </p>
    <h3 className={classNames.heading}>
      Technical
    </h3>
    <p className={classNames.text}>
      Check out the Terrafarm CSA software stack on <a href={'https://stackshare.io/terrafarm/terrafarm'}>Stackshare</a>.
    </p>
    <h3 className={classNames.heading}>
      Built by
    </h3>
    <p className={classNames.text}>{ryana}</p>
  </div>;
};

export default AboutPage;

/*
    <ul className={classNames.list}>
      <li className={classNames.text}>
        <Link to={'/blog'} className={classNames.link}>Blog</Link>
      </li>
      <li className={classNames.text}>
        <Link to={'/wiki'} className={classNames.link}>
          Wiki
        </Link>: a catalog of people, organizations, apps, videos, podcasts, articles, and books
      </li>
      <li className={classNames.text}>
        <a href={'/snippets'} className={classNames.link}>
          Snippets
        </a>
      </li>
      <li className={classNames.text}>
        <Link to={'/tags'} className={classNames.link}>
          Tags
        </Link>: core topics are economics, engineering, and ecology
      </li>
      <li className={classNames.text}>
        <Link href={'/search'} className={classNames.link}>
          Search
        </Link>
      </li>
    </ul>
*/
