import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { componentRender } from '../componentRender/componentRender';

import { RangeSlider } from './RangeSlider';

describe('RangeSlider', () => {
  test('Test RangeSlider DOM', () => {
    componentRender(<RangeSlider />);
    expect(screen.getByTestId('slider-title')).toBeInTheDocument();
  });

  test('Test RangeSlider text', () => {
    componentRender(<RangeSlider />);
    expect(screen.getByTestId('slider-title')).toHaveTextContent('Number of cards');
  });
});
