import React from 'react';
import Layout from 'shared/components/Layout';
import {WarningMessage} from 'shared/components/Typography';
import {CloseIcon} from 'shared/components/Icons';
import {IconButton} from 'shared/components/Material';
import {blueGrey50} from 'shared/utils/colors';

const styles = {
  this: {
    backgroundColor: blueGrey50,
  },
};

class Banner extends React.Component {
  state = {
    open: true,
  };
  handleClose = _ => {
    this.setState({open: false});
  }
  render () {
    if (!this.state.open) return null;
    return <Layout center flexCenter style={styles.this}>
      <IconButton onClick={this.handleClose}><CloseIcon /></IconButton>
      <WarningMessage>Please note this is in early development stage.</WarningMessage>
    </Layout>;
  }
}

export default Banner;
