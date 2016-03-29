import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import Products from '/collections/products';
import { composeWithTracker } from 'react-komposer';

import Container from '/ui/components/container';
import Row from '/ui/components/row';
import Col from '/ui/components/col';
import Money from '/ui/components/money';
import Card from '/ui/components/card';
import CardMedia from '/ui/components/cardMedia';
import CardData from '/ui/components/cardData';
import CloudinaryImage from '/ui/components/cloudinaryImage';

class Index extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { products } = this.props;

    return (<Container>
      <Row>
        {_.map(products, (p) => {
          return (<Col xs={12} sm={4} md={3} key={p._id}>
            <Card>
              <CardMedia>
                <CloudinaryImage publicId={p.image}/>
              </CardMedia>

              <CardData>
                <Money amount={p.amount}/>
                <h2>{p.title}</h2>
              </CardData>
            </Card>
          </Col>);
        })}
      </Row>
    </Container>);
  }
}

Index.propTypes = {
  products: React.PropTypes.array.isRequired,
};

const getProducts = (props, onData) => {
  if (props && Meteor.isClient) {
    const { query } = props;
    Meteor.subscribe(
      'products/get',
      (query ? query : {}),
      {}
    );
  }

  const products = Products.find().fetch();
  onData(null, { products });
};


/*
 * This actually has a pretty major bug, but I basically never use this pattern
 * and am not really sure why you would use this over pub/sub.
 *
 * The only real reason to use this over pub/sub is for the offset, and removing reactivity
 * I believe the same can be accomplished by one of the plugins that can scope a query to a
 * specific subscribe, which I think would be preferable.
 */
const getProductsViaMethod = (props, onData) => {
  const { query } = props.query;
  Meteor.call('products/get', query, (data) => {
    onData(null, { products: data });
  });
};

/*
 * Provides reactivity while keeping the data fetching and components separate
 * This provides a much cleaner interface
 */
export default composeWithTracker(getProducts)(Index);

// This is more for when we start testing.
// Much easier to test the template and data fetching separatly
export { Index };
