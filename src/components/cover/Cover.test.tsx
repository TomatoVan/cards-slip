import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { componentRender } from '../componentRender/componentRender';

import { Cover } from './Cover';

describe('Cover', () => {
  test('Test Cover DOM', () => {
    componentRender(<Cover cover={null} />);
    expect(screen.getByTestId('cover')).toBeInTheDocument();
  });

  test('Test Cover empty', () => {
    componentRender(<Cover cover="test" />);
    expect(screen.getByTestId('cover-img')).toBeInTheDocument();
  });

  test('Test Cover question', () => {
    componentRender(<Cover cover="test" question="test question" />);
    expect(screen.getByText('test question')).toBeInTheDocument();
  });
});
