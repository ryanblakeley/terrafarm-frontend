import PropTypes from 'prop-types';
import React from 'react';
// import moment from 'moment';
import Layout from 'shared/components/Layout';
import { Span } from 'shared/components/Typography';
import classnames from 'classnames/bind';
import classNames from '../styles/FoodSelectionListItemStylesheet.css';

const cx = classnames.bind(classNames);

const propTypes = {
  // key: PropTypes.string,
  // time: PropTypes.string,
  foodName: PropTypes.string.isRequired,
  mass: PropTypes.number,
  unitAmount: PropTypes.number,
  unitDescription: PropTypes.string,
  url: PropTypes.string,
  complete: PropTypes.bool.isRequired,
  nutrition: PropTypes.shape({
    calories: PropTypes.number,
    protein: PropTypes.number,
    fat: PropTypes.number,
    carbs: PropTypes.number,
  }),
  editing: PropTypes.bool,
  wide: PropTypes.bool,
  router: PropTypes.object.isRequired,
};

const defaultProps = {
  time: '',
  mass: '',
  nutrition: {},
  unitAmount: '',
  unitDescription: '',
  url: '',
  editing: false,
  wide: false,
};

const FoodSelectionListItem = props => {
  const {
    // time,
    foodName,
    mass,
    unitAmount,
    unitDescription,
    url,
    complete,
    nutrition,
    editing,
    wide,
    router,
  } = props;
  // const displayTime = time ? moment(time || '', 'HH:mm:ss').format('HH:mm') : '';

  return <Layout
    className={cx({
      this: true,
      button: !!url,
      incomplete: !complete,
      editing,
      wide,
    })}
    onTouchTap={url ? () => router.replace(url) : null}
    style={{ cursor: url ? 'pointer' : 'default' }}
  >
    <Span className={classNames.column} key={1} >
      {foodName}; {unitAmount} {unitDescription} ~ {mass}g
    </Span>
    <Span className={classNames.column} key={2} >{nutrition.calories || ''}</Span>
    <Span className={classNames.column} key={3} >{nutrition.protein || ''}</Span>
    <Span className={classNames.column} key={4} >{nutrition.fat || ''}</Span>
    <Span className={classNames.column} key={5} >{nutrition.carbs || ''}</Span>
  </Layout>;
};

FoodSelectionListItem.propTypes = propTypes;
FoodSelectionListItem.defaultProps = defaultProps;

export default FoodSelectionListItem;
/*
import { IconButton } from 'shared/components/Material';
import { ArrowRightIcon } from 'shared/components/Icons';
import { red400 } from 'tools/colors';

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

const color = complete ? '' : red400;

    {url && <Layout className={classNames.linkIcon} >
      <IconButton
        style={styles.editButton}
        onTouchTap={() => window.scrollTo(0, 0)}
      >
        <ArrowRightIcon className={classNames.editIcon} color={color} />
      </IconButton>
    </Layout>}
*/
