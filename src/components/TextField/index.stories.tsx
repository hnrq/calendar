import { ComponentStory, ComponentMeta } from "@storybook/react";

import TextField from ".";

export default {
  title: "TextField",
  component: TextField,
  argTypes: {
    helperText: { type: "string", defaultValue: "" },
    error: { type: "boolean", defaultValue: false },
  },
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = (args) => (
  <TextField {...args} />
);

export const Demo = Template.bind({});
Demo.args = { defaultValue: "I'm a TextField" };
