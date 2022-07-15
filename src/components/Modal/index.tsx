import { FC, PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { motion, AnimatePresence } from "framer-motion";

import "./index.scss";

export interface ModalProps {
  onClose: () => void;
  open: boolean;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  children,
  onClose,
  open,
}) => {
  const [modalOpen, setModalOpen] = useState(open);

  useEffect(() => {
    setModalOpen(open);
  }, [open]);

  useEffect(() => {
    document.documentElement.classList.toggle("modal-open", modalOpen);

    return () => {
      document.documentElement.classList.toggle("modal-open", false);
    };
  }, [modalOpen]);

  return createPortal(
    <AnimatePresence onExitComplete={onClose}>
      {modalOpen ? (
        <div className="modal">
          <motion.div
            className="modal__backdrop"
            data-testid="modal__backdrop"
            onClick={() => setModalOpen(false)}
            initial={{ opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.5 } }}
          />
          <motion.div
            className="modal__content p-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.25, duration: 0.5 },
            }}
            exit={{ opacity: 0, y: 50, transition: { duration: 0.5 } }}
          >
            {children}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.getElementById("modal-root") as Element
  );
};

export default Modal;
