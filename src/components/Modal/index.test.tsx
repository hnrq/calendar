import { PropsWithChildren } from "react";

import { fireEvent, render, waitFor } from "@testing-library/react";

import Modal, { ModalProps } from ".";

const defaultProps = {
  onClose: jest.fn(),
  open: true,
};

const renderModal = (props?: Partial<PropsWithChildren<ModalProps>>) =>
  render(
    <Modal {...defaultProps} {...props}>
      <span>content</span>
    </Modal>
  );

describe("<Modal />", () => {
  beforeAll(() => {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.append(modalRoot);
  });

  it("renders a backdrop when props.open === true", () => {
    const { getByTestId } = renderModal();

    expect(getByTestId("modal__backdrop")).toBeInTheDocument();
  });

  it("renders children props.open === true", () => {
    const contentText = "Modal content";

    const { getByText } = render(
      <Modal {...defaultProps}>
        <span>{contentText}</span>
      </Modal>
    );

    expect(getByText(contentText)).toBeInTheDocument();
  });

  it("adds modal-open class to body when props.open === true", () => {
    renderModal();
    expect(document.documentElement.className).toBe("modal-open");
  });

  it("calls onClose when clicking backdrop", async () => {
    const onClose = jest.fn();
    const { getByTestId } = renderModal({ onClose });

    fireEvent.click(getByTestId("modal__backdrop"));

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });
});
