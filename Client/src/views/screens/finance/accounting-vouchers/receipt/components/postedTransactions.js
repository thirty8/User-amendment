import Modal from "react-bootstrap/Modal";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import { VscClose } from "react-icons/vsc";
import { AiOutlineEye } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import InputField from "../../../../../../components/others/Fields/InputField";
import TextAreaField from "../../../../../../components/others/Fields/TextArea";
import ListOfValue from "../../../../../../components/others/Fields/ListOfValue";
import swal from "sweetalert";
import { Button, Loader } from "@mantine/core";
import { AiOutlineCloseCircle } from "react-icons/ai";
import CustomTable from "../../../../teller-ops/components/CustomTable";
import Header from "../../../../../../components/others/Header/Header";

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};
const PostedTransactionDetails = ({
  postedDebit,
  setPostedDebit,
  setOpenPostedModalDetails,
  postedCredit,
  approvalFlag,
  handleEditClick,
  fetchData2,
}) => {
  return (
    <div>
      <div>
        <Header
          title={"Posted Transaction Details"}
          backgroundColor={"#0580c0"}
          closeIcon={<AiOutlineCloseCircle size={18} />}
          handleClose={() => {
            setOpenPostedModalDetails(false);
            setPostedDebit([]);
          }}
        />
        <div className="p-2">
          <div
            style={{
              display: "flex",
              flex: 1,
              alignItems: "center",
            }}
          >
            <div style={{ flex: 0.1 }}></div>
            <div style={{ flex: 0.8 }}>
              {/* batch no and value date   */}
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <div style={{ flex: 0.45 }}>
                  <InputField
                    label={"Batch Number"}
                    labelWidth={"34%"}
                    inputWidth={"50%"}
                    paddingRight={"5px"}
                    disabled={true}
                    value={postedCredit?.batch_no}
                  />
                </div>
                {/* space     */}
                <div style={{ flex: 0.1 }}></div>

                <div style={{ flex: 0.45 }}>
                  <InputField
                    label={"Value Date"}
                    labelWidth={"25%"}
                    inputWidth={"55%"}
                    disabled={true}
                    value={postedCredit?.value_date}
                  />
                </div>
              </div>

              {/* Document Reference          */}
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <div style={{ flex: 0.45 }}>
                  <InputField
                    label={"Document Reference"}
                    labelWidth={"34%"}
                    inputWidth={"60%"}
                    paddingRight={"5px"}
                    disabled={true}
                    value={postedCredit?.document_ref}
                  />
                </div>
                {/* space     */}
                <div style={{ flex: 0.1 }}></div>
                <div style={{ flex: 0.45 }}>
                  <InputField
                    label={"Narration"}
                    labelWidth={"25%"}
                    inputWidth={"70%"}
                    paddingRight={"5px"}
                    inputheight={"25px"}
                    disabled={true}
                    // rows={2}
                    value={postedCredit?.transaction_details}
                  />
                </div>
              </div>

              {/* Narration  */}
            </div>
            <div style={{ flex: 0.1 }}></div>
          </div>
          <hr />
          <div className="flex justify-between">
            <div className="flex mx-auto">
              <p className="flex gap-2 items-center">
                <span className="text-md text-gray-500 font-semibold">
                  Approval Status :
                </span>
                <span
                  className={
                    approvalFlag === "R"
                      ? "text-md text-red-500 animate-pulse"
                      : "text-md text-blue-500 animate-pulse"
                  }
                >{`${
                  approvalFlag === "R" ? "Rejected" : "Pending Approval"
                }`}</span>
              </p>
            </div>
            <div className="flex justify-end gap-3 my-1">
              {approvalFlag === "R" && (
                <ButtonComponent
                  label={"Edit"}
                  buttonWidth={"45px"}
                  onClick={() => handleEditClick(postedCredit?.batch_no)}
                />
              )}
              <ButtonComponent
                label={"Exit"}
                buttonWidth={"45px"}
                onClick={() => setOpenPostedModalDetails(false)}
              />
            </div>
          </div>
          <div>
            <Header title={"Transaction Details"} headerShade={true} />
            <CustomTable
              headers={[
                "Account Name",
                "Account Number",
                "Narration",
                "Scan Document",
                "Credit",
                "Debit",
                "Branch",
              ]}
              data={postedDebit}
              style={{
                columnAlignRight: [5, 6],
              }}
              rowsPerPage={10}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostedTransactionDetails;
