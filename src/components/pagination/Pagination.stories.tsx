import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Pagination } from './Pagination';

export default {
  title: 'components/Pagination',
  component: Pagination,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = args => <Pagination {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  location: 'Packs',
};

export const Secondary = Template.bind({});
Primary.args = {
  location: 'My',
};

export const PaginationEmpty = Template.bind({});
PaginationEmpty.args = {
  location: 'null',
};
