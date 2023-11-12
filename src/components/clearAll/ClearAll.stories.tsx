import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ClearAll } from './ClearAll';

export default {
  title: 'components/ClearAll',
  component: ClearAll,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ClearAll>;

const Template: ComponentStory<typeof ClearAll> = args => <ClearAll {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  accessoryQueryFilter: 'Packs',
};

export const Secondary = Template.bind({});
Primary.args = {
  accessoryQueryFilter: 'My',
};

export const ClearAllEmpty = Template.bind({});
ClearAllEmpty.args = {
  accessoryQueryFilter: 'null',
};
