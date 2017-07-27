import PropTypes from 'prop-types';
import React from 'react';
import Layout from 'shared/components/Layout';
import { Span, Link } from 'shared/components/Typography';
import { IconButton } from 'shared/components/Material';
import { EditIcon } from 'shared/components/Icons';
import classNames from '../styles/JournalFoodSelectionStylesheet.css';

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
};

const defaultProps = {
  unitQuantity: '',
  unitName: '',
};

const JournalFoodSelection = props => {
  const { foodName, unitQuantity, unitName, url } = props;

  return <Layout className={classNames.this}>
    <Span className={classNames.foodName}>{foodName}</Span>
    <Span className={classNames.unit}>{unitQuantity} {unitName}</Span>
    <Span className={classNames.edit}>
      <Link to={url}>
        <IconButton style={styles.editButton}>
          <EditIcon className={classNames.editIcon} />
        </IconButton>
      </Link>
    </Span>
  </Layout>;
};

/*
      <IconButton>
        <EditIcon />
      </IconButton>
*/

JournalFoodSelection.propTypes = propTypes;
JournalFoodSelection.defaultProps = defaultProps;

export default JournalFoodSelection;

