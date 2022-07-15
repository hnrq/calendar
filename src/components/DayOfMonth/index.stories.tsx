import { MemoryRouter } from "react-router-dom";

import reminders from "__mocks__/reminders";
import { expect } from "@storybook/jest";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";

import DayOfMonth from ".";

export default {
  title: "DayOfMonth",
  component: DayOfMonth,
  argTypes: {
    onClick: { action: true },
  },
} as ComponentMeta<typeof DayOfMonth>;

const Template: ComponentStory<typeof DayOfMonth> = (args) => (
  <MemoryRouter>
    <div
      style={{
        width: "120px",
        height: "120px",
        border: "2px solid black",
        overflow: "hidden",
      }}
    >
      <DayOfMonth {...args} />
    </div>
  </MemoryRouter>
);

export const Demo = Template.bind({});

Demo.args = {
  date: new Date(),
  reminders,
};

Demo.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByText(args.date.getDate()));
  await expect(args.onClick).toHaveBeenCalled();
};
