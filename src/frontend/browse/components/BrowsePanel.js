import React from 'react';
import SelectEntity from './SelectEntity.js';
import SelectCategory from './SelectCategory.js';

import classNames from '../styles/BrowsePanelStylesheet.css';

export default class BrowsePanel extends React.Component {
  /*
  state = {
    activeEntity: '',
    activeCategory: '',
  };
  handleSelectEntity = (name) => {
    this.setState({
      activeEntity: name,
    });
  }
  handleSelectCategory = (name) => {
    this.setState({
      activeCategory: name,
    });
  }
  */
  render () {
/*
    const {activeEntity, activeCategory} = this.state;
        notifySelectEntity={this.handleSelectEntity}
        activeEntity={activeEntity}

      <SelectCategory
        notifySelectCategory={this.handleSelectCategory}
        activeEntity={activeEntity}
        activeCategory={activeCategory}
      />
*/
    return <div className={classNames.this} >
      <SelectEntity />
    </div>;
  }
}
