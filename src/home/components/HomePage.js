/* eslint-disable max-len */
import React from 'react';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import NumberedList from 'shared/components/NumberedList';
import Layout from 'shared/components/Layout';
import {AppName, H4, P} from 'shared/components/Typography';
import {LogoFullIcon} from 'shared/components/Icons';
import HomeButtons from './HomeButtons';
import classNames from '../styles/HomePageStylesheet.css';

const LogoLarge = props => <AppName className={classNames.appName}>
  <LogoFullIcon className={classNames.logoImage} width={'auto'} height={'auto'} />
</AppName>;

const Tagline = () => <Layout center style={{width: '90%', maxWidth: 550}}>
  <P large>
    Pay farmers up-front for seasonal products.
  </P>
</Layout>;

// Trade and donate credits when you have extra.
// ** Soon it will be also be possible to trade and donate credits.

const HowItWorks = () => <Layout smallPage left>
  <NumberedList
    title={'How does it work?'}
    listItems={[
      'A farmer lists a product that will be harvested later in the season.',
      'A customer reserves a product share which comes with distribution credits.',
      'The farmer approves the shareholder when payment is received. *',
      'Optionally, credits can be verified by the farmer when product is distributed.',
    ]}
  />
  <P>* <i>Face-to-face payments are encouraged and cash is ok. If we have a payment system in the future, it will still be possible to use the app without it.</i></P>
</Layout>;

const WhyUseIt = () => <Layout smallPage left>
  <H4>Why do this?</H4>
  <P>When customers pay in advance, the farmer ends up with <strong>more money early in the season</strong> to improve his or her production run. Customers get to eat the <strong>freshest possible food</strong>, keep dollars in the local economy, connect with an ecological system, and sometimes get a discount.</P>
  <P>During the harvest there might be 20-200 people getting periodic distributions that they already paid for. The farmer has the option of just going by the honor system or a spreadsheet. But using credits makes it possible for the farmer to do a quick scan to verify a distribution and have it automatically marked in a record-keeping system. It also enables consumers to coordinate trades and donations without the farmer having to deal with anything accept scanning a voucher to see if it is legit.</P>
  <P>Using credits is an optional feature though. The primary reason to use this is that it gives the farmer a really easy way to promote a planned product and register shareholders.</P>
</Layout>;


const HomePage = props => <TransitionWrapper>
  <Layout page center bottomMedium>
    <LogoLarge />
    <Tagline />
    <HomeButtons />
    <HowItWorks />
    <WhyUseIt />
  </Layout>
</TransitionWrapper>;

export default HomePage;
