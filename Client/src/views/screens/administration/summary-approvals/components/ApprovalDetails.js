import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../../../components/others/Header/Header";
import { AiOutlineClose, AiOutlineExpand, AiOutlineCompress } from "react-icons/ai";
import CashierLimitApproval from "./teller-approvals/CashierLimitApproval";
import CreditDisbursementApproval from "./credit-approvals/credit-disbursement";
import MembershipApproval from "./account-approvals/membership-approval";
import PendingDevelopment from "./PendingDevelopment";
import DetailsModal from "../../../teller-ops/teller/components/ReversalDetails";
import FinanceVouchersApprovals from "./finance-approvals/financeVoucherApproval";
import BatchPostingApprovals from "./batch-approvals";
import CounterChequeApproval from "./cheques-approvals/counter-cheque-approval";
import AccountsPayableApproval from "./finance-approvals/payablesApproval";
import LoanPaymentApproval from "../../../lending/loan-restructuring/payment-approval";
import CreditOriginationVerification from "./credit-approvals/credit-verification";
import PrepaymentApproval from "./finance-approvals/prepayment-approval";
import DormantAccountApprovalbranch from "../../../account-activities/dormant-account-reactivation/components/dormant-account-approvalbranc.js";
// import AccountStatementRequestApproval from "./account-statement-approvals/account-statement-approval";

import AccountStatementRequestApproval from "./operation-approvals/account-statement-approval";
import CloseAccountFormApproval from "./operation-approvals/close-account-form-approval";
import ChequeBookRequisitionApproval from "./operation-approvals/cheque-book-requistion-approval";
import ChequeBookMaintenanceApproval from "./operation-approvals/cheque-book-maintenance-approval";
import ChequeBookIssuanceApproval from "./operation-approvals/cheque-book-issuance-approval";
// import ChequeBookMaintenanceApproval from "./operation-approvals/cheque-book-maintenance-approval";

// lien
import LienCreationApproval from "./operation-approvals/lien-creation-approval";
import LienCancellationApproval from "./operation-approvals/lien-cancellation-approval";

// back office
import BatchPostingApproval from "./operation-approvals/batch-posting-app";

import LienCreation from "../../../accounts/lien/lien-creation";
import PrepaymentScheduleApproval from "./finance-approvals/prepayment-schedule-approval";
import PayableScheduleApproval from "./finance-approvals/payable-schedule-approval";
import CollectorApproval from "./../../../arrears-mgt/arrears-administration/components/collector-approval.jsx";
import IndividualCorporate from "./account-approvals/IndividualCorporate";
import NewPaymentApproval from "./../../../lending/loan-restructuring/new-payment-approval";

