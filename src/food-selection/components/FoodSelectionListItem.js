import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import Layout from 'shared/components/Layout';
import { Span, Link } from 'shared/components/Typography';
import { IconButton } from 'shared/components/Material';
import { ArrowRightIcon } from 'shared/components/Icons';
import { red400 } from 'tools/colors';
import classnames from 'classnames/bind';
import classNames from '../styles/FoodSelectionListItemStylesheet.css';

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
  time: PropTypes.string,
  foodName: PropTypes.string.isRequired,
  mass: PropTypes.number,
  unitAmount: PropTypes.number,
  unitDescription: PropTypes.string,
  url: PropTypes.string,
  complete: PropTypes.bool.isRequired,
  editing: PropTypes.bool,
  wide: PropTypes.bool,
};

const defaultProps = {
  time: '',
  mass: '',
  unitAmount: '',
  unitDescription: '',
  url: '',
  editing: false,
  wide: false,
};

const FoodSelectionListItem = props => {
  const {
    time,
    foodName,
    mass,
    unitAmount,
    unitDescription,
    url,
    complete,
    editing,
    wide,
  } = props;
  const color = complete ? '' : red400;
  const displayTime = time ? moment(time || '', 'HH:mm:ss').format('HH:mm') : '';

  return <Layout className={cx({ this: true, complete, editing, wide })}>
    <Span className={classNames.time}>{displayTime}</Span>
    <Span className={classNames.foodName}>{foodName}</Span>
    <Span className={classNames.unit}>{unitAmount} {unitDescription} ~ {mass}g</Span>
    <Span className={classNames.edit}>
      {url && <Link to={url}>
        <IconButton
          style={styles.editButton}
          onClick={() => window.scrollTo(0, 0)}
        >
          <ArrowRightIcon className={classNames.editIcon} color={color} />
        </IconButton>
      </Link>}
    </Span>
  </Layout>;
};

FoodSelectionListItem.propTypes = propTypes;
FoodSelectionListItem.defaultProps = defaultProps;

export default FoodSelectionListItem;
