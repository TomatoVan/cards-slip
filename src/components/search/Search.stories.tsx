import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Search } from './Search';

export default {
  title: 'components/Search',
  component: Search,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = args => <Search {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  location: 'Packs',
};
