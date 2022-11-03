import React from "react";
import { X } from "react-feather";
import Modal from "react-modal";

interface GlobalModalProps {
  openModal: boolean;
  handleClose: () => any;
  title: string;
  children: JSX.Element;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    height: "50%",
    width: "50%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const GlobalModal = ({
  openModal,
  handleClose,
  title,
  children,
}: GlobalModalProps) => {
  return (
    <Modal isOpen={openModal} onRequestClose={handleClose} style={customStyles}>
      <div className="flex justify-between items-center mb-12">
        <div></div>
        <h1 className="font-bold text-xl">{title}</h1>
        <X className="cursor-pointer" onClick={handleClose} />
      </div>
      {children}
    </Modal>
  );
};

export default GlobalModal;
