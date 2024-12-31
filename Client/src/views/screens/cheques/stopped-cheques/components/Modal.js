import Modal from "react-bootstrap/Modal";
import { useState } from "react";
// import AutoReceiptPrinting from "../../../../../../components/AutoReceiptPrinting";
// import DataTable from "../../../../../../components/others/Datatable/DataTable";
// import DataTable from './../../../../lending/components/data-table/DataTable';
import DataTable from "../../../../../components/others/Datatable/DataTable";
const ChargesModal = ({ showModal, setShowModal }) => {
  const handleClose = () => {
    setShowModal(false);
  };

  const [modalSize, setModalSize] = useState("xl");
  const [getTheme, setTheme] = useState(JSON.parse(localStorage.getItem("theme")));
  return (
    <>
      <Modal
        id="chargesModal"
        key="chargesModal"
        backdrop="static"
        size={modalSize}
        fullscreen={false}
        show={showModal}
        onHide={handleClose}
        // centered
      >
        <DataTable />
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
            className=" w-full"
          >
            <div className=" flex justify-between py-1 px-2 items-center ">
              <div className="text-white font-semibold">AUTORECEIPT PRINTING</div>

              <svg
                onClick={() => handleClose()}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                // style={{ padding: "10px" }}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer fill-cyan-500 stroke-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          {/* <hr style={{ marginTop: "-10%" }} /> */}
        </Modal.Header>
        <Modal.Body style={{ background: "whitesmoke" }}>
          {/* <AutoReceiptPrinting batchNo={batchNo} /> */}
          <DataTable
            headerColor={"rgb(21 163 183)"}
            headerText="white"
            title={"Cheque Book Requisition"}
            columns={[
              "Chg. Code.",
              "Fee Account",
              "Fee Account Description",
              "Fees Description",
              "Fee Amount Per Book",
              "Currency",
            ]}
          />
        </Modal.Body>
        <Modal.Footer style={{ display: "none" }}>
          {/* <Button id="chargesModalCloseBtn" style={{ background: "#0047AB", color: "white", paddingLeft: "20px", paddingRight: "20px" }} variant='dark' onClick={props.onHide}>Close Form</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChargesModal;
