import Products from '/collections/products';

/*
 * Define what a user is allowed to query by
 */
const allowedQuery = new SimpleSchema({
  name: {
    type: String,
    optional: true,
  },
  amount: {
    type: Number,
    optional: true,
  },
});

/*
 * Options allowed in the query
 * This is used only for sort at the moment
 */
const allowedSort = new SimpleSchema({
  name: {
    type: Number,
    optional: true,
  },
  amount: {
    type: Number,
    optional: true,
  },
});

const allowedOptions = new SimpleSchema({
  sort: {
    type: allowedSort,
    optional: true,
  },
});

Meteor.publish('products/get', function productsGet(query, options) {
  check(query, allowedQuery);
  check(options, allowedOptions);

  const actualOpts = Object.assign({ limit: 10 }, options);

  return Products.find(query, actualOpts);
});


Meteor.methods({
  'products/get'(query, options) {
    check(query, allowedQuery);
    check(options, allowedOptions);

    const actualOpts = Object.assign({ limit: 10 }, options);

    return Products.find(query, actualOpts).fetch();
  },
});
