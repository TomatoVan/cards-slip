import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { componentRender } from '../componentRender/componentRender';

import { ClearAll } from './ClearAll';

describe('ClearAll', () => {
  test('Test ClearAll DOM', () => {
    componentRender(<ClearAll accessoryQueryFilter="My" />);
    expect(screen.getByTestId('clearAll')).toBeInTheDocument();
  });
  test('Test ClearAll text', () => {
    componentRender(<ClearAll accessoryQueryFilter="My" />);
    expect(screen.getByText('Clear all')).toBeInTheDocument();
  });
});
