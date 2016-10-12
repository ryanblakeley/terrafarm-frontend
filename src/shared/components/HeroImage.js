import React from 'react';
import {blueGrey100, blueGrey400} from 'material-ui/styles/colors';
import classNames from '../styles/HeroImageStylesheet.css';

const styles = {
  this: {
    backgroundColor: blueGrey100,
    borderColor: blueGrey400,
  },
};

export default class HeroImage extends React.Component {
  static propTypes = {
    image: React.PropTypes.string,
  };
  render () {
    const {image} = this.props;
    styles.this.backgroundImage = `url(${image})`;

    return image
      && <div className={classNames.this} style={styles.this} />;
  }
}
