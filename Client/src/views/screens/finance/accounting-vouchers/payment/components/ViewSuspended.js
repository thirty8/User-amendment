import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from "@mantine/core";
import axios from "axios";
import { API_SERVER } from "../../../../../../config/constant";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import DataTable from "../../../../../../components/others/Datatable/DataTable";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import CustomTable from "../../../../teller-ops/components/CustomTable";
import OverlayLoader from "../../../../../../components/others/OverlayLoader";
import InputField from "../../../../../../components/others/Fields/InputField";
import Header from "../../../../../../components/others/Header/Header";

function ViewSuspended({
  show2,
  handleClose2,
  viewSuspendedData,
  fetchData2,
  fetchData3,
  setFetchData3,
  handleShowViewSuspended,
  setBatch_number,
  batch_number,
  setBatchAmount,
  batch_amount,
  setValue_Date,
  value_Date,
  loadingCustomTable,
}) {
  //  const [show, setShow] = useState(false);
  //  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [suspendedArrowDetailsData, setSuspendedArrowDetailsData] =
    useState(false);
  const [suspendedDebitAccount, setSuspendedDebitAccount] = useState("");

  const [showArrowComponent, setShowArrowComponent] = useState(false);
  const [postingUser, setPostingUser] = useState("");

  useEffect(() => {
    setPostingUser(userInfo.id);
  }, []);

  return (
    <div>
      <Modal
        className="p-0 m-0"
        opened={show2}
        size="75%"
        padding={0}
        withCloseButton={false}
        transitionProps={"mounted"}
        onClose={handleClose2}
        closeOnClickOutside={false}
        // id="modal-div"
        // id={modalDiv}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "white",
            marginBottom: "20px",
            alignItems: "center",
            background: "#0580c0",
            borderTopRightRadius: "3px",
            borderTopLeftRadius: "3px",
          }}
          className="ps-1 items-center"
        >
          <span className="flex items-center pt-1 pb-1">
            Suspended Transactions
          </span>
          <span style={{}} className="pr-1">
            <AiOutlineCloseCircle
              size={20}
              color="white"
              //   className="pe-2"
              onClick={handleClose2}
            />
          </span>
        </div>
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

        {/* buttons  */}
        <div>
          <div className="flex items-center justify-end gap-3 p-2">
            <ButtonComponent
              label={"Fetch"}
              buttonHeight={"30px"}
              buttonWidth={"55px"}
              onClick={() => {
                // setFetchData3(true);
                handleShowViewSuspended();
              }}
            />
            <ButtonComponent
              label={"Refresh"}
              buttonHeight={"30px"}
              buttonWidth={"68px"}
              backgroundColor={"teal"}
              onClick={() => {
                // setFetchData3(true);
                setBatch_number("");
                // setApprovalFlagFilter("");
                setBatchAmount("");
                setValue_Date("");
                handleShowViewSuspended("R");
              }}
            />
            <ButtonComponent
              label={"Exit"}
              buttonHeight={"30px"}
              buttonWidth={"55px"}
              onClick={handleClose2}
            />
          </div>
          <OverlayLoader
            postLoader={fetchData2 || fetchData3}
            // color={"#0580c0"}
            textColor={true}
            displayText={"Fetching Data..."}
          />
          <hr />
        </div>
        <div style={{ padding: "0px 10px 15px 10px", zoom: 0.9 }}>
          <CustomTable
            headers={[
              "Batch Number",
              "Value Date",
              "Batch Description",
              "Trans Count",
              "Batch Amount",
              "Action",
            ]}
            data={viewSuspendedData}
            loading={{
              status: loadingCustomTable,
              message: "Processing Data...",
            }}
            rowsPerPage={6}
            style={{ columnAlignRight: [5], columnAlignCenter: [4] }}
          />
        </div>
      </Modal>
    </div>
  );
}

export default ViewSuspended;
