import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { componentRender } from '../componentRender/componentRender';

import { Filter } from './Filter';

describe('Filter', () => {
  test('Filter RangeSlider DOM', () => {
    componentRender(<Filter accessoryQueryFilter="All" />);
    expect(screen.getByTestId('filter')).toBeInTheDocument();
  });

  test('Filter RangeSlider text', () => {
    componentRender(<Filter accessoryQueryFilter="My" />);
    expect(screen.getByTestId('filter-title')).toHaveTextContent('Show packs cards');
  });
});
