import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import Layout from 'shared/components/Layout';
import { FlatButton } from 'shared/components/Material';
import { WarningMessage } from 'shared/components/Typography';
import Menu from 'shared/components/Menu';
import { BookmarkIcon } from 'shared/components/Icons';
import ColumnLabels from 'shared/components/ColumnLabels';
import PresetContainer from './PresetContainer';
import classNames from '../styles/PresetsContainerStylesheet.css';

const propTypes = {
  currentPerson: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  children: PropTypes.element,
  relay: PropTypes.object.isRequired,
};

const defaultProps = {
  children: null,
};

class PresetsContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  handleClickNew = () => {
    const { router, location } = this.props;
    router.replace(`${location.pathname}/new`);
  }
  render () {
    const {
      currentPerson: user,
      router,
      location,
      children,
      relay,
    } = this.props;
    const presets = user && user.presetsByUserId;
    const presetContainers = presets.edges.map(({ node }) => (
      <PresetContainer key={node.id} preset={node} router={router} relay={relay} />
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
        <Layout className={classNames.presetsWrapper} >
          <FlatButton label={'New preset'} onTouchTap={this.handleClickNew} fullWidth />
          <ColumnLabels />
          {presetContainers.length > 0 ? presetContainers : emptyPresetsWarning}
        </Layout>
        {children}
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
        orderBy: [CREATED_ON_DESC]
      ) @connection(key: "PresetsContainer_presetsByUserId", filters: []) {
        edges {
          node {
            id
            rowId
            name
            userId
            active
            presetSelectionsByPresetId(
              first: 2147483647
            ) {
              edges {
                node {
                  foodSelectionBySelectionId {
                    rowId
                    foodDescription
                    mass
                    foodId
                    foodByFoodId {
                      rowId
                      calories
                      protein
                      fat
                      carbs
                    }
                    measureWeightAmount,
                    measureWeightUnit,
                    measureVolumeAmount,
                    measureVolumeUnit,
                    measureCommonAmount,
                    measureCommonUnit,
                    unitOfMeasureByMeasureWeightUnitId {
                      category
                      siFactor
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
