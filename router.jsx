import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import ProductsIndex from '/ui/views/products/index';
import ProductsForm from '/ui/views/products/form';

if (Meteor.isClient) {
  Meteor.startup(() => {
    const root = document.createElement('div');
    root.className = 'react-root';
    document.body.appendChild(root);
    ReactDOM.render((<Router history={browserHistory}>
      <Route path="/" component={ProductsIndex}/>
      <Route path="/products/new" component={ProductsForm}/>
      <Route path="/products/:id/edit" component={ProductsForm}/>
    </Router>), root);
  });
} else {
  /*
   * Quick demo of the server side rendering.
   *
   * It's important to start this early, and keep it up
   * as some lower quality plugins don't run on both client and server,
   * and npm doesn't have clue where the plugin is intended to run (thanks npm!!)
  */
  // console.log(ReactDOMServer.renderToString(new ProductsIndex()));
}

// <Route path="products/:id" component={ProductsShow}/>
