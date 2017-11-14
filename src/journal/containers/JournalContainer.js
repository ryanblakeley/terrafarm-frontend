import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import moment from 'moment';
import NotFoundPage from 'not-found/components/NotFoundPage';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import Layout from 'shared/components/Layout';
import { WarningMessage } from 'shared/components/Typography';
import Menu from 'shared/components/Menu';
import { JournalIcon } from 'shared/components/Icons';
import { Form, DatePicker } from 'shared/components/Form';
// import classNames from 'journal/styles/JournalContainerStylesheet.css';

const styles = {
  textField: {
    cursor: 'pointer',
    width: 76,
  },
};

const propTypes = {
  currentPerson: PropTypes.object.isRequired,
  children: PropTypes.node,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

const defaultProps = {
  children: null,
};

class JournalContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  handleChangeDate = (foo, date) => {
    const { router } = this.props;
    const routeDate = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD');
    router.push(`/journal/${routeDate}`);
  }
  render () {
    const {
      currentPerson: user,
      children,
      router,
      location,
    } = this.props;
    const userId = user && user.rowId;

    if (!userId) return <NotFoundPage message={'User not found.'} />;

    const emptyJournalWarning = <WarningMessage>Journal empty</WarningMessage>; // TODO: index

    const date = location.pathname.split('/')[2];
    const displayDate = new Date(moment(date, 'YYYY-MM-DD'));

    return <TransitionWrapper>
      <Layout page >
        <Menu
          baseUrl={'/journal'}
          header={{ icon: <JournalIcon />, title: 'Journal' }}
          disabled
          router={router}
          location={location}
        />
        <Form>
          <Layout center >
            <DatePicker
              autoOk
              onChange={this.handleChangeDate}
              name={'date'}
              defaultDate={displayDate}
              textFieldStyle={styles.textField}
              mode={'portrait'}
              container={'dialog'}
            />
          </Layout>
        </Form>
      </Layout>
      <Layout topSmall >
        {children || emptyJournalWarning}
      </Layout>
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
    }
  `,
);
