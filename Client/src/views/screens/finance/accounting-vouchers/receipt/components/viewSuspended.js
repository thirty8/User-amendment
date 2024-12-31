import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineDoubleRight } from "react-icons/ai";
import DataTable from "../../../../../../components/others/Datatable/DataTable";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import { API_SERVER } from "../../../../../../config/constant";
import axios from "axios";
// import CustomTable from '../../../../../../components/others/customtable';
import CustomTable from "../../../../teller-ops/components/CustomTable";
import OverlayLoader from "../../../../../../components/others/OverlayLoader";
import InputField from "../../../../../../components/others/Fields/InputField";
import Header from "../../../../../../components/others/Header/Header";

function ViewSuspended({
  showModalSuspended,
  handleClose,
  suspendedDataReceipt,
  branchlov,
  currency,
  getViewSuspendReceiptData,
  fetchData,
  fetchData3,
  setFetchData3,
  setBatch_number,
  batch_number,
  setBatchAmount,
  batch_amount,
  setValue_Date,
  value_Date,
  loadingCustomTable,
}) {
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  const [suspend, setSuspend] = useState(false);
  const [suspendDetails, setSuspendDetails] = useState([]);
  const suspendRCPTModalOpen = () => {
    setSuspend(true);
  };
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
        <span>Suspended Transactions</span>
        <AiOutlineCloseCircle
          size={20}
          onClick={handleClose}
          className="mr-2 cursor-pointer"
        />
      </div>
      <OverlayLoader
        postLoader={fetchData || fetchData3}
        // color={"#0580c0"}
        textColor={true}
        displayText={fetchData ? "Loading..." : "Processing data..."}
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
          <div className="flex items-center justify-start">
            <div className="w-1/2">
              <InputField
                label={"Value Date"}
                labelWidth={"30%"}
                inputWidth={"50%"}
                type={"date"}
                onChange={(e) => setValue_Date(e.target.value)}
                value={value_Date}
              />
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 p-2">
        <div>
          <ButtonComponent
            label={"Fetch"}
            buttonHeight={"30px"}
            buttonWidth={"60px"}
            onClick={() => {
              // setFetchData3(true);
              getViewSuspendReceiptData();
            }}
          />
        </div>
        <div>
          <ButtonComponent
            label={"Refresh"}
            buttonHeight={"30px"}
            buttonWidth={"80px"}
            onClick={() => {
              // setFetchData3(true);
              setBatch_number("");
              // setApprovalFlagFilter("");
              setBatchAmount("");
              setValue_Date("");
              getViewSuspendReceiptData("R");
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
      <hr style={{ border: "1px solid lightgray", marginBottom: "5px" }} />
      <div className="bg-gray-100 px-2 py-1">
        <div className="mt-2" style={{ zoom: 0.9 }}>
          <CustomTable
            headers={[
              "Value Date",
              "Batch Number",
              "Narration",
              "Trans Count",
              "Batch Amount",
              "Actions",
            ]}
            data={suspendedDataReceipt}
            loading={{
              status: loadingCustomTable,
              message: "Processing Data...",
            }}
            rowsPerPage={8}
            style={{ columnAlignRight: [5], columnAlignCenter: [4] }}
          />
        </div>
      </div>
      {/* hello */}
    </div>
  );
}

export default ViewSuspended;
