import { FETCH_PRODUCTS, OPEN_MODAL } from '../constants/products';
import request from 'superagent';
import _ from 'lodash';

// TODO: We probably should store this somewhere but since it's a fixed list
// used for display, we'll keep it here for now.
const ASINS = ["1476746583", "1594633665", "0399255370", "0312642989", "0385354282", "0061997188", "159474758X", "0307464881", "1501100076", "0316349933", "0804139024", "0762448652", "0062310631", "1627792120", "1101946342", "1250012570", "0810983915", "1451666179", "1423146735", "1595148035", "1250049555", "0810984911", "006202406X", "0062349856", "1423190874", "1476789630", "1619636042", "0553499114", "0804179034", "0062429051", "0062268341", "038574126X", "1101874996", "1476754454", "1619634449", "1250022088", "0062320130", "0385743580", "0316322407", "0399170863", "0399171614", "1451627289", "1451648537", "0345803507", "0399168796", "0062267523", "1423146727", "1476791457", "0525953507", "039916927X", "0307352145", "1442450274", "0553801473", "0345539788", "0525478817", "1476727651", "0062024043", "0439023513", "0805099247", "1449461077"];

// We'll use 12 since the grid size is 3
const PAGE_SIZE = 12;

export function loadProducts(page = 1) {
  return {
    type: FETCH_PRODUCTS,
    payload: {
      promise: fetchProductsFromAmazonWithPage(page),
      page
    }
  };
}

export function loadProduct(id) {
  return {
    type: FETCH_PRODUCTS,
    payload: {
      promise: fetchProductsFromAmazon([id])
    }
  };
}

export function openModal(product) {
  return {
    type: OPEN_MODAL,
    payload: product
  }
}

function fetchProductsFromAmazonWithPage(page) {
  const asinsToQuery = _.slice(ASINS, (page - 1) * PAGE_SIZE, PAGE_SIZE * page);
  return fetchProductsFromAmazon(asinsToQuery);
}


function fetchProductsFromAmazon(productIds) {
  return new Promise(function(resolve, reject) {
    var url = 'http://www.amazon.com/gp/gw/ajax/pdb.html?';
    url += [
      { swn:  'productdb-ajax' },
      { sa: JSON.stringify({ asins: productIds })},
      { oe: JSON.stringify({ isDesktop: 1, isTablet: 0, isMobile: 0 }) },
      { rrid: '1NDRPWH33C03JWZG6HYX '} //not quite sure what this is)
    ].map(request.serializeObject).join('&');

    // We're going to throw the Amazon URL through a proxy to bypass CORS
    request
      .get('https://jsonp.afeld.me')
      .query({ url })
      .end((err, res) => {
        if (err) {
          return reject('An error occured');
        }
        return resolve(res.body);
      });
  });
}
