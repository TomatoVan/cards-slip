import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CustomModal } from './CustomModal';

export default {
  title: 'components/CustomModal',
  component: CustomModal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CustomModal>;

const Template: ComponentStory<typeof CustomModal> = args => <CustomModal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: <div>Test children</div>,
  open: true,
  title: 'Test title',
  clearCoverCallback: () => ({}),
  handleClose: () => ({}),
};
