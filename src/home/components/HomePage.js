/* eslint-disable no-unused-vars, max-len */
import React from 'react';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import Layout from 'shared/components/Layout';
import { AppName, P, WarningMessage, A, UL, LI } from 'shared/components/Typography';
import { LogoFullIcon } from 'shared/components/Icons';
import classNames from '../styles/HomePageStylesheet.css';

const LogoLarge = () => <AppName className={classNames.appName}>
  <LogoFullIcon className={classNames.logoImage} width={'auto'} height={'auto'} />
</AppName>;

const Tagline = () => <Layout
  center
  style={{ width: '90%', maxWidth: 450 }}
>
  <P large>
    Track your diet by text messaging about the food you eat.
  </P>
</Layout>;

const emailLinkSubject = encodeURIComponent('Request for access');
// const emailLinkBody = encodeURIComponent('Hi,\n\n');
const emailLinkUrl = `mailto:info@terra.farm?subject=${emailLinkSubject}`;
const emailLink = <A
  href={emailLinkUrl}
  target={null}
  style={{ textDecoration: 'underline' }}
>
  info@terra.farm
</A>;

const MoreInfo = () => <Layout
  center
  style={{ width: '90%', maxWidth: 350, textAlign: 'center' }}
>
  <P>
    <WarningMessage>
      Email {emailLink} to get access.
    </WarningMessage>
  </P>
</Layout>;
/*
  <UL plumb >
    <LI noBullet ></LI>
    <LI noBullet ></LI>
  </UL>
*/
const HomePage = () => <TransitionWrapper>
  <Layout page center bottomMedium>
    <LogoLarge />
    <Tagline />
    <MoreInfo />
  </Layout>
</TransitionWrapper>;

export default HomePage;
