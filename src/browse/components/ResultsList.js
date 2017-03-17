import React from 'react';
import Layout from 'shared/components/Layout';
import {UL, WarningMessage} from 'shared/components/Typography';
import LoadMoreButton from 'shared/components/LoadMoreButton';
import ResultsListItem from './ResultsListItem';
// import classNames from '../styles/ResultsListStylesheet.css';

const ResultsList = (props, context) => {
  const showLoadMoreButton = context.location.state && context.location.state.loadMore;

  return <Layout smallPageFixed>
    <UL plumb>
      {props.listItems.length
        ? props.listItems.map(item => (item.itemId && <ResultsListItem
          {...item}
          key={item.itemId}
        />))
        : <WarningMessage>{props.warningText}</WarningMessage>
      }
    </UL>
    {showLoadMoreButton && <LoadMoreButton />}
  </Layout>;
};

ResultsList.propTypes = {
  warningText: React.PropTypes.string,
  listItems: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element,
    ]),
    itemUrl: React.PropTypes.string,
    itemId: React.PropTypes.string,
    active: React.PropTypes.bool,
    setActive: React.PropTypes.func,
    isAdmin: React.PropTypes.bool,
  })),
};

ResultsList.contextTypes = {
  router: React.PropTypes.object,
  location: React.PropTypes.object,
};

ResultsList.defaultProps = {
  warningText: '(empty)',
};

export default ResultsList;
