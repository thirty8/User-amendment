import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import "bootstrap/dist/css/bootstrap.css";
import { IoMdClose } from "react-icons/io";

// import { IoMdSearch } from "react-icons/io";

function ModalComponent({
  textColor,
  buttonBackgroundColor,
  buttonWidth,
  text,
  modalBody,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [getTheme1, setTheme1] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  return (
    <div>
      <Button
        onClick={handleShow}
        style={{
          height: "25px",
          borderRadius: "3px",
          width: buttonWidth,
          padding: "0px 5px",
          border: "1px solid rgb(157, 157, 157)",
          textAlign: "center",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          // backgroundColor: buttonBackgroundColor,
          background:
            `url(` +
            window.location.origin +
            `/assets/images/headerBackground/` +
            getTheme1.theme.headerImage +
            `)`,
          color: textColor,
        }}
      >
        {text}
      </Button>

      <Modal show={show} onHide={handleClose} size={"lg"}>
        <Modal.Header>
          {/* closeButton */}
          <Modal.Title>{/* Modal heading */}</Modal.Title>
          <div onClick={handleClose} style={{ padding: " 10px 10px" }}>
            <IoMdClose color="blue" size={25} />
          </div>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" style={{ marginRight: "80px" }}>
            Find{" "}
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Ok{" "}
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Cancel{" "}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalComponent;
