import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import classNames from '../styles/HeroImageStylesheet.css';

const styles = {
  this: {
    backgroundColor: Colors.blueGrey100,
    borderColor: Colors.blueGrey400,
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
