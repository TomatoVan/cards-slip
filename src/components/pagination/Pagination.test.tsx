import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { componentRender } from '../componentRender/componentRender';

import { Pagination } from './Pagination';

describe('Pagination', () => {
  test('Test pagination DOM', () => {
    componentRender(<Pagination location="Packs" />);
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
});
