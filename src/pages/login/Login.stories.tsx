import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Login } from './Login';

export default {
  title: 'pages/Login',
  component: Login,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Login>;

const Template: ComponentStory<typeof Login> = args => <Login />;

export const Primary = Template.bind({});
Primary.args = {};
