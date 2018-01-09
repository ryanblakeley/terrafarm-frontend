import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { FoodIcon } from 'shared/components/Icons';
import Layout from 'shared/components/Layout';
import { H3, P, A } from 'shared/components/Typography';
import TransitionWrapper from 'shared/components/TransitionWrapper';
import Menu from 'shared/components/Menu';
import MacronutrientCaloriesPerGram from 'food/components/MacronutrientCaloriesPerGram';
import classNames from '../styles/FoodDetailContainerStylesheet.css';

const propTypes = {
  foodByRowId: PropTypes.object.isRequired,
};

const defaultProps = {
  foodByRowId: {
    brandName: null,
    foodGroupByFoodGroupId: {
      name: null,
    },
    proteinFactor: null,
    fatFactor: null,
    carbFactor: null,
  },
};

function padDigits (number, digits) {
  return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

const FoodDetailContainer = props => {
  const { foodByRowId } = props;
  const {
    rowId,
    description,
    brandName,
    foodGroupByFoodGroupId: foodGroup,
    proteinFactor,
    fatFactor,
    carbFactor,
  } = foodByRowId;
  const brandLabel = <P className={classNames.brand}>Brand: <strong>{brandName}</strong></P>;
  // const usdaUrl = `https://ndb.nal.usda.gov/ndb/foods/show/${rowId}`;
  // const usdaUrl = `https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=DEMO_KEY&nutrients=205&nutrients=204&nutrients=208&nutrients=269&ndbno=${padDigits(rowId, 5)}`; // eslint-disable-line max-len
  const usdaUrl = `https://ndb.nal.usda.gov/ndb/search/list?qlookup=${padDigits(rowId, 5)}`;

  return <TransitionWrapper>
    <Layout page >
      <Menu
        baseUrl={`/foods/${rowId}`}
        header={{ icon: <FoodIcon />, title: 'Foods' }}
        disabled
      />
      <H3 className={classNames.description}>{description}</H3>
      <P>Food #: <strong>{rowId}</strong></P>
      {foodGroup && <P className={classNames.foodGroup}>
        Food group: <strong>{foodGroup.name}</strong>
      </P>}
      <MacronutrientCaloriesPerGram
        protein={proteinFactor}
        fat={fatFactor}
        carb={carbFactor}
      />
      {/* nitrogen to protein, refuse %, refuse description */}
      {brandName && brandLabel}
      <P>Source: <strong><A href={usdaUrl} >USDA</A></strong></P>
      {/* <P><WarningMessage>More details coming soon</WarningMessage></P> */}
    </Layout>
  </TransitionWrapper>;
};

FoodDetailContainer.propTypes = propTypes;
FoodDetailContainer.defaultProps = defaultProps;

export default createFragmentContainer(
  FoodDetailContainer,
  graphql`
    fragment FoodDetailContainer_foodByRowId on Food {
      rowId
      description
      brandName
      foodGroupByFoodGroupId {
        name
      }
      proteinFactor
      fatFactor
      carbFactor
    }
  `,
);
