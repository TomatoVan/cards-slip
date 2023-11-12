import { addDecorator } from '@storybook/react';

import { ProviderDecorator } from './decorators/ProviderDecorator/ProviderDecorator';
import { RouterDecorator } from './decorators/RouterDecorator/RouterDecorator';
import { StyleDecorator } from './decorators/StyleDecorator/StyleDecorator';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

addDecorator(RouterDecorator);
addDecorator(ProviderDecorator);
addDecorator(StyleDecorator);
