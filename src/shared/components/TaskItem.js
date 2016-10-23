import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import {blueGrey900} from 'material-ui/styles/colors';
import IoIosPaperOutline from 'react-icons/lib/io/ios-paper-outline';
import MdStar from 'react-icons/lib/md/star';
import RelationshipIcon from './RelationshipIcon';
import classNames from '../styles/TaskItemStylesheet.css';

const styles = {
  this: {
    color: blueGrey900,
  },
};

class TaskItem extends React.Component {
  static propTypes = {
    task: React.PropTypes.object,
    adminBadge: React.PropTypes.bool,
    action: React.PropTypes.element,
  };
  static defaultProps = {
    adminBadge: false,
  };
  render () {
    const {task, adminBadge, action} = this.props;
    const secondaryIcon = action || (adminBadge
      ? <MdStar />
      : null);

    return <div className={classNames.this} style={styles.this} >
      <RelationshipIcon
        primary={<IoIosPaperOutline />}
        secondary={secondaryIcon}
      />
      <div className={classNames.colorsPlaceholder} />
      <Link to={`/task/${task.id}`} className={classNames.name} >
        {task.name[0].toUpperCase() + task.name.slice(1)}
      </Link>
    </div>;
  }
}

export default Relay.createContainer(TaskItem, {
  fragments: {
    task: () => Relay.QL`
      fragment on Task {
        id,
        name,
      }
    `,
  },
});
