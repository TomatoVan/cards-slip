import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { componentRender } from '../componentRender/componentRender';

import { Search } from './Search';

describe('Search', () => {
  test('Test search DOM', () => {
    componentRender(<Search location="Packs" />);
    expect(screen.getByTestId('search')).toBeInTheDocument();
  });

  test('Test search text', () => {
    componentRender(<Search location="Packs" />);
    expect(screen.getByTestId('search-title')).toHaveTextContent('Search');
  });
});
