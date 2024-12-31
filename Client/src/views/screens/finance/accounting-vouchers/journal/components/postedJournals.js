import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import DataTable from "../../../../../../components/others/Datatable/DataTable";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineDoubleRight } from "react-icons/ai";
import InputField from "../../../../../../components/others/Fields/InputField";
import swal from "sweetalert";
import { API_SERVER } from "../../../../../../config/constant";
import axios from "axios";
// import Accountfilter from "./postedTransactions";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import CustomTable from "../../../../teller-ops/components/CustomTable";
import Header from "../../../../../../components/others/Header/Header";
import OverlayLoader from "../../../../../../components/others/OverlayLoader";
import RadioButtons from "../../../../../../components/others/Fields/RadioButtons";

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};
function ViewPosted({
  postedData,
  closePostedModal,
  setPostedData,
  setPostedModal,
  fetchData1,
  postedTransactions,
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
  return (
    <div>
      <div>
        <Header
          title={"POSTED JOURNAL TRANSACTIONS"}
          fontWeight={"500"}
          backgroundColor={"#0580c0"}
          closeIcon={
            <AiOutlineCloseCircle size={20} className="mr-2 cursor-pointer" />
          }
          handleClose={() => {
            closePostedModal();
            setPostedData([]);
          }}
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
      <div style={{ padding: "5px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            gap: "8px",
            margin: "10px 0",
            padding: "5px",
            borderBottom: "1px solid lightgray",
          }}
        >
          <ButtonComponent
            label={"Fetch"}
            buttonHeight={"30px"}
            buttonWidth={"55px"}
            onClick={() => {
              // setFetchData1(true);
              postedTransactions();
            }}
          />
          <ButtonComponent
            label={"Refresh"}
            buttonHeight={"30px"}
            buttonWidth={"65px"}
            onClick={() => {
              // setFetchData1(true);
              setBatch_number("");
              setApprovalFlagFilter("");
              setBatchAmount("");
              setValue_Date("");
              postedTransactions("R");
            }}
          />
          <ButtonComponent
            label={"Exit"}
            buttonHeight={"30px"}
            buttonWidth={"55px"}
            onClick={() => {
              setPostedModal(false);
              setPostedData([]);
            }}
          />
        </div>
        {/* {dataTableComponent ? ( */}

        <CustomTable
          headers={[
            "Batch Number",
            "Batch Status",
            "Batch Description",
            "Value Date",
            "Trans Count",
            "Batch Amount",
            "Action",
          ]}
          data={postedData}
          rowsPerPage={8}
          style={{
            columnAlignRight: [6],
            columnAlignCenter: [5],
          }}
          loading={{
            status: loadingCustomTable,
            message: "Processing Data...",
          }}
        />
      </div>
    </div>
  );
}

export default ViewPosted;
