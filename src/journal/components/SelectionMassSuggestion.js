import PropTypes from 'prop-types';
import React from 'react';
import Layout from 'shared/components/Layout';
import { H4 } from 'shared/components/Typography';
import { FlatButton } from 'shared/components/Material';

const propTypes = {
  unit: PropTypes.shape({
    category: PropTypes.string,
    siFactor: PropTypes.number,
  }),
  amount: PropTypes.number,
  show: PropTypes.bool.isRequired,
  handleClickMassSuggestion: PropTypes.func.isRequired,
};

const defaultProps = {
  unit: {
    category: null,
    siFactor: null,
  },
  amount: null,
};

class SelectionMassSuggestion extends React.Component {
  getMassSuggestion () {
    const { unit, amount, show } = this.props;
    const massSuggestionPossible = show
      && unit
      && unit.category === 'MASS'
      && unit.siFactor
      && amount;

    return massSuggestionPossible && (amount * unit.siFactor).toFixed(2);
  }
  render () {
    const { handleClickMassSuggestion } = this.props;
    const massSuggestion = this.getMassSuggestion();

    if (!massSuggestion) return null;

    return <Layout center >
      <H4>Mass Suggestion (grams)</H4>
      <FlatButton onClick={() => { handleClickMassSuggestion(massSuggestion); }}>
        {massSuggestion}
      </FlatButton>
    </Layout>;
  }
}

SelectionMassSuggestion.propTypes = propTypes;
SelectionMassSuggestion.defaultProps = defaultProps;

export default SelectionMassSuggestion;
