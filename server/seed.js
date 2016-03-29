import Products from '/collections/products';

/*
 * Only seed if in development and no products were found
 */
if (Meteor.isDevelopment && !Products.find().count()) {
  const images = ['sample', 'a58be7a0-fdff-479f-9ab2-c78fd648d2d1'];

  Factory.define('Product', Products, {
    name: () => { return Fake.word(); },
    amount: () => { return Math.floor(Math.random() * 30000); },
    image: () => { return images[Math.floor(Math.random() * images.length)]; },
  });

  _.times(1000, () => {
    Factory.create('Product');
  });
}
