import * as React from "react";
import { Modal } from "@mui/material";

export default function CustomModal({ children, open, handleClose }) {
  return (
    <Modal
      sx={{
        border: "none",
        outline: "none",
        "&:focus": {
          outline: "none", // Remove outline when modal receives focus
        },
      }}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex flex-col items-center justify-center "
    >
      <div className="bg-white absolute lg:w-[555px] h-30  text-center rounded-[10px] flex flex-col items-center justify-center">
        {children}
      </div>
    </Modal>
  );
}
