import { ReactNode } from 'react';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { DeepPartial } from 'redux';

import { store } from '../../app/store';

export interface componentRenderOptions {
  route?: string;
  initialState?: DeepPartial<any>;
}

export function componentRender(
  component: ReactNode,
  options: componentRenderOptions = {},
) {
  const { route = '/' } = options;

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{component}</MemoryRouter>
    </Provider>,
  );
}
