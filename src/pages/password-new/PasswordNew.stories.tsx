import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { PasswordNew } from './PasswordNew';

export default {
  title: 'pages/PasswordNew',
  component: PasswordNew,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof PasswordNew>;

const Template: ComponentStory<typeof PasswordNew> = args => <PasswordNew />;

export const Primary = Template.bind({});
Primary.args = {};
