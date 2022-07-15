import reminders from "__mocks__/reminders";
import { expect } from "@storybook/jest";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";

import Reminder from ".";

export default {
  title: "Reminder",
  component: Reminder,
  argTypes: {
    onClick: { action: true },
  },
} as ComponentMeta<typeof Reminder>;

const Template: ComponentStory<typeof Reminder> = (args) => (
  <Reminder {...args} />
);

export const Demo = Template.bind({});

Demo.args = {
  reminder: reminders[0],
};

Demo.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByText(args.reminder.label));
  await expect(args.onClick).toHaveBeenCalled();
};
