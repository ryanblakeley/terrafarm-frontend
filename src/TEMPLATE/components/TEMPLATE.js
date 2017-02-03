import React from 'react';

const TEMPLATEComponent = props => <div>
  Component {props.name}
</div>;

TEMPLATEComponent.propTypes = {
  name: React.PropTypes.string,
};

TEMPLATEComponent.defaultProps = {
  name: 'TEMPLATE',
};

export default TEMPLATEComponent;
