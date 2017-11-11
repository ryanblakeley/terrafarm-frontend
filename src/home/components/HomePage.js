/* eslint-disable no-unused-vars, max-len */
import React from 'react';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import Layout from 'shared/components/Layout';
import { AppName, H3, H4, P, WarningMessage, A, UL, LI } from 'shared/components/Typography';
import { LogoFullIcon } from 'shared/components/Icons';
import classNames from '../styles/HomePageStylesheet.css';

const LogoLarge = () => <AppName className={classNames.appName}>
  <LogoFullIcon className={classNames.logoImage} width={'auto'} height={'auto'} />
</AppName>;

const Tagline = () => <Layout
  center
  style={{ width: '90%' }}
>
  <P large>
    Keep a food journal through text messaging.
  </P>
  <H4>
    971-123-4567
  </H4>
</Layout>;

// Text messaging nutrition assistant
// Personal nutrition chatbot
// personal assistant for nutrition
// chatbot for nutrition
// nutrition personal assistant
// Have a conversation about nutrition
// A text-message bot for nutrition.
// A personal nutrition app that works over text-messaging.
// Text-message with a bot about the food you eat to record your calories and nutrients in an online journal.

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
    {/* <MoreInfo /> */}
  </Layout>
</TransitionWrapper>;

export default HomePage;
