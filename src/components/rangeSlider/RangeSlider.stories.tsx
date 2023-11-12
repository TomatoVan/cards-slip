import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { RangeSlider } from './RangeSlider';

export default {
  title: 'components/RangeSlider',
  component: RangeSlider,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof RangeSlider>;

const Template: ComponentStory<typeof RangeSlider> = args => <RangeSlider />;

export const Primary = Template.bind({});
Primary.args = {
  location: 'Packs',
};
