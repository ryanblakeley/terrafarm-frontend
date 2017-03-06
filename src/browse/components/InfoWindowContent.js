import React from 'react';
import {P} from 'shared/components/Typography';

const InfoWindowContent = props => <P>{props.resultItem.name}</P>;

InfoWindowContent.propTypes = {
  resultItem: React.PropTypes.shape({
    name: React.PropTypes.string,
    url: React.PropTypes.string,
    rowId: React.PropTypes.string,
  }),
};

export default InfoWindowContent;
