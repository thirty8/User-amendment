import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { AiOutlineCloseCircle, AiOutlineDoubleRight } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import DataTable from "../../../../../../components/others/Datatable/DataTable";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import ArrowButtonDetails from "./ArrowButtonDetails";
import { API_SERVER } from "../../../../../../config/constant";
import swal from "sweetalert";
// import CustomTable from "../../../../../../components/others/customtable";
import CustomTable from "../../../../teller-ops/components/CustomTable";
import OverlayLoader from "../../../../../../components/others/OverlayLoader";
import InputField from "../../../../../../components/others/Fields/InputField";
import RadioButtons from "../../../../../../components/others/Fields/RadioButtons";
import Header from "../../../../../../components/others/Header/Header";

function PostedTransactions({
  show,
  handleClose,
  postedTransData,
  handleShowPostedTransaction,
  fetchData1,
  setFetchData1,
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
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  const [showArrowComponent, setShowArrowComponent] = useState(false);
  const [arrowDetails, setArrowDetails] = useState([]);
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };
  const [display, setDisplay] = useState(false);

  return (
    <div>
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
        postLoader={fetchData1}
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

      {/* buttons  */}
      <div>
        <div style={{ display: "flex", flex: 1, margin: "10px 0" }}>
          <div style={{ flex: 0.8 }}> </div>

          <div style={{ flex: 0.2 }}>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <ButtonComponent
                label={"Fetch"}
                buttonHeight={"30px"}
                buttonWidth={"55px"}
                onClick={() => {
                  // setFetchData1(true);
                  handleShowPostedTransaction();
                }}
              />
              <ButtonComponent
                label={"Refresh"}
                buttonHeight={"30px"}
                buttonWidth={"80px"}
                buttonColor={"white"}
                onClick={() => {
                  // setFetchData1(true);
                  setBatch_number("");
                  setApprovalFlagFilter("");
                  setBatchAmount("");
                  setValue_Date("");
                  handleShowPostedTransaction("R");
                }}
              />
              <ButtonComponent
                label={"Exit"}
                buttonHeight={"30px"}
                buttonWidth={"60px"}
                onClick={handleClose}
                buttonColor={"white"}
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: "0px 10px 15px 10px", zoom: "0.9" }}>
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
          data={postedTransData}
          loading={{
            status: loadingCustomTable,
            message: "Processing Data...",
          }}
          rowsPerPage={8}
          style={{ columnAlignRight: [5], columnAlignCenter: [4] }}
        />
      </div>
    </div>
  );
}

export default PostedTransactions;
