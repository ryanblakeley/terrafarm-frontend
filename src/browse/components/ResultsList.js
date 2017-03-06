import React from 'react';
import {UL} from 'shared/components/Typography';
import ResultsListItem from './ResultsListItem';
import classNames from '../styles/ResultsListStylesheet.css';

const ResultsList = props => <div className={classNames.this}>
  <UL className={classNames.list}>
    {props.listItems.length
      ? props.listItems.map(item => (item.itemId && <ResultsListItem
        {...item}
        key={item.itemId}
      />))
      : <div className={classNames.emptyListItem}>
        <p className={classNames.emptyWarning}>{props.emptyWarning}</p>
      </div>
    }
  </UL>
</div>;

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
