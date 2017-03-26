import React from 'react';
import Layout from 'shared/components/Layout';
import classNames from '../styles/LoadingStylesheet.css';

const DoubleBounceSpinner = _ => <div className={classNames.spinner}>
  <div className={classNames.doubleBounce1} />
  <div className={classNames.doubleBounce2} />
</div>;

const Loading = _ => <Layout page>
  <DoubleBounceSpinner />
</Layout>;

export default Loading;

// import {P} from 'shared/components/Typography';
// <P>Loading...</P>