import React from "react";
import Header from "../../../../../../components/others/Header/Header";
import { AiOutlineCloseCircle } from "react-icons/ai";
import InputField from "../../../../../../components/others/Fields/InputField";
import TextAreaField from "../../../../../../components/others/Fields/TextArea";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import CustomTable from "../../../../teller-ops/components/CustomTable";

function CostCenterPostedDetails({
  setPostedDetailsModal,
  approvalStatus,
  postedTransactionsDetails,
  postedTransactionsDetails2,
  handleEditClick,
}) {
  console.log(postedTransactionsDetails2, "first");
  return (
    <div>
      <div>
        <Header
          backgroundColor={"#0580c0"}
          title={"Cost Center Postings"}
          closeIcon={
            <AiOutlineCloseCircle
              size={18}
              onClick={() => setPostedDetailsModal(false)}
            />
          }
        />
      </div>
      <div className="p-2">
        <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
          <div style={{ flex: 0.5 }}>
            <InputField
              label={"Batch Number"}
              labelWidth={"30%"}
              inputWidth={"40%"}
              disabled={true}
              //   required={true}
              value={postedTransactionsDetails2[0]?.batch_no}
            />
          </div>
          <div style={{ flex: 0.5 }}>
            <InputField
              label={"Value Date"}
              labelWidth={"30%"}
              inputWidth={"41%"}
              disabled={true}
              value={postedTransactionsDetails2[0]?.value_date}
            />
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
          <div style={{ flex: 0.5 }}>
            <InputField
              label={"Document Reference"}
              labelWidth={"30%"}
              inputWidth={"40%"}
              disabled={true}
              // required={true}
              value={postedTransactionsDetails2[0]?.document_ref}
            />
          </div>
          <div style={{ flex: 0.5 }}>
            <InputField
              label={"Narration"}
              labelWidth={"30%"}
              inputWidth={"60%"}
              disabled={true}
              value={postedTransactionsDetails2[0]?.transaction_details}
            />
          </div>
        </div>
        <hr className="mb-2" />
        <div className="flex justify-between">
          <div className="flex mx-auto">
            <p className="flex gap-2 items-center">
              <span className="text-md text-gray-500 font-semibold">
                Approval Status :
              </span>
              <span
                className={
                  approvalStatus === "Rejected"
                    ? "text-md text-red-500 animate-pulse"
                    : "text-md text-blue-500 animate-pulse"
                }
              >{`${approvalStatus}`}</span>
            </p>
          </div>
          <div className="flex gap-3 justify-end mb-3">
            {approvalStatus === "Rejected" && (
              <ButtonComponent
                label={"Edit"}
                buttonHeight={"30px"}
                buttonWidth={"55px"}
                onClick={() => handleEditClick()}
              />
            )}

            <ButtonComponent
              label={"Exit"}
              buttonHeight={"30"}
              buttonWidth={"55px"}
              onClick={() => setPostedDetailsModal(false)}
            />
          </div>
        </div>

        <CustomTable
          headers={[
            "Account Name",
            "Account Number",
            "Narration",
            "Scan Document",
            "Debit",
            "Credit",
            "Branch",
          ]}
          data={postedTransactionsDetails}
          style={{
            columnAlignRight: [5, 6],
          }}
        />
      </div>
    </div>
  );
}

export default CostCenterPostedDetails;
