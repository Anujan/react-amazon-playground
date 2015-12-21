/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import createComponent from 'helpers/shallowRenderHelper';
import Home from 'components/pages/home';

describe('Home Page Component', () => {
  let homePage;

  beforeEach(() => {
    homePage = createComponent(Home);
  });

  it('should exist', () => {
    expect(homePage).to.not.be.undfinded;
    expect(homePage).to.not.be.null;
    expect(homePage).to.be.ok;
  });
});


