import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';


class CardData extends React.Component {
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

CardData.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.array.isRequired,
    React.PropTypes.object.isRequired,
  ]),
};

export default CardData;
