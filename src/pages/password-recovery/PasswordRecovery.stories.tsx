import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { PasswordRecovery } from './PasswordRecovery';

export default {
  title: 'pages/PasswordRecovery',
  component: PasswordRecovery,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof PasswordRecovery>;

const Template: ComponentStory<typeof PasswordRecovery> = args => <PasswordRecovery />;

export const Primary = Template.bind({});
Primary.args = {};
