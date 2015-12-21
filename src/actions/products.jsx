import { FETCH_PRODUCTS, OPEN_MODAL } from '../constants/products';
import request from 'superagent';
import _ from 'lodash';

// TODO: We probably should store this somewhere but since it's a fixed list
// used for display, we'll keep it here for now.
const ASINS = ["B017I3KWX6","B018F4GDQW","B00I3MNGCG","B00RSI5EHQ","B00MR9VDDA","B00MR9UY8A","B00X8UKOUK","B00I3MPZUW","B00I3MQNWG","B00PSLQYWE","B00ZP9PPMO","B010AI9YCG","B00N9STWJA","B00N8MBYA2","B0088W9PD0","B00COW65YC","B00O5ATHEQ","B00CDBR1P6","B00IK9I6XG","B00ADSOKW8","B00T6UD7BY","B00VWQ3LQG","B00I2TV3NO","B0132TMXPK","B00IIUATDM","B00DZ83IPS","B00948EPOQ","B00V9URUEE","B0094K1JPC","B00L83TQR6","B00A7I6NYC","B00OI7J214","B00HZ3C4N6","B00MILGKPI","B009EEJDYC","B00PJW38BW","B00MQOZETK","B00R1WPAXM","B00OPX707Y","B00ZGTS68S","B00RSGIVVO","B015EV84PC","B0064MPXFA","B007SPQZMC","B005U9RM0W","B00BLCHZC2","B005544TRQ","B00I3MPZUW","B007F4AG76","B004VJT0PM","B006IVTP1U","B006WSKTPU","B003AZCYCE","B00BSEJR9C","B000IOI0PK","B006GLM7IK","B0054TKAZW","B00MR9VDDA","B006GLLXXK","B000GFD4C0","B0097HFD54","B0181P4XO4","B00MXU9VUK","B00S94942O","B00QUEE4GQ","B013XWZV78","B00MR67BCU","B0181P50XC","B008Y6W4I8","B0181P42UO","B00MFDPZRS","B015NF2G6W","B00HZ4AFOU","B0181P4O34","B00GQ051NY","B00BESBZ0G","B012QQSZSO","B0181P404C","B00MBWN6UG","B005IF2AYQ","B011802OI6","B015YJRQ8U","B012PJVQ7Y","B015IVIX5O","B013KUFVBE","B00ZAOHCQQ","B013JPCA1Y","B018GZKKSC","B018SUIBQ8","B014Q781VM","B018SVOIWS","B017O65T9O","B017O67TJ2","B01489LC28","B017CDHRD0","B0186BX9PW","B0184RE1TG","B017VKIW9W","B018YCSFES","B018UWJDPM","B0169C9IY6","B014X7T2L8","B014P648DE","B014PCAMY2","B014E0Z2OK","B014P61NAU","B014P6350Q","B014P62U02","B018T9WRPE","B014P6223W","B014CRO1SI","B014P665NK","B018WP2LG0","B014CRNA2Q","B014CRMQQ2","B014CRMUSG","B0149M4BZ4","B014PCBIRW","B014CRQQH2","B014JRHI7C","B00TU9UFTS","B00QWUOZ3K","B011BFXOXC","B008PZZX90","B009EE82EE","B014QZCJXA","B00190KZVY","B000N90JG8","B0132TWSH8","B018EYHV6O","B001MTBW5K","B00FEC3TW0","B000SVZILC","B001ARPG7Y","B00Q3GKGFO","B000MFYTD2","B003ANELHW","B018ISDCE6","B00E1BF0KE","B003CF8NUE"];

// We'll use 12 since the grid size is 3
const PAGE_SIZE = 12;

export function loadProducts(page = 1) {
  return {
    type: FETCH_PRODUCTS,
    payload: {
      promise: fetchProductsFromAmazon(page),
      page
    }
  };
}

export function openModal(product) {
  return {
    type: OPEN_MODAL,
    payload: product
  }
}

function fetchProductsFromAmazon(page) {
  return new Promise(function(resolve, reject) {
    var asinsToQuery = _.slice(ASINS, (page - 1) * PAGE_SIZE, PAGE_SIZE * page);

    var url = 'http://www.amazon.com/gp/gw/ajax/pdb.html?';
    url += [
      { swn:  'productdb-ajax' },
      { sa: JSON.stringify({ asins: asinsToQuery })},
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
