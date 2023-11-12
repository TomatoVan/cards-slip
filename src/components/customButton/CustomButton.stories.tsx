import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CustomButton } from './CustomButton';

export default {
  title: 'components/CustomButton',
  component: CustomButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CustomButton>;

const Template: ComponentStory<typeof CustomButton> = args => <CustomButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'submit',
  submit: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
  title: 'cancel',
  submit: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  title: 'disabled',
  submit: true,
  disabled: true,
};
