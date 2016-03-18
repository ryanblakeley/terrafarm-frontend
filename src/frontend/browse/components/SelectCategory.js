import React from 'react';
import CategoryButton from './CategoryButton';

import classNames from '../styles/SelectCategoryStylesheet.css';

export default class SelectCategory extends React.Component {
  static propTypes = {
    activeEntity: React.PropTypes.oneOf(['users', 'locations', 'resources', '']),
    activeCategory: React.PropTypes.string,
    notifySelectCategory: React.PropTypes.func,
    categoryLists: React.PropTypes.object,
  };
  static defaultProps = {
    categoryLists: {
      users: [],
      locations: ['yard', 'garage', 'rooftop'],
      resources: ['equipment', 'labor', 'materials', 'seed stock', 'compost'],
    },
  };
  renderCategoryButtons () {
    const {
      activeEntity,
      activeCategory,
      notifySelectCategory,
      categoryLists
    } = this.props;

    return categoryLists[activeEntity]
      && categoryLists[activeEntity].map(name => {
        return <CategoryButton
          key={name}
          name={name}
          active={activeCategory === name}
          activeEntity={activeEntity}
          handleNotify={notifySelectCategory}
        />;
      });
  }
  render () {
    return <div className={classNames.this} >
      {this.renderCategoryButtons()}
    </div>;
  }
}
