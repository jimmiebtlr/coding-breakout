import React from 'react';
import { Link } from 'react-router';
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
    const { router } = this.context;

    const changeSort = (sortBy, sortDir) => {
      return () => {
        return router.replace(`/?sort-dir=${sortDir}&sort-by=${sortBy}`);
      };
    };

    const { sortBy, sortDir } = this.props;

    /*
     * I think ideally I would do the link to sorting
     * through js and on-click instead of the router
     * link tag.
     */
    return (<Container>
      <div className="well">
        <Link to="/products/new">
          <button className="btn btn-primary">
            Create product
          </button>
        </Link>
      </div>

      <div className="well">
        <button className="btn btn-primary"
          onClick={changeSort('name', sortDir)}
        >
          Sort by name
        </button>
        <button
          className="btn btn-primary"
          onClick={changeSort('amount', sortDir)}
        >
          Sort by amount
        </button>
        <button
          className="btn btn-primary"
          onClick={changeSort(sortBy, (sortDir < 0 ? 1 : -1))}
        >
          {sortDir ? 'ASC' : 'DESC'}
        </button>
      </div>

      <Row>
        {_.map(products, (p) => {
          return (<Col xs={12} sm={4} md={3} key={p._id}>
            <Card>
              <CardMedia>
                <CloudinaryImage publicId={p.image}/>
              </CardMedia>

              <CardData>
                <h2>{p.name}</h2>
                <Money amount={p.amount}/>
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

Index.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

const getProducts = (props, onData) => {
  console.log(props.location);

  // Default sort to amount asc
  let sortBy = 'amount';
  let sortDir = 1;
  if (props.location && props.location.query) {
    const query = props.location.query;
    sortBy = query['sort-by'];
    sortDir = parseInt(query['sort-dir']);
  }
  console.log( sortDir );

  const sort = {};
  sort[sortBy] = sortDir;

  if (props && Meteor.isClient) {
    const { query } = props;
    Meteor.subscribe(
      'products/get',
      (query ? query : {}),
      { sort }
    );
  }

  const products = Products.find({}, { limit: 10, sort }).fetch();
  onData(null, {
    products,
    sortBy,
    sortDir,
  });
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
