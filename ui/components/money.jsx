import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';


class Card extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  /*
   * !IMPORTANT This doesn't work for negative values
   * I don't think we're likely to have negative product
   * values though

   * TODO
   * Also doesn't format with ,'s yet.
   */
  formattedAmount() {
    const { amount } = this.props;
    if (amount < 0) {
      console.error("Money doesn't yet support negative values");
    }

    const decimal = amount % 100;
    const dollars = Math.floor(amount / 100);

    return `$${dollars}.${decimal}`;
  }

  render() {
    return (<span>{this.formattedAmount()}</span>);
  }
}

Card.propTypes = {
  amount: React.PropTypes.number.isRequired,
};

export default Card;
