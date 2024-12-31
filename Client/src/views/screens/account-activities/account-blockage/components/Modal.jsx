import Modal from "react-bootstrap/Modal";
import { useState } from "react";

import swal from "sweetalert";
import InputField from "../../../../../components/others/Fields/InputField";
import Index_approval from "./index_approval";
const GlobalModal = ({ showModal, setShowModal, body, srrn }) => {
  const handleClose = () => {
    swal({
      title: "Are you sure?",
      text: "You're about to close the '" + body + "' form",
      icon: "warning",
      buttons: ["Cancel", "Yes, Close Form"],
      dangerMode: true,
    }).then((result) => {
      if (result) {
        setShowModal(false);
      }
    });
  };
  const handleShow = () => setShowModal(true);
  const [fullScreen, setFullscreen] = useState(false);
  const [modalSize, setModalSize] = useState("xl");

  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  let modalBody;
  
  return (
    <Modal
      id="globalModal"
      key="globalModal"
      backdrop="static"
      size={modalSize}
      fullscreen={"xl"}
      show={showModal}
      onHide={handleClose}
      // centered
    >
      <Modal.Header>
       
        <div
          style={{
            background:
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`,
            
          }}
          className="flex justify-between items-center w-full h-[70px] bg-no-repeat"
        >
          <div
            className="capitalize px-2 py-4 "
            style={{ fontSize: "16px", color: "whitesmoke" }}
          >
            <span style={{ color: "whitesmoke" }}>
              {(document.location.pathname.split("/").slice(0, 2) + "")
                .replace(/,/g, "")
                .replace(/-/g, " ")
                ? (document.location.pathname.split("/").slice(0, 2) + "")
                    .replace(/,/g, "")
                    .replace(/-/g, " ")
                : "Dashboard"}
            </span>
            &nbsp; / &nbsp;
            {(document.location.pathname.split("/").slice(2, 4) + "").replace(
              /-/g,
              " "
            )}
            &nbsp; / &nbsp;
            <span style={{ color: "whitesmoke" }}>
              {localStorage.getItem("formName")}
            </span>
            &nbsp;/ &nbsp;
            <span style={{ color: "whitesmoke" }}>{body}</span>
          </div>
          <button onClick={handleClose} className="mr-2  ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 stroke-white rounded-sm border border-white p-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <hr style={{ marginTop: "-10%" }} />
      </Modal.Header>
      <Modal.Body style={{ background: "whitesmoke", marginTop: "-15px" }}>
        <div className="mt-2">
           {srrn}
        </div>

        <br />
      </Modal.Body>
      <Modal.Footer style={{ display: "none" }}>
        {/* <Button id="globalModalCloseBtn" style={{ background: "#0047AB", color: "white", paddingLeft: "20px", paddingRight: "20px" }} variant='dark' onClick={props.onHide}>Close Form</Button> */}
      </Modal.Footer>
    </Modal>
    
  );
};

export default GlobalModal;