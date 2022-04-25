import React from 'react';
import ReactDOM from 'react-dom';

import {
  App,
  StoreProvider,
  RootStore
} from 'outdoor-modeling';

const rootStore = new RootStore();

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider value={rootStore}>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
