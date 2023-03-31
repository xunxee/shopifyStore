import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';

import { Global } from '@emotion/react';

import store from './store';
import App from './App';
import reset from './styles/reset';
import ScrollToTop from './ScrollToTop';

ReactDOM.createRoot(document.getElementById('app')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Global styles={reset} />
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </Provider>,
);
