import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import Products from '/collections/products';

class ProductForm extends React.Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  /*
   * This can be cleaned up. I've been using formsy, ran into trouble this time though
   */
  submit(e) {
    e.preventDefault();
    const model = {
      name: $(this.refs.name).val(),
      amount: $(this.refs.amount).val(),
    };

    const productId = Products.insert(model);
    const uploader = new Slingshot.Upload('images');
    uploader.send(this.refs.image.files[0], function imgUpload(error) {
      console.log( productId);
      if (error) {
        console.error('Error uploading', error);
      } else {
        const key = _.findWhere(uploader.instructions.postData, { name: 'public_id' }).value;
        console.log( key);
        Products.update({ _id: productId }, { $set: { image: key } });
      }
    });

    const { history } = this.props;

    history.push('/');
  }

  render() {
    console.log(this.props);
    return (
      <form onSubmit={this.submit}>
        <label htmlFor="name-input">Name</label>
        <input id="name-input" ref="name" className="form-control" name="name" type="text"/>

        <label htmlFor="image-input">Image</label>
        <input id="image-input" className="form-control" name="image" type="file" ref="image"/>

        <label htmlFor="amount-input">Amount</label>
        <input id="amount-input" ref="amount" className="form-control" name="amount" type="number"/>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

ProductForm.propTypes = {
  history: React.PropTypes.object.isRequired,
};

export default ProductForm;
