import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import Layout from 'shared/components/Layout';
import { WarningMessage } from 'shared/components/Typography';
import Menu from 'shared/components/Menu';
import ActionPanel from 'shared/components/ActionPanel';
import { BookmarkIcon } from 'shared/components/Icons';
import ColumnLabels from 'shared/components/ColumnLabels';
import PresetContainer from './PresetContainer';
import classNames from '../styles/PresetsContainerStylesheet.css';

const propTypes = {
  currentPerson: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  children: PropTypes.element,
};

const defaultProps = {
  children: null,
};

class PresetsContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render () {
    const {
      currentPerson: user,
      router,
      location,
      children,
    } = this.props;
    const presets = user && user.presetsByUserId;
    const presetContainers = presets.edges.map(({ node }) => (
      <PresetContainer key={node.id} preset={node} />
    ));
    const emptyPresetsWarning = <WarningMessage>Presets empty.</WarningMessage>;

    return <TransitionWrapper>
      <Layout page>
        <Menu
          baseUrl={'/presets'}
          header={{ icon: <BookmarkIcon />, title: 'Presets' }}
          disabled
          router={router}
          location={location}
        />
      </Layout>
      <Layout topSmall className={classNames.this} >
        <Layout className={classNames.journalDatesWrapper} >
          <ColumnLabels />
          {presetContainers.length > 0 ? presetContainers : emptyPresetsWarning}
        </Layout>
        {children && <Layout className={classNames.actionPanelWrapper} >
          <ActionPanel
            notifyClose={() => router.replace('/presets')}
          >
            {children}
          </ActionPanel>
        </Layout>}
      </Layout>
    </TransitionWrapper>;
  }
}

PresetsContainer.propTypes = propTypes;
PresetsContainer.defaultProps = defaultProps;

export default createFragmentContainer(
  PresetsContainer,
  graphql`
    fragment PresetsContainer_currentPerson on User {
      id,
      rowId,
      presetsByUserId(
        first: 2147483647,
        orderBy: CREATED_AT_DESC
      ) {
        edges {
          node {
            id
            name
            userId
            presetSelectionsByPresetId(first: 2147483647) {
              edges {
                node {
                  foodSelectionBySelectionId {
                    rowId
                    foodDescription
                    unitAmount
                    unitDescription
                    mass
                    foodId
                    foodByFoodId {
                      rowId
                      calories
                      protein
                      fat
                      carbs
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `,
);

/*
const menuList = [
            {
              icon: <JournalIcon />,
              title: 'Journal',
              baseUrl: '',
              url: 'journal',
              disabled: false,
            },
            {
              icon: <FoodIcon />,
              title: 'Foods',
              baseUrl: '',
              url: 'food',
              disabled: false,
            },
          ]}

*/
