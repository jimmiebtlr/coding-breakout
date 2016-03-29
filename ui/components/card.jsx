import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';


class Card extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { children } = this.props;
    return (<div>
      {children}
    </div>);
  }
}

Card.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.array.isRequired,
    React.PropTypes.object.isRequired,
  ]),
};

export default Card;
