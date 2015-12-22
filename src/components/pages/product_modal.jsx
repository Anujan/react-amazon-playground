import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';
import React from 'react';
import slug from 'slug';
import getImageStyles from '../../utils/getImageStyles';
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
      <div className="row">
        <Link to="/" className="close-link"><FontIcon className="material-icons">close</FontIcon></Link>
        <div className="col s6">
          <img src={product.images[0].src} style={getImageStyles(300)} />
        </div>
        <div className="col s6">
          <div className="author">Author: {product.byline}</div>
          <div className="rating">Rating: {product.reviews.hoverText}</div>
          <RaisedButton
            primary={true}
            label="View Detail"
            linkButton={true}
            containerElement={<Link to={`/product/${product.asin}`} />} />
        </div>
      </div>
    </Dialog>
  }
});

export default ProductModal;
