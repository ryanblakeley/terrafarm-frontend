import React from 'react';
import {blueGrey100, blueGrey400} from 'shared/utils/colors';
import classNames from '../styles/HeroImageStylesheet.css';

const styles = {
  this: {
    backgroundColor: blueGrey100,
    borderColor: blueGrey400,
  },
};

const HeroImage = props => <div
  className={classNames.this}
  style={
    Object.assign(styles.this, {
      backgroundImage: `url(${props.image})`,
    })
  }
>
  {!props.image && <div className={classNames.emptyWarning}>
    <h4 className={classNames.emptyWarningText}>(Image not provided)</h4>
  </div>}
</div>;

HeroImage.propTypes = {
  image: React.PropTypes.string,
};

export default HeroImage;
