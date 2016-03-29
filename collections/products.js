const Products = new Mongo.Collection('Products');

/*
 * The slingshot definition.
 * Slingshot is a library that allows secure direct to cloud upload.
 * I wrote the cloudinary adapter for it prior to this.
 * Cloudinary allows on the fly image transformations based only on url.
 * Meaning you can request the exact size image needed for a specific
 * circumstance, apply transform's, crop, zoom on faces, etc.
 *
 * Their service is awesome, the libraries are at times poor though.
 */
Slingshot.fileRestrictions('images', {
  allowedFileTypes: ['image/*'],
  maxSize: 1024 * 1024 * 50,
});

if (Meteor.isServer) {
  Slingshot.createDirective('images', Slingshot.Cloudinary, {
    authorize() {
      if (!this.userId) {
        const message = 'Please login before posting files';
        throw new Meteor.Error('Login Required', message);
      }

      return true;
    },

    key() {
      return this.userId + Meteor.uuid();
    },
  });
}

/*
 * For the purpose of this demo, only adding name, amount and image.
 */
const ProductSchema = new SimpleSchema({
  name: {
    type: String,
  },
  amount: {
    // Number is deliberatly an integer.  Decimal numbers in javascript are
    // really floats.  The data type was intended for scientific uses, NOT for
    // use in representing currencies.
    type: Number,
  },
  image: {
    // Image is a string that represents a key in cloudinary
    // Absolute url's should not be stored for images/attachments, pretty much ever.
    type: String,
  },
});

Products.attachSchema(ProductSchema);

export default Products;
