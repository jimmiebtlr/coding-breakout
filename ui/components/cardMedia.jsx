import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';


class CardMedia extends React.Component {
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

CardMedia.propTypes = {
  children: React.PropTypes.object.isRequired,
};

export default CardMedia;
