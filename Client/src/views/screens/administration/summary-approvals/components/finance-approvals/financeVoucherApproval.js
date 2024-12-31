import React, { useState, useEffect } from "react";
import InputField from "../../../../../../components/others/Fields/InputField";
import SelectField from "../../../../../../components/others/Fields/SelectField";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import { FcDocument } from "react-icons/fc";
import Header from "../../../../../../components/others/Header/Header";
import CustomTable from "../../../../teller-ops/components/CustomTable";
// import CustomTable from "../../../../../../components/others/customtable";
import ActionButtons from "../../../../../../components/others/action-buttons/ActionButtons";
import axios from "axios";
import { API_SERVER } from "../../../../../../config/constant";
import swal from "sweetalert";
import DocumentViewing from "../../../../../../components/DocumentViewing";
import { Modal } from "@mantine/core";
import TextAreaField from "../../../../../../components/others/Fields/TextArea";
import { AiOutlineCloseCircle } from "react-icons/ai";
import OverlayLoader from "../../../../../../components/others/OverlayLoader";

function FinanceVouchersApprovals({ batchNo, amount, setShowModal }) {
  const headers = {
    // 'x-api-key': process.env.REACT_APP_API_KEY,
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const [transactionDetails, setTransactionDetails] = useState([]);
  const [transactionDetailsData, setTransactionDetailsData] = useState([]);
  const [overDrawnAccountsArray, setOverDrawnAccountsArray] = useState([]);
  const [narration, setNarration] = useState(" ");
  const [postingChannel, setPostingChannel] = useState(" ");
  const [postingCurrency, setPostingCurrency] = useState(" ");
  const [module, setModule] = useState(" ");
  const [approvalDate, setApprovalDate] = useState(" ");
  const [transactionType, setTransactionType] = useState(" ");
  const [totalAmount, setTotalAmount] = useState(" ");
  const [rejectComment, setRejectComment] = useState("");
  const [rejectModal, setRejectModal] = useState(false);
  const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
  const [showOverdrawnModal, setShowOverdrawnModal] = useState(false);
  const [postLoader, setPostLoader] = useState(false);
  const [fetchData, setFetchData] = useState(false);

  useEffect(() => {
    // JSON.parse(localStorage.getItem("userInfo")).postingDate,
    try {
      setTotalAmount(amount);
      async function getVoucherDetails() {
        await axios
          .post(
            API_SERVER + "/api/getFinanaceVouchersApprovalDetails",
            {
              batchNumber: batchNo,
            },
            { headers }
          )
          .then((response) => {
            if (response.data.length > 0) {
              setNarration(response.data[0]?.narration);
              setPostingChannel(response.data[0]?.channel);
              setPostingCurrency(response.data[0]?.currency_code);
              setModule(response.data[0]?.form_code);
              setApprovalDate(response.data[0]?.posting_date);
              setTransactionType(response.data[0]?.voucher_number);
              let arr = [];
              setTransactionDetails(response.data);
              response.data?.map((i) => {
                arr.push([
                  i.account_name,
                  i.account_number,
                  i.scan_doc_id,
                  i.transaction_details,
                  formatNumber(i.local_equivalent_db),
                  formatNumber(i.local_equivalent_cr),
                  i.branch,
                ]);
              });
              setTransactionDetailsData(arr);
            } else {
              swal({
                icon: "error",
                title: "Error",
                text: "No data found.",
                closeOnClickOutside: false,
              }).then((res) => {
                if (res) {
                  setShowModal(false);
                }
              });
            }
          });
      }
      getVoucherDetails();
    } catch (error) {
      swal({ icon: "error", title: "Error", text: error });
    }
  }, []);

  function formatNumber(num) {
    const number = parseFloat(num);

    if (isNaN(number)) {
      return ""; // Return an empty string for invalid input
    }

    const formatted = number.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });

    return formatted;
  }

  function handleClick1() {
    if (transactionDetails[0]?.scan_doc_id === "") {
      swal({
        title: "ERR - 01346",
        text: "A Valid Document ID is required",
        icon: "warning",
        buttons: "OK",
      }).then((result) => {
        if (result) {
        }
      });
    } else {
      setSweetAlertConfirmed(true);
    }
  }

  function AuthoriseFinanceVoucher() {
    try {
      swal({
        icon: "info",
        title: "Are you sure you want to approve this transaction ?",
        text: "",
        buttons: true,
        animation: true,
      }).then((result) => {
        if (result) {
          setPostLoader(true);
          axios
            .post(
              API_SERVER + "/api/post_prc_receipt_payment_journal_approval",
              {
                batch_number: batchNo,
                approvedBy: JSON.parse(localStorage.getItem("userInfo")).id,
                approvalDate: getPostingDate(
                  JSON.parse(localStorage.getItem("userInfo")).postingDate
                ),
                // approvalDate: "13-JUL-2023",
                transactionType: transactionType,
                postingCurrency: postingCurrency,
                approvalType: "Y",
                postingBranch: JSON.parse(localStorage.getItem("userInfo"))
                  .branchCode,
                amount: totalAmount,
                module: module,
                postingChannel: postingChannel,
              },
              {
                headers,
              }
            )
            .then((response) => {
              if (response.data.success == "Y") {
                setPostLoader(false);
                swal({
                  icon: "success",
                  title: response.data.message,
                }).then((result) => {
                  if (result) {
                    setShowModal(false);
                  }
                });
              } else {
                setPostLoader(false);
                swal({
                  icon: "error",
                  title: response.data.message,
                });
              }
            });
        }
      });
    } catch (error) {
      setPostLoader(false);
      swal({ icon: "error", title: "Error", text: error });
    }
  }

  function RejectFinanceVoucher() {
    swal({
      icon: "warning",
      title: "Are you sure you want to reject this transaction ?",
      text: "",
      buttons: true,
      animation: true,
    }).then((result) => {
      if (result) {
        setRejectModal(true);
      }
    });
  }

  function getPostingDate(postingDate) {
    let valueDate = new Date(postingDate);
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    valueDate = `${valueDate.getDate()}-${
      months[valueDate.getMonth()]
    }-${valueDate.getFullYear()}`;

    return valueDate;
  }

  function CheckOverdrawnAccounts() {
    try {
      setFetchData(true);
      axios
        .post(
          API_SERVER + "/api/get-overdrawn-accounts",
          { batchNumber: batchNo },
          { headers }
        )
        .then((response) => {
          if (response.data.length > 0) {
            let arr = [];
            response.data.map((i) => {
              arr.push([
                i.acct_link,
                formatNumber(i.bal),
                formatNumber(i.amt),
                formatNumber(i.bal_after),
              ]);
            });
            setOverDrawnAccountsArray(arr);
            setFetchData(false);
            setShowOverdrawnModal(true);
          } else {
            setFetchData(false);
            swal("No Account Overdrawn", "", "info");
          }
        });
    } catch (error) {
      setFetchData(false);
      swal({ icon: "error", title: "Error", text: error });
    }
  }

  function Reject() {
    try {
      setPostLoader(true);
      axios
        .post(
          API_SERVER + "/api/post_prc_receipt_payment_journal_approval",
          {
            batch_number: batchNo,
            approvedBy: JSON.parse(localStorage.getItem("userInfo")).id,
            approvalDate: getPostingDate(
              JSON.parse(localStorage.getItem("userInfo")).postingDate
            ),
            transactionType: transactionType,
            postingCurrency: postingCurrency,
            approvalType: "R",
            rejectedComment: rejectComment,
            postingBranch: JSON.parse(localStorage.getItem("userInfo"))
              .branchCode,
            amount: totalAmount,
            module: module,
            postingChannel: postingChannel,
          },
          {
            headers,
          }
        )
        .then((response) => {
          if (response.data.success == "Y") {
            setPostLoader(false);
            swal({
              icon: "success",
              title: response.data.message,
            }).then((result) => {
              if (result) {
                setPostLoader(false);
                setRejectModal(false);
                setShowModal(false);
              }
            });
          } else {
            setPostLoader(false);
            swal({
              icon: "error",
              title: response.data.message,
            });
          }
        });
    } catch (error) {
      setPostLoader(false);
      swal({ icon: "error", title: "Error", text: error });
    }
  }

  return (
    <div className="p-2" style={{ zoom: 0.9 }}>
      <ActionButtons
        onAuthoriseClick={AuthoriseFinanceVoucher}
        displayView={"none"}
        displayRefresh={"none"}
        displayOk={"none"}
        displayNew={"none"}
        displayHelp={"none"}
        displayFetch={"none"}
        displayDelete={"none"}
        displayCancel={"none"}
        onExitClick={() => setShowModal(false)}
        onRejectClick={RejectFinanceVoucher}
      />
      <OverlayLoader
        postLoader={postLoader || fetchData}
        // color={"#0580c0"}
        textColor={true}
        displayText={postLoader ? "Loading..." : "Fetching Data..."}
      />
      <hr className="my-3" />
      {rejectModal && (
        <Modal
          className="p-0 m-0"
          opened={rejectModal}
          size="75%"
          padding={0}
          withCloseButton={false}
          transitionProps={"mounted"}
          onClose={() => {
            setRejectModal(false);
          }}
        >
          <Header
            title={"Reject Reason"}
            headerShade={true}
            closeIcon={<AiOutlineCloseCircle size={18} />}
            handleClose={() => {
              setRejectModal(false);
            }}
          />
          <div className="p-2">
            <div className="mb-4">
              <TextAreaField
                // label={"Reject Reason"}
                id={"comment"}
                margin={0}
                inputWidth={"96%"}
                rows={5}
                onChange={(e) => {
                  setRejectComment(e.target.value);
                }}
                value={rejectComment}
              />
            </div>
            <div className="flex justify-end gap-2 mr-4">
              <ButtonComponent
                label={"OK"}
                buttonWidth={"40px"}
                onClick={() => {
                  setRejectModal(false);
                  Reject();
                }}
              />
              <ButtonComponent
                label={"cancel"}
                buttonWidth={"60px"}
                onClick={() => {
                  setRejectModal(false);
                }}
              />
            </div>
          </div>
        </Modal>
      )}

      {showOverdrawnModal && (
        <Modal
          className="p-0 m-0"
          opened={showOverdrawnModal}
          size="55%"
          padding={0}
          withCloseButton={false}
          transitionProps={"mounted"}
          onClose={() => {
            setShowOverdrawnModal(false);
          }}
        >
          <div>
            <Header
              title={"Account Balances Details"}
              // backgroundColor={"#0580c0"}
              headerShade={true}
              closeIcon={<AiOutlineCloseCircle size={18} />}
              handleClose={() => {
                setShowOverdrawnModal(false);
              }}
            />
          </div>
          <div className="p-2">
            <div className="flex justify-end mb-2">
              <ButtonComponent
                label={"Exit"}
                buttonWidth={"50px"}
                onClick={() => {
                  setShowOverdrawnModal(false);
                }}
              />
            </div>
            <CustomTable
              headers={[
                "Account Number",
                "Current Balance",
                "Transaction Amount",
                "Balance After Transaction",
              ]}
              style={{ columnAlignRight: [3], columnAlignCenter: [2, 4] }}
              data={overDrawnAccountsArray}
              rowsPerPage={10}
            />
          </div>
        </Modal>
      )}
      <div className="flex items-center mb-3">
        <div style={{ flex: 0.5 }}>
          <InputField
            label={"Batch Number"}
            labelWidth={"30%"}
            inputWidth={"50%"}
            disabled={true}
            value={batchNo}
          />
        </div>
        <div style={{ flex: 0.5 }}>
          <InputField
            label={"Currency"}
            labelWidth={"30%"}
            inputWidth={"46%"}
            disabled={true}
            value={transactionDetails[0]?.currency}
          />
        </div>
      </div>
      <div className="flex items-center mb-3">
        <div style={{ flex: 0.5 }}>
          <InputField
            label={"Value Date"}
            labelWidth={"30%"}
            inputWidth={"50%"}
            disabled={true}
            value={transactionDetails[0]?.value_date}
          />
        </div>
        <div style={{ flex: 0.5 }}>
          <div style={{ display: "flex", flex: 1 }}>
            <div style={{ flex: 0.8 }}>
              <InputField
                label={"Scan Document ID"}
                labelWidth={"37.5%"}
                inputWidth={"58%"}
                disabled={true}
                value={transactionDetails[0]?.scan_doc_id}
              />
            </div>
            <div className="ml-1" style={{ flex: 0.2 }}>
              <ButtonComponent
                buttonIcon={<FcDocument size={20} />}
                buttonHeight={"28px"}
                buttonWidth={"30px"}
                onClick={handleClick1}
              />
            </div>
          </div>

          {sweetAlertConfirmed && (
            <Modal
              className="p-0 m-0"
              opened={sweetAlertConfirmed}
              size="75%"
              style={{ margin: 0, padding: 0 }}
              withCloseButton={false}
              closeOnClickOutside={false}
              transitionProps={"mounted"}
              onClose={() => setSweetAlertConfirmed(false)}
            >
              <div className="flex items-center justify-between mx-2 p-2">
                <div className="font-extrabold text-black">View Document</div>
                <div
                  className="border rounded-full px-2 bg-red-400 text-white cursor-pointer"
                  onClick={() => setSweetAlertConfirmed(false)}
                >
                  x
                </div>
              </div>
              <DocumentViewing
                documentID={transactionDetails[0]?.scan_doc_id}
              />
            </Modal>
          )}
        </div>
      </div>
      <div className="flex items-center mb-3">
        <div style={{ flex: 0.5 }}>
          <InputField
            label={"Narration"}
            disabled={true}
            labelWidth={"30%"}
            inputWidth={"68%"}
            value={narration}
          />
        </div>
      </div>
      <hr className="my-2" />
      <div className="mb-4 flex items-center justify-end">
        <ButtonComponent
          label={"Check Overdrawn Accounts"}
          onClick={CheckOverdrawnAccounts}
        />
      </div>
      <div className="mb-1">
        <Header headerShade={true} title={"TRANSACTION DETAILS"} />
      </div>
      <CustomTable
        headers={[
          "Account Name",
          "Account Number",
          "Scan Document",
          "Narration",
          "Debit",
          "Credit",
          "Branch",
        ]}
        data={transactionDetailsData}
        rowsPerPage={12}
        style={{ columnAlignRight: [5, 6] }}
      />
    </div>
  );
}

export default FinanceVouchersApprovals;
