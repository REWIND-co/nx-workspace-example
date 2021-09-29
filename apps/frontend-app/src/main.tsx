import { Ui } from '@nx-workspace-example/ui';
import { Common } from '@nx-workspace-example/common';

import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import App from './app/app';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
