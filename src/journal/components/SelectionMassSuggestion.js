import PropTypes from 'prop-types';
import React from 'react';
import Layout from 'shared/components/Layout';
import { P } from 'shared/components/Typography';

const propTypes = {
  unit: PropTypes.shape({
    category: PropTypes.string,
    siFactor: PropTypes.number,
  }),
  amount: PropTypes.number,
  show: PropTypes.bool.isRequired,
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
    console.log('get mass:', unit, amount, show);
    const massSuggestionPossible = show
      && unit
      && unit.category === 'MASS'
      && unit.siFactor
      && amount;

    return massSuggestionPossible && amount * unit.siFactor;
  }
  render () {
    const massSuggestion = this.getMassSuggestion();

    console.log('Mass suggestion:', massSuggestion);

    if (!massSuggestion) return null;

    return <Layout>
      <P>{massSuggestion}</P>
    </Layout>;
  }
}

SelectionMassSuggestion.propTypes = propTypes;
SelectionMassSuggestion.defaultProps = defaultProps;

export default SelectionMassSuggestion;
