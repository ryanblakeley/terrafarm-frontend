import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';

import classNames from '../styles/ResultsItemOrganizationStylesheet.css';

const ResultsItemOrganization = props => <div className={classNames.this}>
  <span className={classNames.number} >
    {props.index + 1}.
  </span>
  <Link to={`/organization/${props.organization.id}`} className={classNames.name} >
    {props.organization.name[0].toUpperCase() + props.organization.name.slice(1)}
  </Link>
</div>;

ResultsItemOrganization.propTypes = {
  organization: React.PropTypes.object,
  index: React.PropTypes.number,
};

export default Relay.createContainer(ResultsItemOrganization, {
  fragments: {
    organization: () => Relay.QL`
      fragment on Organization {
        id,
        name,
      }
    `,
  },
});
