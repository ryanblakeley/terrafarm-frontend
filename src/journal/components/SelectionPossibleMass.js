import PropTypes from 'prop-types';
import React from 'react';
import Layout from 'shared/components/Layout';
import { Span, ErrorMessage } from 'shared/components/Typography';
import { FlatButton } from 'shared/components/Material';

const propTypes = {
  unit: PropTypes.shape({
    category: PropTypes.string,
    siFactor: PropTypes.number,
  }),
  amount: PropTypes.number,
  show: PropTypes.bool.isRequired,
  handleClickMassSuggestion: PropTypes.func.isRequired,
  className: PropTypes.string,
};

const defaultProps = {
  unit: {
    category: null,
    siFactor: null,
  },
  amount: null,
  className: null,
};

class SelectionPossibleMass extends React.Component {
  getMassSuggestion () {
    const { unit, amount } = this.props;
    const massSuggestionPossible = unit
      && unit.category === 'MASS'
      && unit.siFactor
      && amount;

    return massSuggestionPossible && (amount * unit.siFactor).toFixed(2);
  }
  render () {
    const { show, handleClickMassSuggestion, className } = this.props;

    if (!show) return null;

    const massSuggestion = this.getMassSuggestion();

    if (!massSuggestion) {
      return <Layout leftSmall >
        <ErrorMessage>
          Mass missing
        </ErrorMessage>
      </Layout>;
    }

    return <Layout>
      <FlatButton
        label={massSuggestion}
        onTouchTap={() => { handleClickMassSuggestion(massSuggestion); }}
        className={className}
      />
      <Span>grams</Span>
    </Layout>;
  }
}

SelectionPossibleMass.propTypes = propTypes;
SelectionPossibleMass.defaultProps = defaultProps;

export default SelectionPossibleMass;
