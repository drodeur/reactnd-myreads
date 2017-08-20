import React from 'react';
import { render } from 'react-dom';

// Polyfill
import 'url-search-params-polyfill';

import OldApp from './_old/App';
import App from './App';

render(<App />, document.getElementById('root'));
