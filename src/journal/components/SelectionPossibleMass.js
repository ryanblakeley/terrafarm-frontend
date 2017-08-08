import PropTypes from 'prop-types';
import React from 'react';
import Layout from 'shared/components/Layout';
import { H4, ErrorMessage } from 'shared/components/Typography';
import { FlatButton } from 'shared/components/Material';
import classNames from '../styles/SelectionPossibleMassStylesheet.css';

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
    const { show, handleClickMassSuggestion } = this.props;

    if (!show) return null;

    const massSuggestion = this.getMassSuggestion();

    if (!massSuggestion) {
      return <Layout center >
        <ErrorMessage>
          Mass is needed to calculate nutrition values.
        </ErrorMessage>
      </Layout>;
    }

    return <Layout center >
      <H4 className={classNames.contentSubheading} >Possible mass (grams)</H4>
      <FlatButton onClick={() => { handleClickMassSuggestion(massSuggestion); }}>
        {massSuggestion}
      </FlatButton>
    </Layout>;
  }
}

SelectionPossibleMass.propTypes = propTypes;
SelectionPossibleMass.defaultProps = defaultProps;

export default SelectionPossibleMass;
