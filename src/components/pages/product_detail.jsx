import React from 'react';
import { connect } from 'react-redux';
import * as ProductActionCreators from '../../actions/products';
import getImageStyles from '../../utils/getImageStyles';
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';
import stripHtml from '../../utils/stripHtml';
import { Link } from 'react-router';

const ProductDetail = React.createClass({
  componentWillMount() {
    this.props.dispatch(ProductActionCreators.loadProduct(this.props.params.id));
  },

  renderRating() {
    const stars = [];
    for (var i = 0; i < parseInt(this.props.product.reviews.hoverText); i++) {
      stars.push(<FontIcon className="material-icons">star</FontIcon>);
    }

    return stars;
  },

  render() {
    const { product } = this.props;
    if (!product) {
      return <div></div>;
    }
    return <div className="container">
      <div className="row">
        <h3>{product.title}</h3>
        <h5>{product.byline}</h5>
        <div className="col s3">
          <img src={product.images[0].src} style={getImageStyles(500)} />
        </div>
        <div className="col s9">
          <div className="price">
            Price: {stripHtml(product.price)}
          </div>
          <div className="rating">
            {this.renderRating()}
          </div>
          <div className="checkout-now">
            <RaisedButton
              primary={true}
              linkButton={true}
              label={"Checkout Now"}
              href={`http://amazon.com/${product.url}`}
            />
          </div>
          <RaisedButton
            secondary={true}
            linkButton={true}
            label={'Back to All Products'}
            containerElement={<Link to="/" />}
          />
        </div>
      </div>
    </div>;
  }
});

function mapStateToProps(state, ownProps) {
  const product = state.products.loadedProducts.filter((product) => {
    return product.asin === ownProps.params.id.split('-')[0]
  })[0];

  return {
    product
  };
}

export default connect(mapStateToProps)(ProductDetail);
