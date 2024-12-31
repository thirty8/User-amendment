import React, { useEffect } from "react";
import InputField from "../../../../../../components/others/Fields/InputField";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import Header from "../../../../../../components/others/Header/Header";
import { AiOutlineCloseCircle } from "react-icons/ai";
import CustomTable from "../../../../teller-ops/components/CustomTable";

function PostedData({
  setPostedJournalData,
  postedJournalData1,
  postedJournalData2,
  approvalFlag,
  handleEditClick,
}) {
  return (
    <div>
      <Header
        title={"Posted Journal Transactions"}
        backgroundColor={"#0580c0"}
        closeIcon={<AiOutlineCloseCircle size={20} />}
        handleClose={() => setPostedJournalData(false)}
      />
      <div className="p-3">
        <div className="flex mb-3">
          <InputField
            label={"Batch Number"}
            labelWidth={"25%"}
            inputWidth={"50%"}
            disabled={true}
            value={postedJournalData2[0]?.batch_no}
          />
          <InputField
            label={"Value Date"}
            labelWidth={"25%"}
            inputWidth={"50%"}
            disabled={true}
            value={postedJournalData2[0]?.value_date}
          />
        </div>
        <div className="flex mb-3">
          <InputField
            label={"Document Reference"}
            labelWidth={"25%"}
            inputWidth={"50%"}
            disabled={true}
            value={postedJournalData2[0]?.document_ref}
          />
          <InputField
            label={"Narration"}
            labelWidth={"25%"}
            inputWidth={"50%"}
            disabled={true}
            value={postedJournalData2[0]?.narration}
          />
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
                  approvalFlag === "Rejected"
                    ? "text-md text-red-500 animate-pulse"
                    : "text-md text-blue-500 animate-pulse"
                }
              >{`${approvalFlag}`}</span>
            </p>
          </div>
          <div
            className="gap-3"
            style={{ display: "flex", justifyContent: "end" }}
          >
            {approvalFlag === "Rejected" && (
              <ButtonComponent
                label={"Edit"}
                buttonWidth={"45px"}
                onClick={() => {
                  handleEditClick(postedJournalData2[0]?.batch_no);
                }}
              />
            )}
            <ButtonComponent
              label={"Return"}
              buttonWidth={"75px"}
              onClick={() => setPostedJournalData(false)}
            />
          </div>
        </div>
      </div>
      {/* <hr className='mb-2' /> */}
      <div className="p-1">
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
          data={postedJournalData1}
          style={{ columnAlignRight: [5, 6] }}
        />
      </div>
    </div>
  );
}

export default PostedData;
