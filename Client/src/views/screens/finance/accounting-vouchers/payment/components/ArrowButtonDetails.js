import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import InputField from "../../../../../../components/others/Fields/InputField";
import TextAreaField from "../../../../../../components/others/Fields/TextArea";
import CustomTable from "../../../../teller-ops/components/CustomTable";
import Header from "../../../../../../components/others/Header/Header";
import OverlayLoader from "../../../../../../components/others/OverlayLoader";

function PostedTransactionDetails({
  postedCredit,
  postedDebit,
  setPostedCredit,
  setOpenPostedModalDetails,
  approvalFlag,
  handleEditClick,
}) {
  return (
    <div>
      <div>
        <Header
          title={"Posted Transaction Details"}
          backgroundColor={"#0580c0"}
          closeIcon={<AiOutlineCloseCircle size={18} />}
          handleClose={() => {
            setOpenPostedModalDetails(false);
            setPostedCredit([]);
          }}
        />
        <div className="p-2">
          <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
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
                    inputWidth={"60%"}
                    paddingRight={"5px"}
                    disabled={true}
                    value={postedDebit.batch_no}
                  />
                </div>
                {/* space     */}
                <div style={{ flex: 0.1 }}></div>

                <div style={{ flex: 0.45 }}>
                  <InputField
                    label={"Value Date"}
                    labelWidth={"25%"}
                    inputWidth={"70%"}
                    disabled={true}
                    value={postedDebit.value_date}
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
                    value={postedDebit.document_ref}
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
                    value={postedDebit.transaction_details}
                  />
                </div>
              </div>

              {/* Narration  */}
            </div>
            <div style={{ flex: 0.1 }}></div>
          </div>
          <hr />
          {/* <div className="flex items-center w-full">
            <div className="w-2/5 "></div>
            <div className="w-2/5 flex justify-end">
              {approvalFlag === "R" ? (
                <InputField
                  inputWidth={"40%"}
                  disabled={true}
                  value={"Rejected"}
                  textAlign={"center"}
                  color={"red"}
                />
              ) : null}
            </div>
            <div className="flex justify-end gap-3 my-2 w-1/5">
              {approvalFlag === "R" ? (
                <ButtonComponent
                  label={"Edit"}
                  buttonWidth={"45px"}
                  onClick={() => handleEditClick(postedDebit.batch_no)}
                />
              ) : null}
              <ButtonComponent
                label={"Exit"}
                buttonWidth={"45px"}
                onClick={() => setOpenPostedModalDetails(false)}
              />
            </div>
          </div> */}
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
                  onClick={() => handleEditClick(postedDebit.batch_no)}
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
              data={postedCredit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostedTransactionDetails;
