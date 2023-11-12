import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { NotFound } from './NotFound';

export default {
  title: 'pages/NotFound',
  component: NotFound,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NotFound>;

const Template: ComponentStory<typeof NotFound> = args => <NotFound />;

export const Primary = Template.bind({});
Primary.args = {};
