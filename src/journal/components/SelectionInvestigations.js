import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'shared/components/Layout';
import { H4, Span } from 'shared/components/Typography';
import { FlatButton } from 'shared/components/Material';
import SelectionPossibleMass from './SelectionPossibleMass';
import classNames from '../styles/SelectionInvestigationsStylesheet.css';

const propTypes = {
  foodSelection: PropTypes.object.isRequired,
  possibleFoods: PropTypes.object.isRequired,
  handleChangeFoodId: PropTypes.func.isRequired,
  handleChangeMass: PropTypes.func.isRequired,
};

const SelectionInvestigations = props => {
  const { foodSelection, possibleFoods, handleChangeFoodId, handleChangeMass } = props;

  if (possibleFoods.edges.length < 1) { return null; }

  return <Layout center >
    <Layout>
      <H4>Possible food and mass</H4>
    </Layout>
    {possibleFoods.edges.map(({ node }) => {
      const food = node.foodByFoodId;

      return <Layout key={node.id} className={classNames.investigationResult} >
        <FlatButton
          label={food.rowId}
          onClick={() => { handleChangeFoodId(food.rowId); }}
        />
        <Span>{food.description}</Span>
        <SelectionPossibleMass
          unit={foodSelection.unitOfMeasureByUnitOfMeasureId}
          amount={foodSelection.unitAmount}
          show={!foodSelection.mass}
          handleClickMassSuggestion={handleChangeMass}
        />
      </Layout>;
    })}
  </Layout>;
};

SelectionInvestigations.propTypes = propTypes;

export default SelectionInvestigations;
