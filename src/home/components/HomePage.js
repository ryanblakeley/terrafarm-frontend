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
  <P large >
    Personal nutrition
  </P>
  <H4>
    (email info@terra.farm to request access)
  </H4>
  <P>
    Have a text conversation about the food you eat.
  </P>
  <H4>
    terra.farm/login
  </H4>
  <P>
    Login to review your food journal.
  </P>
</Layout>;

// Personal nutrition chatbot
// personal assistant for nutrition
// chatbot for nutrition
// nutrition personal assistant
// conversational
// a conversational app for nutrition
// a conversational app about nutrition
// Have a conversation about nutrition
// A bot that has a coversation with you about nutrition.
// A conversational app for nutrition.
// A text-message bot for nutrition.
// Personal nutrition text-message bot
// A personal nutrition app that works over text-messaging.
// A conversational app for personal nutrition.
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
    <MoreInfo />
  </Layout>
</TransitionWrapper>;

export default HomePage;
