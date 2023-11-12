import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { PacksPage } from './PacksPage';

export default {
  title: 'pages/PacksPage',
  component: PacksPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof PacksPage>;

const Template: ComponentStory<typeof PacksPage> = args => <PacksPage {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  noAuth: true,
};
