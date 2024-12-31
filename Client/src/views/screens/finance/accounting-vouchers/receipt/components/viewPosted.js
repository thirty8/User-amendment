import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import DataTable from "../../../../../../components/others/Datatable/DataTable";
// import CustomTable from '../../../../../../components/others/customtable';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineDoubleRight } from "react-icons/ai";
import InputField from "../../../../../../components/others/Fields/InputField";
import swal from "sweetalert";
import { API_SERVER } from "../../../../../../config/constant";
import axios from "axios";
import Accountfilter from "./postedTransactions";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import CustomTable from "../../../../teller-ops/components/CustomTable";
import OverlayLoader from "../../../../../../components/others/OverlayLoader";
import RadioButtons from "../../../../../../components/others/Fields/RadioButtons";
import Header from "../../../../../../components/others/Header/Header";

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};
function ViewPosted({
  showModal3,
  handleClose,
  postedDataReceipt,
  postedTransactions,
  r_trans_type,
  fetchData2,
  setFetchData2,
  setBatch_number,
  batch_number,
  setBatchAmount,
  batch_amount,
  setValue_Date,
  value_Date,
  setApprovalFlagFilter,
  approvalFlagFilter,
  loadingCustomTable,
}) {
  const [modalSize, setModalSize] = useState("lg");
  const [postedData1, setPostedData1] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [oomodal, setoomodal] = useState(false);
  const [showInputElement, setShowInputElement] = useState(false);
  const [approval, setApproval] = useState("");
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  const handleCloseModal4 = () => {
    setOpenModal(false);
  };
  const handleOpenModal4 = () => {
    setOpenModal(true);
  };
  const showScreen = () => {
    setoomodal(true);
  };

  return (
    <div>
      {/* <Modal
      id="globalModal"
      key="globalModal"
      backdrop="static"
      size={modalSize}
      fullscreen={"xl"}
      show={showModal3}
      onHide={handleClose}
      centered
    > */}

      {/* {oomodal && 
    <div>
<p>jjjjjjj</p>
    </div>
    } */}
      {openModal && (
        <Modal
          className="p-0 m-0"
          opened={openModal}
          size="80%"
          style={{ margin: 0, padding: 0 }}
          withCloseButton={false}
          transitionProps={"mounted"}
          onClose={handleCloseModal4}
        >
          <Accountfilter
            showModal4={openModal}
            handleClose={handleCloseModal4}
            postedData1={postedData1}
            showInput={showInputElement}
            approval={approval}
          />
        </Modal>
      )}
      {/* <Modal.Body style={{ background: "whitesmoke",padding:0 }}> */}
      <div
        className="flex justify-between items-center w-full bg-no-repeat"
        style={{
          background: "#0580c0",
          color: "white",
          borderTopLeftRadius: "3px",
          borderTopRightRadius: "3px",
          height: "25px",
          fontSize: "1.1em",
          paddingLeft: "10px",
          alignItems: "center",
        }}
      >
        <span>Posted Transactions</span>
        <AiOutlineCloseCircle
          size={20}
          onClick={handleClose}
          className="mr-2 cursor-pointer"
        />
      </div>
      <OverlayLoader
        postLoader={fetchData2}
        // color={"#0580c0"}
        textColor={true}
        displayText={"Fetching Data..."}
      />
      <div className="p-2">
        <div>
          <Header title={"Filters"} headerShade={true} />
        </div>
        <div
          className="px-2 py-4 flex flex-col gap-3 rounded-sm mt-1"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          }}
        >
          <div className="flex items-center justify-between">
            <InputField
              label={"Batch Number"}
              labelWidth={"30%"}
              inputWidth={"50%"}
              onChange={(e) => setBatch_number(e.target.value)}
              value={batch_number}
            />
            <InputField
              label={"Batch Amount"}
              labelWidth={"30%"}
              inputWidth={"50%"}
              onChange={(e) => setBatchAmount(e.target.value)}
              value={batch_amount}
            />
          </div>
          <div className="flex items-center justify-between">
            <InputField
              label={"Value Date"}
              labelWidth={"30%"}
              inputWidth={"50%"}
              type={"date"}
              onChange={(e) => setValue_Date(e.target.value)}
              value={value_Date}
            />
            <RadioButtons
              label={"Batch Status"}
              labelWidth={"30%"}
              name={"batch_status"}
              id={"pending_approval"}
              radioLabel={"Pending Approval"}
              display={true}
              id2={"rejected"}
              radioLabel2={"Rejected"}
              display2={true}
              value={"N"}
              checked={approvalFlagFilter === "N"}
              value2={"R"}
              checked2={approvalFlagFilter === "R"}
              onChange={(e) => setApprovalFlagFilter(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 p-2">
        <div>
          <ButtonComponent
            label={"Fetch"}
            buttonHeight={"30px"}
            buttonWidth={"60px"}
            buttonColor={"white"}
            onClick={() => {
              // setFetchData2(true);
              postedTransactions();
            }}
          />
        </div>
        <div>
          <ButtonComponent
            label={"Refresh"}
            buttonHeight={"30px"}
            buttonWidth={"80px"}
            buttonColor={"white"}
            onClick={() => {
              // setFetchData2(true);
              setBatch_number("");
              setApprovalFlagFilter("");
              setBatchAmount("");
              setValue_Date("");
              postedTransactions("R");
            }}
          />
        </div>
        <div>
          <ButtonComponent
            label={"Exit"}
            buttonHeight={"30px"}
            buttonWidth={"60px"}
            onClick={handleClose}
            buttonColor={"white"}
          />
        </div>
      </div>

      <div className="bg-gray-100 px-2 py-1">
        <div className="mt-2" style={{ zoom: 0.9 }}>
          <CustomTable
            headers={[
              "Batch Number",
              "Value Date",
              "Batch Description",
              "Trans Count",
              "Batch Amount",
              "Batch Status",
              "Action",
            ]}
            data={postedDataReceipt}
            loading={{
              status: loadingCustomTable,
              message: "Processing Data...",
            }}
            rowsPerPage={10}
            style={{ columnAlignRight: [5], columnAlignCenter: [4, 8] }}
          />
        </div>
      </div>
    </div>
  );
}

export default ViewPosted;
