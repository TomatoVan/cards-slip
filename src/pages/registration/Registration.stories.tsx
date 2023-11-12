import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Registration } from './Registration';

export default {
  title: 'pages/Registration',
  component: Registration,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Registration>;

const Template: ComponentStory<typeof Registration> = args => <Registration />;

export const Primary = Template.bind({});
Primary.args = {};
