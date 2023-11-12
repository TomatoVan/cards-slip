import { ReactNode } from 'react';

import { Provider } from 'react-redux';

import { store } from '../../../../src/app/store';

export const ProviderDecorator = (story: () => ReactNode) => (
  <Provider store={store}>{story()}</Provider>
);
