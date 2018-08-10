import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';

import Hello from '../lib/index.esm';

const App = () => (
  <div>
    <div>Component example:</div>
    <Hello name="foo" />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));

hot(module)(App);
