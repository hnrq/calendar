import { useState } from "react";
import { MemoryRouter } from "react-router-dom";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Modal from ".";

export default {
  title: "Modal",
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open modal</button>
      <Modal {...args} open={open} onClose={() => setOpen(false)}>
        <h1>Hello, Modal!</h1>
      </Modal>
    </>
  );
};

export const Demo = Template.bind({});
