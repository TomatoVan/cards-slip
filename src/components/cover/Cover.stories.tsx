import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Cover } from './Cover';

export default {
  title: 'components/Cover',
  component: Cover,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Cover>;

const Template: ComponentStory<typeof Cover> = args => <Cover {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  cover: null,
  question: 'test question',
  cardTitleCover: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
  cover: 'cover test',
  question: 'test question',
  cardTitleCover: false,
};
