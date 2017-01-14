import React from 'react';
import {Link} from 'react-router';

import classNames from '../styles/TermDefinitionStylesheet.css';

const TermDefinition = props => <div className={classNames.this}>
  <h4 className={classNames.term}>
    <Link to={props.url} className={classNames.url} >
      {props.term}:
    </Link>
  </h4>
  <h4 className={classNames.definition}>
    {props.definition}
  </h4>
</div>;

TermDefinition.propTypes = {
  term: React.PropTypes.string,
  definition: React.PropTypes.string,
  url: React.PropTypes.string,
};

export default TermDefinition;
