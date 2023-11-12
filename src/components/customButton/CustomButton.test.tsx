import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { componentRender } from '../componentRender/componentRender';

import { CustomButton } from './CustomButton';

describe('Button', () => {
  test('Test Button DOM', () => {
    componentRender(
      <CustomButton submit title="test title" disabled={false} callBack={() => ({})} />,
    );
    expect(screen.getByTestId('button')).toBeInTheDocument();
  });

  test('Test Button title', () => {
    componentRender(
      <CustomButton submit title="test title" disabled={false} callBack={() => ({})} />,
    );
    expect(screen.getByText('test title')).toBeInTheDocument();
  });

  test('Test Button classname', () => {
    componentRender(
      <CustomButton submit title="Cancel" disabled={false} callBack={() => ({})} />,
    );
    expect(screen.getByTestId('button')).toHaveClass('button button--cancel');
  });
});
