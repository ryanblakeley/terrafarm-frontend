import React from 'react';
import Layout from 'shared/components/Layout';
import {UL, WarningMessage} from 'shared/components/Typography';
import ResultsListItem from './ResultsListItem';
import classNames from '../styles/ResultsListStylesheet.css';

const ResultsList = props => <Layout smallPageFixed>
  <UL plumb>
    {props.listItems.length
      ? props.listItems.map(item => (item.itemId && <ResultsListItem
        {...item}
        key={item.itemId}
      />))
      : <ResultsListItem>
        <WarningMessage>{props.emptyWarning}</WarningMessage>
      </ResultsListItem>
    }
  </UL>
</Layout>;

ResultsList.propTypes = {
  emptyWarning: React.PropTypes.string,
  listItems: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string,
    itemUrl: React.PropTypes.string,
    itemId: React.PropTypes.string,
    active: React.PropTypes.bool,
    setActive: React.PropTypes.func,
    isAdmin: React.PropTypes.bool,
  })),
};

ResultsList.defaultProps = {
  emptyWarning: '(none)',
};

export default ResultsList;
