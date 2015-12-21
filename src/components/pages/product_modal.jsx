import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';
import React from 'react';
import { Navigation, State, Link } from 'react-router';


const ProductModal = React.createClass({
  mixins: [Navigation, State],

  close() {
    this.transitionTo('/');
  },

  render() {
    const product = this.props.products.filter((product) => {
      return product.asin === this.props.params.id
    })[0];

    if (!product) {
      return <span></span>;
    }

    return <Dialog
      defaultOpen={!!product}
      onRequestClose={this.close}
      title={product.title}
    >
      <Link to="/" className="close-link"><FontIcon className="material-icons">close</FontIcon></Link>
      <img src={product.images[0].src} />
      <div className="rating">Rating: {product.reviews.hoverText}</div>
      <RaisedButton primary={true} label="Buy Now" linkButton={true} href={`http://amazon.com/${product.url}`} />
    </Dialog>
  }
});

export default ProductModal;
