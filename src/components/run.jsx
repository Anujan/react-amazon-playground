import React from 'react';
import ReactDOM from 'react-dom';
import router from './router';

document.addEventListener('DOMContentLoaded', () => {
  router.run((Handler, state) => {
    ReactDOM.render(
      <Handler params={state.params} query={state.query} />,
      document.querySelector('#app')
    );
  });
});
