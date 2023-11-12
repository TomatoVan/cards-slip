import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Profile } from './Profile';

export default {
  title: 'pages/Profile',
  component: Profile,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Profile>;

const Template: ComponentStory<typeof Profile> = args => <Profile {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  noAuth: true,
};
