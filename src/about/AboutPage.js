import React from 'react';
import Notice from './components/Notice';
import Contact from './components/Contact';
import CompanyInfo from './components/CompanyInfo';
import Acknowledgements from './components/Acknowledgements';
import NumberedList from '../shared/components/NumberedList';
import classNames from './styles/AboutPageStylesheet.css';

const AboutPage = () => <div className={classNames.this}>
  <Notice />
  <Contact />
  <NumberedList
    title={'Roadmap'}
    listItems={[
      'Allow tasks to connect to organizations so members can delegate organization resources to tasks.',
      'Add availability features for resources.',
      'Add scheduling features for tasks.',
      'Add an activity feed.',
      'Add email and text message notifications.',
      'Allow users to register task outputs as new resources.',
    ]}
  />
  <Acknowledgements />
  <CompanyInfo />
</div>;

export default AboutPage;