function ApprovalDetails({
  setShowModal,
  setMaximized,
  maximized,
  batchNo,
  amount,
  accNumber,
  accountSourceBranch,
  approvalTitle,
  setApproveChanged,
  setApproved,
  setModalSize,
  handleClose,
  postingDate,
  username,
  postedBy,
}) {
  return (
    <div
      className="text-gray-700"
      style={{
        marginBottom: "-15px",
        marginLeft: "-17px",
        marginRight: "-16px",
        marginTop: "-20px",
        overflowY: "none",
      }}
    >
      <div className="p-3">
        <div
          style={{
            backgroundColor: "#3b82f6",
          }}
          className="w-full shadow"
        >
          <div className=" flex justify-between py-[4px] px-2 items-center ">
            <div style={{ fontSize: "14px" }} className="text-white font-semibold">
              {approvalTitle}{" "}
            </div>
            <div className="flex">
              {" "}
              {maximized ? (
                <AiOutlineCompress
                  className="hover:cursor-pointer mt-1 mr-2"
                  color="white"
                  onClick={() => setMaximized(false)}
                />
              ) : (
                <AiOutlineExpand
                  className="hover:cursor-pointer mt-1 mr-2"
                  color="white"
                  onClick={() => setMaximized(true)}
                />
              )}
              <span style={{ color: "white", marginTop: "-2px" }} className="mr-2">
                |
              </span>
              <svg
                onClick={() => setShowModal(false)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                // style={{ padding: "10px" }}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer fill-cyan-500 stroke-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <div className="bg-gray-200 rounded-b ">
        <div className="bg-white shadow rounded px-0 pt-1 pb-8 " style={{ marginBottom: "-25px" }}>
          {(() => {
            // Approve Teller Transactions
            if (localStorage.getItem("itemCode") === "CWL") {
              setModalSize("55%");
              return (
                <CashierLimitApproval
                  batchNo={batchNo}
                  accountSourceBranch={accountSourceBranch}
                  setCloseModal={setShowModal}
                  setApproveChanged={setApproveChanged}
                  setApproved={setApproved}
                />
              );
            } else if (localStorage.getItem("itemCode") === "CDS") {
              setModalSize("75%");
              return (
                <CreditDisbursementApproval
                  batchNo={batchNo}
                  accountSourceBranch={accountSourceBranch}
                  setCloseModal={setShowModal}
                  setApproveChanged={setApproveChanged}
                  setApproved={setApproved}
                />
              );
            } else if (localStorage.getItem("itemCode") === "DRH") {
              setModalSize("85%");
              return (
                <DormantAccountApprovalbranch
                  batchNo={batchNo}
                  accountSourceBranch={accountSourceBranch}
                  setCloseModal={setShowModal}
                  setApproveChanged={setApproveChanged}
                  setApproved={setApproved}
                />
              );
            } else if (localStorage.getItem("itemCode") === "DRB") {
              setModalSize("85%");
              return (
                <DormantAccountApprovalbranch
                  batchNo={batchNo}
                  accountSourceBranch={accountSourceBranch}
                  setCloseModal={setShowModal}
                  setApproveChanged={setApproveChanged}
                  setApproved={setApproved}
                />
              );
            } else if (localStorage.getItem("itemCode") === "CRV") {
              setModalSize("75%");
              return (
                <CreditOriginationVerification
                  batchNo={batchNo}
                  accountSourceBranch={accountSourceBranch}
                  setCloseModal={setShowModal}
                  setApproveChanged={setApproveChanged}
                  setApproved={setApproved}
                />
              );
            } else if (localStorage.getItem("itemCode") === "ACO") {
              setModalSize("100%");
              return (
                <IndividualCorporate
                  batchNo={batchNo}
                  accountSourceBranch={accountSourceBranch}
                  setCloseModal={setShowModal}
                  setApproveChanged={setApproveChanged}
                  setApproved={setApproved}
                  handleClose={handleClose}
                />
              );
            } else if (localStorage.getItem("itemCode") === "SDR") {
              setModalSize("60%");
              return (
                <DetailsModal
                  batchNo={batchNo}
                  type={"A"}
                  accountSourceBranch={accountSourceBranch}
                  setShowModal={setShowModal}
                  setApproveChanged={setApproveChanged}
                  setApproved={setApproved}
                />
              );
            } else if (localStorage.getItem("itemCode") === "VCH") {
              setModalSize("80%");
              return (
                <FinanceVouchersApprovals
                  batchNo={batchNo}
                  amount={amount}
                  setShowModal={setShowModal}
                  // type={"A"}
                  // accountSourceBranch={accountSourceBranch}
                  // setShowModal={setShowModal}
                  // setApproveChanged={setApproveChanged}
                  // setApproved={setApproved}
                />
              );
            } else if (localStorage.getItem("itemCode") === "BPA") {
              setModalSize("80%");
              return (
                <BatchPostingApprovals
                  batchNo={batchNo}
                  amount={amount}
                  setShowModal={setShowModal}
                />
              );
            } else if (localStorage.getItem("itemCode") === "CCQ") {
              setModalSize("90%");
              return (
                <CounterChequeApproval
                  batchNo={batchNo}
                  setShowModal={setShowModal}
                  // type={"A"}
                  // accountSourceBranch={accountSourceBranch}
                  // setShowModal={setShowModal}
                  // setApproveChanged={setApproveChanged}
                  // setApproved={setApproved}
                />
              );
            } else if (localStorage.getItem("itemCode") === "PBL") {
              setModalSize("93%");
              return (
                <AccountsPayableApproval
                  batchNo={batchNo}
                  // amount={amount}
                  setShowModal={setShowModal}
                  accNumber={accNumber}
                  // type={"A"}
                  // accountSourceBranch={accountSourceBranch}
                  // setShowModal={setShowModal}
                  // setApproveChanged={setApproveChanged}
                  // setApproved={setApproved}
                />
              );
            } else if (localStorage.getItem("itemCode") === "LPA") {
              setModalSize("85%");
              return (
                <div style={{ zoom: "0.85" }}>
                  {/* <LoanPaymentApproval
                    facilityNo={batchNo}
                    setShowModal={setShowModal}
                  />{" "} */}

                  <NewPaymentApproval facilityNo={batchNo} setShowModal={setShowModal} />
                </div>
              );
            } else if (localStorage.getItem("itemCode") === "PPY") {
              setModalSize("93%");
              return (
                <PrepaymentApproval
                  batchNo={batchNo}
                  // amount={amount}
                  setShowModal={setShowModal}
                  accNumber={accNumber}
                  // type={"A"}
                  // accountSourceBranch={accountSourceBranch}
                  // setShowModal={setShowModal}
                  // setApproveChanged={setApproveChanged}
                  // setApproved={setApproved}
                />
              );
            } else if (localStorage.getItem("itemCode") === "ACS") {
              setModalSize("80%");
              return (
                <AccountStatementRequestApproval batch_number={batchNo} accountNumber={accNumber} />
              );
            } else if (localStorage.getItem("itemCode") === "CLA") {
              setModalSize("80%");
              return <CloseAccountFormApproval batch_number={batchNo} accountNumber={accNumber} />;
            } else if (localStorage.getItem("itemCode") === "CBR") {
              setModalSize("80%");
              return (
                <ChequeBookRequisitionApproval batchNo={batchNo} setShowModal={setShowModal} />
              );
            } else if (localStorage.getItem("itemCode") === "CBM") {
              setModalSize("80%");
              return (
                <ChequeBookMaintenanceApproval
                  batchNo={batchNo}
                  setShowModal={setShowModal}
                  accountNumber={accNumber}
                />
              );
            } else if (localStorage.getItem("itemCode") === "CBI") {
              setModalSize("80%");
              return (
                <ChequeBookIssuanceApproval
                  batchNo={batchNo}
                  setShowModal={setShowModal}
                  accountNumber={accNumber}
                />
              );
            } else if (localStorage.getItem("itemCode") === "BPA") {
              setModalSize("80%");
              return (
                <BatchPostingApproval
                  batchNo={batchNo}
                  setShowModal={setShowModal}
                  accountNumber={accNumber}
                  postingDate={postingDate}
                  postedBy={postedBy}
                />
              );
            }
            // else if (localStorage.getItem("itemCode") === "LIE") {
            //   setModalSize("60%");
            //   return <LienCreation req_no={batchNo} setCloseModal={setShowModal} />;
            // } else if (localStorage.getItem("itemCode") === "LIC") {
            //   setModalSize("60%");
            //   return (
            //     <LienCreation
            //       req_no={batchNo}
            //       setCloseModal={setShowModal}
            //       from={"cancellation-approval"}
            //     />
            //   );
            // }
            else if (localStorage.getItem("itemCode") === "LIE") {
              setModalSize("80%");
              return (
                <LienCreationApproval
                  batchNo={batchNo}
                  setShowModal={setShowModal}
                  accountNumber={accNumber}
                  postingDate={postingDate}
                  postedBy={postedBy}
                />
              );
            } else if (localStorage.getItem("itemCode") === "LIC") {
              setModalSize("80%");
              return (
                <LienCancellationApproval
                  batchNo={batchNo}
                  setShowModal={setShowModal}
                  accountNumber={accNumber}
                  postingDate={postingDate}
                  postedBy={postedBy}
                />
              );
            } else if (localStorage.getItem("itemCode") === "PSP") {
              setModalSize("70%");
              return (
                <PrepaymentScheduleApproval
                  batchNo={batchNo}
                  // amount={amount}
                  setShowModal={setShowModal}
                  // accNumber={accNumber}
                  // type={"A"}
                  // accountSourceBranch={accountSourceBranch}
                  // setShowModal={setShowModal}
                  // setApproveChanged={setApproveChanged}
                  // setApproved={setApproved}
                />
              );
            } else if (localStorage.getItem("itemCode") === "PDP") {
              setModalSize("70%");
              return (
                <PayableScheduleApproval
                  batchNo={batchNo}
                  // amount={amount}
                  setShowModal={setShowModal}
                  // accNumber={accNumber}
                  // type={"A"}
                  // accountSourceBranch={accountSourceBranch}
                  // setShowModal={setShowModal}
                  // setApproveChanged={setApproveChanged}
                  // setApproved={setApproved}
                />
              );
            } else if (localStorage.getItem("itemCode") === "CCA") {
              setModalSize("60%");
              return <CollectorApproval batchNo={batchNo} setShowModal={setShowModal} />;
            } else {
              setModalSize("55%");
              return <PendingDevelopment approvalTitle={approvalTitle} />;
            }
          })()}{" "}
        </div>{" "}
      </div>{" "}
      <br />
    </div>
  );
}

export default ApprovalDetails;
