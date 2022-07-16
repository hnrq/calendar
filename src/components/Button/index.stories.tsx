import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button from ".";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    onClick: { action: true },
    fullWidth: { type: "boolean", defaultValue: false },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Demo = Template.bind({});
Demo.args = { children: "I'm a button" };
