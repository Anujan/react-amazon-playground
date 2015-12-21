import React from 'react';
import { connect } from 'react-redux';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import RaisedButton from 'material-ui/lib/raised-button';
import * as ProductActionCreators from '../../actions/products';
import { Navigation, RouteHandler } from 'react-router';

const FIRST_PAGE = 1;

const GRID_COLS = 3;
const GRID_PADDING = 15; //padding between items

const DESIRED_IMAGE_HEIGHT = 250;

function getImageStyles(image) {
  return {
    width: DESIRED_IMAGE_HEIGHT * image.aspect,
    height: DESIRED_IMAGE_HEIGHT
  }
};

const ProductsGrid = React.createClass({
  mixins: [Navigation],
  componentWillMount() {
    this.loadPage(FIRST_PAGE);
  },

  loadNextPage() {
    this.loadPage(this.props.page + 1);
  },

  loadPage(page) {
    this.props.dispatch(ProductActionCreators.loadProducts(page));
  },

  openModal(product) {
    this.transitionTo(`/product/${product.asin}`);
  },

  renderGrid() {
    if (this.props.loadedProducts.length === 0) {
      return <span />;
    }
    return (
      <GridList
        cols={GRID_COLS}
        padding={GRID_PADDING}
        cellHeight={DESIRED_IMAGE_HEIGHT}
      >
        {this.props.loadedProducts.map((product) => {
          const image = product.images[0];
          return <GridTile
            title={product.title}
            key={product.asin}
            onClick={this.openModal.bind(this, product)}
            className="grid-item"
            >
              <img src={image.src} style={getImageStyles(image)} />
            </GridTile>;
        })}
      </GridList>
    );
  },

  render() {
    return (
      <div>
        <RouteHandler products={this.props.loadedProducts} />
        {this.renderGrid()}
        <RaisedButton
          onClick={this.loadNextPage}
          onTouchTap={this.loadNextPage}
          label="Show More"
          primary={true}
          disabled={this.props.fetching}
          style={{
            marginTop: 5,
            display: 'block'
          }}
        />
      </div>
    )
  }
});

function mapStateToProps(state) {
  return state.products;
}

export default connect(mapStateToProps)(ProductsGrid);
