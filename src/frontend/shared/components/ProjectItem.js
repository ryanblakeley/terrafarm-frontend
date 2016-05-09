import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import Colors from 'material-ui/lib/styles/colors';
import GoRepo from 'react-icons/lib/go/repo';
import MdStar from 'react-icons/lib/md/star';
import RelationshipIcon from './RelationshipIcon';

import classNames from '../styles/ProjectItemStylesheet.css';
const styles = {
  this: {
    color: Colors.blueGrey900,
  },
};

class ProjectItem extends React.Component {
  static propTypes = {
    project: React.PropTypes.object,
    adminBadge: React.PropTypes.bool,
    action: React.PropTypes.element,
  };
  static defaultProps = {
    adminBadge: false,
  };
  render () {
    const {project, adminBadge, action} = this.props;
    const secondaryIcon = action || (adminBadge
      ? <MdStar />
      : null);

    return <div className={classNames.this} style={styles.this} >
      <RelationshipIcon
        primary={<GoRepo />}
        secondary={secondaryIcon}
      />
      <div className={classNames.colorsPlaceholder} />
      <Link to={`/auth/project/${project.id}`} className={classNames.name} >
        {project.name[0].toUpperCase() + project.name.slice(1)}
      </Link>
    </div>;
  }
}

export default Relay.createContainer(ProjectItem, {
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        id,
        name,
      }
    `,
  },
});

