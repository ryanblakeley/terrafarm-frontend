import React from 'react';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import Layout from 'shared/components/Layout';
import { AppName, P } from 'shared/components/Typography';
import { LogoFullIcon } from 'shared/components/Icons';
import classNames from '../styles/HomePageStylesheet.css';

const LogoLarge = () => <AppName className={classNames.appName}>
  <LogoFullIcon className={classNames.logoImage} width={'auto'} height={'auto'} />
</AppName>;

const Tagline = () => <Layout
  center
  style={{ width: '90%', maxWidth: 550 }}
>
  <P large>
    Track your eating via text messaging.
  </P>
</Layout>;

const HomePage = () => <TransitionWrapper>
  <Layout page center bottomMedium>
    <LogoLarge />
    <Tagline />
  </Layout>
</TransitionWrapper>;

export default HomePage;
