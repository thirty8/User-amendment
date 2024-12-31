import React from "react";
import { Modal } from "antd";
const ModalComponent = ({ title, open, closable, width, onClose, loading, content, className }) => {
  return (
    <>
      <Modal
        inert
        title={title}
        footer={null}
        closable={closable}
        width={width || "60%"}
        maskClosable={false}
        className={{ className }}
        // footer={footerComponent}
        loading={loading}
        open={open}
        onCancel={onClose}
        // footer={null}
      >
        {content}
      </Modal>
    </>
  );
};
export default ModalComponent;
