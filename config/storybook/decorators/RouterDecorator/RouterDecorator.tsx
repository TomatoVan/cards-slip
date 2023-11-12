import { ReactNode } from 'react';

import { BrowserRouter } from 'react-router-dom';

export const RouterDecorator = (story: () => ReactNode) => (
  <BrowserRouter>{story()}</BrowserRouter>
);
