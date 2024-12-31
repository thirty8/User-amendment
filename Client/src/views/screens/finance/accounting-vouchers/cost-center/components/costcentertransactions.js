import React, { useState } from "react";
import CustomTable from "../../../../teller-ops/components/CustomTable";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import InputField from "../../../../../../components/others/Fields/InputField";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Header from "../../../../../../components/others/Header/Header";
import OverlayLoader from "../../../../../../components/others/OverlayLoader";
import RadioButtons from "../../../../../../components/others/Fields/RadioButtons";

function CostCenterTransactions({
  postedTransactions,
  setPostedModal,
  setBatchNumber,
  fetchPostedTransactions,
  batchNumber,
  fetchData1,
  setFetchData1,
  setBatchAmount,
  batch_amount,
  setApprovalFlagFilter,
  approvalFlagFilter,
  setDate_t,
  date_t,
  loadingCustomTable,
}) {
  return (
    <div>
      <Header
        title={"Posted Transactions"}
        backgroundColor={"#0580c0"}
        closeIcon={
          <AiOutlineCloseCircle
            size={18}
            onClick={() => setPostedModal(false)}
          />
        }
      />
      <OverlayLoader
        postLoader={fetchData1}
        // color={"#0580c0"}
        textColor={true}
        displayText={"Fetching Data..."}
      />
      <div className="p-2">
        <div className="">
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
                onChange={(e) => setBatchNumber(e.target.value)}
                value={batchNumber}
              />
              <InputField
                label={"Batch Amount"}
                labelWidth={"30%"}
                inputWidth={"50%"}
                onChange={(e) => setBatchAmount(e.target.value)}
                value={batch_amount}
              />
              {/* <InputField
                label={"Batch Amount"}
                labelWidth={"30%"}
                inputWidth={"50%"}
                onChange={(e) => setBatchAmount(e.target.value)}
                value={batch_amount}
              /> */}
            </div>
            <div className="flex items-center justify-between">
              <InputField
                label={"Value Date"}
                labelWidth={"30%"}
                inputWidth={"50%"}
                type={"date"}
                onChange={(e) => setDate_t(e.target.value)}
                value={date_t}
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
        <hr className="my-2" />
        <div className="flex justify-end gap-2">
          <ButtonComponent
            label={"Fetch"}
            buttonHeight={"30px"}
            buttonWidth={"50px"}
            onClick={() => {
              // setFetchData1(true);
              fetchPostedTransactions();
            }}
          />
          <ButtonComponent
            label={"Refresh"}
            buttonHeight={"30px"}
            buttonWidth={"65px"}
            onClick={() => {
              // setFetchData1(true);
              setBatchAmount("");
              setApprovalFlagFilter("");
              setBatchNumber("");
              setDate_t("");
              fetchPostedTransactions("R");
            }}
          />
          <ButtonComponent
            label={"Exit"}
            buttonHeight={"30px"}
            buttonWidth={"50px"}
            onClick={() => {
              setBatchNumber("");
              setPostedModal(false);
            }}
          />
        </div>
        <hr className="my-2" />
        <div>
          <CustomTable
            headers={[
              "Batch Status",
              "Value Date",
              "Batch Number",
              "Batch Description",
              "Trans Count",
              "Batch Amount",
              "Action",
            ]}
            data={postedTransactions}
            rowsPerPage={8}
            loading={{
              status: loadingCustomTable,
              message: "Processing Data...",
            }}
            style={{
              columnAlignRight: [7],
              columnAlignCenter: [1, 6],
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CostCenterTransactions;
