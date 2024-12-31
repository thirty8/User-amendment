import React, { useState } from "react";
import Header from "../../../../../../components/others/Header/Header";
import InputField from "../../../../../../components/others/Fields/InputField";
import TextAreaField from "../../../../../../components/others/Fields/TextArea";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import { AiOutlineCloseCircle } from "react-icons/ai";
import CustomTable from "../../../../teller-ops/components/CustomTable";
import OverlayLoader from "../../../../../../components/others/OverlayLoader";
import swal from "sweetalert";
import axios from "axios";
import { API_SERVER } from "../../../../../../config/constant";

function ReverseJournalDetails({
  batchNumber,
  batchAmount,
  valuedate,
  transactionDetails,
  transactions,
  currency,
  setReversalModal,
  details,
  voucherType,
}) {
  const headers = {
    // 'x-api-key': process.env.REACT_APP_API_KEY,
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const [p_debit_acs, setP_debit_acs] = useState([]);
  const [p_credit_acs, setP_credit_acs] = useState([]);
  const [postLoader, setPostLoader] = useState(false);

  async function ReverseTransactions() {
    let arr = [];
    let arr1 = [];
    details?.map((i) => {
      if (i.local_equivalent_cr !== " ") {
        let data = {
          p_debit_acct: i.acct_link,
          p_debit_amt: i.local_equivalent_cr,
          p_debit_bra: i.branch?.split(" - ")[0],
          p_debit_scan_doc_id: i.scan_doc_id,
          p_debit_trans_desc: i.transaction_details,
          p_debit_doc_ref: i.document_ref,
          p_debit_nrtn: i.transaction_details,
        };
        arr.push(data);
        p_debit_acs.push(data);
      } else {
        let newObj = {
          p_credit_acct: i.acct_link,
          p_credit_amt: i.local_equivalent_db,
          p_credit_bra: i.branch?.split(" - ")[0],
          p_credit_scan_doc_id: i.scan_doc_id,
          p_credit_trans_desc: i.transaction_details,
          p_credit_nrtn: i.transaction_details,
          p_credit_doc_ref: i.document_ref,
        };
        arr1.push(newObj);
        p_credit_acs.push(newObj);
      }
    });
    console.log(batchNumber, "batchnumber");

    axios
      .post(
        API_SERVER + "/api/post_prc_receipt_payment_journal_backvalue",
        {
          r_trans_type: "REVJ",
          currency: currency?.split(" - ")[0],
          p_user: JSON.parse(localStorage.getItem("userInfo")).id,
          valueDate: valuedate,
          branch: JSON.parse(localStorage.getItem("userInfo")).branchCode,
          p_destination: "P",
          post_channel: "BRA",
          module: "PKG_FIN_ACT_VCRS_RT",
          // terminal_id,
          // machine_ip,
          p_credit_acs: [...arr1],
          p_debit_acs: [...arr],
          batch_number: batchNumber,
        },
        { headers }
      )
      .then((response) => {
        console.log(p_credit_acs, p_debit_acs, "reeeeee");
        if (response.data.success === "Y") {
          setPostLoader(false);
          swal(response.data.message, "", {
            icon: "success",
          });
        } else {
          setPostLoader(false);
          swal("ERR - 01346", response.data.message, { icon: "error" });
        }
      });
  }
  return (
    <div>
      <OverlayLoader
        postLoader={postLoader}
        textColor={true}
        displayText={"Loading..."}
      />
      <div>
        <Header
          title={"Transaction Details"}
          backgroundColor={"#0580c0"}
          closeIcon={
            <AiOutlineCloseCircle
              size={18}
              onClick={() => setReversalModal(false)}
            />
          }
        />
      </div>
      <div className="p-2">
        <div>
          <div className="flex items-center mb-4">
            <div className="w-1/2">
              <InputField
                label={"Batch Number"}
                labelWidth={"30%"}
                inputWidth={"50%"}
                disabled={true}
                required={true}
                value={batchNumber}
              />
            </div>
            <div className="w-1/2">
              <InputField
                label={"Value Date"}
                labelWidth={"30%"}
                inputWidth={"50%"}
                disabled={true}
                required={true}
                value={valuedate}
              />
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div className="w-1/2">
              <InputField
                label={"Batch Amount"}
                labelWidth={"30%"}
                inputWidth={"50%"}
                disabled={true}
                required={true}
                value={batchAmount}
              />
            </div>
            <div className="w-1/2">
              <InputField
                label={"Currency"}
                labelWidth={"30%"}
                inputWidth={"50%"}
                disabled={true}
                required={true}
                value={currency}
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-1/2">
              <TextAreaField
                rows={2}
                label={"Transaction Details"}
                labelWidth={"30%"}
                inputWidth={"50%"}
                disabled={true}
                required={true}
                value={transactionDetails}
              />
            </div>
            <div className="w-1/2"></div>
          </div>
        </div>
        <hr className="my-2" />
        <div className="flex items-center justify-end gap-3 my-3">
          <ButtonComponent
            label={"Reverse Transaction"}
            buttonWidth={"170px"}
            onClick={ReverseTransactions}
          />
          <ButtonComponent
            label={"Exit"}
            buttonWidth={"45px"}
            onClick={() => setReversalModal(false)}
          />
        </div>
        {/* <div>
          <Header title={"Details"} headerShade={true} />
        </div> */}
        <CustomTable
          headers={[
            "Account Name",
            "Account Number",
            "Credit",
            "Debit",
            "Branch",
            "Narration",
            "Scan Document",
          ]}
          data={transactions}
        />
      </div>
    </div>
  );
}

export default ReverseJournalDetails;
