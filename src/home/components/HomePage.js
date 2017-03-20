/* eslint-disable max-len */
import React from 'react';
import TransitionWrapper from 'shared/components/TransitionWrapper';
// import NumberedList from 'shared/components/NumberedList';
import Layout from 'shared/components/Layout';
import {FlatButton} from 'shared/components/Material';
import {AppName, P, Link} from 'shared/components/Typography';
import {LogoFullIcon} from 'shared/components/Icons';
import HomeButtons from './HomeButtons';
import classNames from '../styles/HomePageStylesheet.css';

const LogoLarge = props => <AppName className={classNames.appName}>
  <LogoFullIcon className={classNames.logoImage} width={'auto'} height={'auto'} />
</AppName>;

const Tagline = () => <Layout center style={{width: '90%', maxWidth: 410}}>
  <P large>
    Pay farmers up front for seasonal product credits. When you have more than you can eat: trade and donate credits.
  </P>
</Layout>;

const browseLink = <Link to={'/browse'}>
  <FlatButton
    label={'Powered by local farms'}
    secondary
    labelStyle={{fontSize: 18}}
  />
</Link>;
/*
const HowItWorks = () => <Layout smallPage>
  <NumberedList
    title={'How It Works'}
    listItems={[
      'Farmer A lists a scheduled product.',
      'Customer R reserves a product share.',
      'Farmer A approves shareholder R and vouchers are issued.',
      'When product is distributed, shareholder R trades in a voucher token which farmer A validates.',
    ]}
  />
</Layout>;
*/
const HomePage = props => <TransitionWrapper>
  <Layout page center bottomMedium>
    <LogoLarge />
    <Tagline />
    <Layout topMedium>
      {browseLink}
    </Layout>
    <HomeButtons />
  </Layout>
</TransitionWrapper>;

export default HomePage;
