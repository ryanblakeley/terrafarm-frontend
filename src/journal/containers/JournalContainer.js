import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import NotFoundPage from 'not-found/components/NotFoundPage';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import Layout from 'shared/components/Layout';
import { P, WarningMessage } from 'shared/components/Typography';
import Menu from 'shared/components/Menu';
import ActionPanel from 'shared/components/ActionPanel';
import { JournalIcon, BookmarkIcon, FoodIcon, PersonIcon } from 'shared/components/Icons';
import ColumnLabels from 'shared/components/ColumnLabels';
import JournalDateRootContainer from 'journal/containers/JournalDateRootContainer';
import classNames from '../styles/JournalContainerStylesheet.css';

const propTypes = {
  currentPerson: PropTypes.object.isRequired,
  children: PropTypes.object,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  relay: PropTypes.object.isRequired,
};

const defaultProps = {
  children: null,
};

class JournalContainer extends React.Component {
  constructor (props) {
    super(props);

    const { currentPerson: user } = props;
    const latestRecord = user && user.foodSelectionsByUserId.edges[0];
    const oldestRecord = user
      && user.foodSelectionsByUserId.edges[user.foodSelectionsByUserId.edges.length - 1];
    const latestRecordDate = latestRecord && latestRecord.node.date;
    const oldestRecordDate = oldestRecord && oldestRecord.node.date;
    const datesCount = 4;

    this.state = {
      latestDate: latestRecordDate,
      oldestDate: oldestRecordDate,
      datesCount,
    };
  }
  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillReceiveProps (nextProps) {
    const { currentPerson: user } = nextProps;
    const latestRecord = user && user.foodSelectionsByUserId.edges[0];
    const oldestRecord = user
      && user.foodSelectionsByUserId.edges[user.foodSelectionsByUserId.edges.length - 1];
    const latestRecordDate = latestRecord && latestRecord.node.date;
    const oldestRecordDate = oldestRecord && oldestRecord.node.date;

    if (latestRecordDate !== this.state.latestDate) {
      this.setState({ latestDate: latestRecordDate });
    }

    if (oldestRecordDate !== this.state.oldestDate) {
      this.setState({ oldestDate: oldestRecordDate });
    }
  }
  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll);
  }
  getDates (date, datesCount) {
    const dates = [];

    if (date) {
      for (let i = 0; i < datesCount; i += 1) {
        dates[i] = this.dateByDaysAgo(date, i);
      }
    }

    return dates;
  }
  dateByDaysAgo = (date, daysAgo) => {
    const d = new Date(date.replace(/-/g, '/')); // fixes date string parsing
    d.setDate(d.getDate() - daysAgo);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }
  handleScroll = () => {
    const windowHeight = 'innerHeight' in window
      ? window.innerHeight
      : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight) {
      // Add dates to view if older journal records exist
      const { latestDate, oldestDate, datesCount } = this.state;
      const hasMoreDates = latestDate && oldestDate && (
        new Date(this.dateByDaysAgo(latestDate, datesCount)) >=
        new Date(this.dateByDaysAgo(oldestDate, 0))
      );

      if (hasMoreDates) {
        this.setState({
          datesCount: this.state.datesCount += 1,
        });
      }
    }
  }
  render () {
    const {
      currentPerson: user,
      children,
      router,
      location,
      match,
      relay,
    } = this.props;
    const { latestDate, oldestDate, datesCount } = this.state;
    const userId = user && user.rowId;

    if (!userId) return <NotFoundPage message={'User not found.'} />;

    const dates = this.getDates(latestDate, datesCount);
    const hasMoreDates = latestDate && oldestDate && (
      new Date(dates[dates.length - 1]) > new Date(this.dateByDaysAgo(oldestDate, 0))
    );

    const journalDateRootContainers = dates.map(d => (
      <JournalDateRootContainer
        key={d}
        date={d}
        router={router}
        match={match}
        relay={relay}
      />
    ));
    const emptyJournalWarning = <WarningMessage>Journal empty.</WarningMessage>;

    return <TransitionWrapper>
      <Layout page >
        <Menu
          baseUrl={'/journal'}
          header={{ icon: <JournalIcon />, title: 'Journal' }}
          disabled={false}
          router={router}
          location={location}
          list={[
            {
              icon: <PersonIcon />,
              title: 'Profile',
              baseUrl: '',
              url: 'profile',
              disabled: false,
            },
            {
              icon: <FoodIcon />,
              title: 'Foods',
              baseUrl: '',
              url: 'food',
              disabled: false,
            },
            {
              icon: <BookmarkIcon />,
              title: 'Presets',
              baseUrl: '',
              url: 'presets',
              disabled: false,
            },
          ]}
        />
      </Layout>
      <Layout topSmall className={classNames.this} >
        <Layout className={classNames.journalDatesWrapper} >
          <ColumnLabels />
          {dates.length > 0 ? journalDateRootContainers : emptyJournalWarning}
        </Layout>
        {children && <Layout className={classNames.actionPanelWrapper} >
          <ActionPanel
            notifyClose={() => router.replace('/journal')}
          >
            {children}
          </ActionPanel>
        </Layout>}
      </Layout>
      {hasMoreDates && <P center >
        <WarningMessage>
          Scroll for more dates
        </WarningMessage>
      </P>}
    </TransitionWrapper>;
  }
}

JournalContainer.propTypes = propTypes;
JournalContainer.defaultProps = defaultProps;

export default createFragmentContainer(
  JournalContainer,
  graphql`
    fragment JournalContainer_currentPerson on User {
      id,
      rowId,
      foodSelectionsByUserId(
        first: 2147483647,
        orderBy: DATE_DESC
      ) {
        edges {
          node {
            id,
            date,
          },
        },
      },
    }
  `,
);
