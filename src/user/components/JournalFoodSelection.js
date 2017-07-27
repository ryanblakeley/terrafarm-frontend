import PropTypes from 'prop-types';
import React from 'react';
import Layout from 'shared/components/Layout';
import { Span, Link } from 'shared/components/Typography';
import { IconButton } from 'shared/components/Material';
import { EditIcon } from 'shared/components/Icons';
import { red400 } from 'tools/colors';
import classnames from 'classnames/bind';
import classNames from '../styles/JournalFoodSelectionStylesheet.css';

const cx = classnames.bind(classNames);

const styles = {
  editButton: {
    padding: 2,
    height: 28,
    width: 28,
  },
  editIcon: {
    fontSize: 14,
  },
};

const propTypes = {
  // key: PropTypes.string,
  foodName: PropTypes.string.isRequired,
  unitQuantity: PropTypes.number,
  unitName: PropTypes.string,
  url: PropTypes.string.isRequired,
  complete: PropTypes.bool.isRequired,
  editing: PropTypes.bool,
};

const defaultProps = {
  unitQuantity: '',
  unitName: '',
  editing: false,
};

class JournalFoodSelection extends React.Component {
  handleClickEdit = () => {
    this.rowElement.scrollIntoView();
  }
  render () {
    const { foodName, unitQuantity, unitName, url, complete, editing } = this.props;
    const color = complete ? '' : red400;

    return <div ref={elem => { this.rowElement = elem; }}>
      <Layout className={cx({ this: true, complete, editing })}>
        <Span className={classNames.foodName}>{foodName}</Span>
        <Span className={classNames.unit}>{unitQuantity} {unitName}</Span>
        <Span className={classNames.edit}>
          <Link to={url}>
            <IconButton style={styles.editButton} onClick={this.handleClickEdit}>
              <EditIcon className={classNames.editIcon} color={color} />
            </IconButton>
          </Link>
        </Span>
      </Layout>
    </div>;
  }
}

JournalFoodSelection.propTypes = propTypes;
JournalFoodSelection.defaultProps = defaultProps;

export default JournalFoodSelection;
