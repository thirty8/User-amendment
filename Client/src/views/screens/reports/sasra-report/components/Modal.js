import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import DataTable from "../../../../../components/others/Datatable/DataTable";
import { MDBIcon } from 'mdb-react-ui-kit';
import { API_SERVER } from "../../../../../config/constant";
import DownloadReportButtons from './DownloadReportButtons';

import axios from "axios";

const headers = {
  'x-api-key': "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  'Content-Type': 'application/json'
};

const GlobalModal = ({
  showModal,
  setShowModal,
  dataProcessingInfo,
  body,
  title,
}) => {
    const [filter, setFilter] = useState([]);
  const handleClose = () => {
    setShowModal(false);
  };
  //   const handleShow = () => setShowModal(true);
  const [fullScreen, setFullscreen] = useState(false);
  const [modalSize, setModalSize] = useState("xl");

  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  async function handleChange(e) {
    try {
      const response = await axios.post(API_SERVER + "/api/find-by-name", {
        accountName: e.target.value,
      }, { headers });
      const arr = [];

      response.data.map((i) => {
        arr.push(Object.values(i));
      });
      setFilter(arr);
    } catch (error) {
      console.log(error);
    }
  }
  //   console.log({ filter });
  // if (body === "Cash Withdrawal") {
  //   modalBody = <CashWithdrawal handleClose={handleClose} />;
  // } else if (body === "Multi-currency Cash Deposit") {
  //   modalBody = <MultiCurrencyCashDeposit />;
  // } else if (body === "Multi-currency Cash Withdrawal") {
  //   modalBody = <MultiCurrencyCashWithdrawal />;
  // } else if (body === "Cash Deposit") {
  //   modalBody = <CashDeposit />;
  // } else if (body === "Cheque Deposit") {
  //   modalBody = <ChequeDeposit />;
  // } else if (body === "Cheque Withdrawal") {
  //   modalBody = <ChequeWithdrawal handleClose={handleClose} />;
  // }
  return (
    <Modal
      id="globalModal"
      key="globalModal"
      backdrop="static"
      size={modalSize}
      fullscreen={"lg"}
      show={showModal}
      onHide={handleClose}
      centered
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
          className="flex justify-between items-center w-full h-[50px] bg-no-repeat"
        >
          {/* <div
            className="font-semibold uppercase px-2"
            style={{ fontSize: "16px", color: "whitesmoke" }}
          >
            
          </div> */}
          <div className="w-full  flex justify-between ">
            <Modal.Title
              style={{
                fontSize: "14.5px",
                color: "white",
                padding: "10px",
              }}
            >
              <p>LOAN CLASSIFICATION (SASRA FORM 2D)</p>
            </Modal.Title>
            <svg
              onClick={() => handleClose()}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              style={{ padding: "10px" }}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-11 h-11 cursor-pointer fill-cyan-500 stroke-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          {/* <button onClick={handleClose} className="mr-2  ">
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
          </button> */}
        </div>
        <hr style={{ marginTop: "-10%" }} />
      </Modal.Header>
      <Modal.Body style={{ background: "whitesmoke", marginTop: "-15px" }}>
        {/* <div className="bg-gray-200 px-2 py-1">
          <div>
            <p>Find a partial value to limit the list , %% to see all values</p>
            <p>
              Warning : Entering % to see all values may take a very long time
              Entering criteria that can be used to reduce the list may be
              significantly faster
            </p>
          </div>
          <div>
            <div>
              <InputField
                label={"Find"}
                labelWidth={"15%"}
                inputWidth={"85%"}
                onChange={handleChange}
              />
            </div>
            <div className="scale-y-[0.9] -mt-2">
              <DataTable
                data={filter}
                rowsPerPage={10}
                columns={["Account Name", "Account Number", "ISO code"]}
              />
            </div>
          </div>
        </div> */}

        <DownloadReportButtons data={body} />

        <hr style={{ marginTop: "6px", marginBottom: "6px" }} />

        <div className="">
          {/* <hr style={{ marginTop: "0px" }} /> */}
          <DataTable
            rowsPerPage={5}
            data={body}
            title={<span className="text-sm">{title}</span>}
            dataProcessingInfo={dataProcessingInfo}
            columns={[
              "CLASSIFICATION",
              "BALANCE",
              "REQUEST PROVISION",
              "CURRENCY PROVISION AMOUNT",
            ]}
          />
        </div>
      </Modal.Body>
      <Modal.Footer style={{ display: "none" }}>
        {/* <Button id="globalModalCloseBtn" style={{ background: "#0047AB", color: "white", paddingLeft: "20px", paddingRight: "20px" }} variant='dark' onClick={props.onHide}>Close Form</Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default GlobalModal;
