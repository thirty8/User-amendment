import React, { useEffect, useState } from "react";
import PageNotFound from "./page-not-found";
import Individual_account_opening from "./customer-activities/individual-account-opening";
import My_Approval from "./administration/summary-approvals";
import BranchEnquiry from "./control-setups/branch/BranchEnquiry";
import CreateNewBranch from "./control-setups/branch/CreateNewBranch";
import CashOperation from "./teller-ops/teller/cash-operation";
import TellerActivities from "./teller-ops/teller/teller-activities";
import AlertRequest from "./ebanking/Alert-services/alert-request";
import AlertDeactivate from "./ebanking/Alert-services/alert-deactivate";
import AlertAmend from "./ebanking/Alert-services/alert-amendment";
import ATMCardRequest from "./ebanking/atm-card/ATMCardRequest";
import FDDealEntry from "./trans-processes/deposits-and-loans/FDDealEntry";
import BranchOpenClose from "./trans-processes/branch-open-close/BranchOpenClose";
// import ChequeBookRequisition from "./cheques/book-request/cheque-book-requisition";
// import ChequeBookMaintenance from "./cheques/book-request/cheque-book-maintenance/index";

// book request
import ChequeBookRequisition from "./cheques/book-request/cheque-book-requisition";
import ChequeBookMaintenance from "./cheques/book-request/cheque-book-maintenance";
import ChequeBookIssuance from "./cheques/book-request/cheque-book-issuance";
import ChequeBookEnquiry from "./cheques/book-request/cheque-book-enquiry";
import ChequeBookListing from "./cheques/book-request/cheque-book-listing";
import UsedChequeNoEnquiry from "./cheques/book-request/used-cheque-no-enquiry";
import ChequeReIssuance from "./cheques/book-request/cheque-reissuance";

//Atm card
import AtmCardRequest from "./accounts/atm-card/atm-card-request";
import AtmCardReActivation from "./accounts/atm-card/atm-card-reactivation";

//Safe Custody
import SafeCustodyCreation from "./accounts/safe-custody/safe-custody-creation";
import SafeCustodyLiquidation from "./accounts/safe-custody/safe-custody-liquidation";
import SafeCustodyRegisterEnquiry from "./accounts/safe-custody/safe-custody-register-enquiry";

import RtgsSwap from "./payment/rtgs/rtgs-swap-202";
import RTGSR from "./payment/rtgs/rtgs-reservation-202";
import RTGS from "./payment/rtgs/rtgs-origination";
import LoanQuotation from "./lending/facility-enquiry/loan-quotation";
import CollateralCreation from "./lending/collateral-management/collateral-creation";
// import CreditOrigination from "./lending/loans-overdrafts/lending-origin";
import CreditOriginationNew from "./lending/loans-overdrafts/lending-origin.jsx";
import LoanCancellation from "./lending/loan-restructuring/loan-cancellation";
import LoanReschedule from "./lending/loan-restructuring/loan-reschedule-payment";
import LoanWriteOff from "./lending/loan-restructuring/loan-write-off";
import CreditAnalysis from "./lending/loans-overdrafts/credit-analysis";
import ReferredCreditOriginated from "./lending/loans-overdrafts/referred-credit-originated";
import CreditPreDisbursement from "./lending/loans-overdrafts/credit-pre-disbursement";
import CreditDisbursement from "./lending/loans-overdrafts/credit-disbursement";
import RepaymentAccountChange from "./lending/loan-restructuring/repayment-account-change";
import WriteOffRecovery from "./lending/loan-restructuring/loan-writeoff-recovery";
import LoanTrenchPayment from "./lending/loan-restructuring/loan-trench-payment";
import LoanReclassification from "./lending/loan-restructuring/loan-reclassification";
import CreditReview from "./lending/loans-overdrafts/credit-review";
import TodVerification from "./lending/loans-overdrafts/tod-verification";
import TodCreation from "./lending/loans-overdrafts/tod-creation";
import Journal from "./finance/accounting-vouchers/journal";
import Receipt from "./finance/accounting-vouchers/receipt";
import Payment from "./finance/accounting-vouchers/payment/index";
import BSCodesSetup from "./finance/general-ledger-management/bs-codes-setup";
import AccountBalanceEnquiry from "./account-activities/account-enquiry/components/account-balance-enquiry";
import AccountListEnquiry from "./account-activities/account-enquiry/components/account-list-enquiry";
import CustomerSearchByName from "./account-activities/account-enquiry/components/customer-search-by-name";
import AccountGeneralEnquiry from "./account-activities/account-enquiry/components/account-general-enquiry";
import TransactionAnalyzer from "./account-activities/account-enquiry/components/transaction-analyzer";
import Origination from "./payment/standing-order/origination/index";
import CancelAmendment from "./payment/standing-order/cancel-amendment/index";
import CorporateAccountOpening from "./customer-activities/corporate-account-opening";
// import StaticAmendment from "./customer-activities/static-amendment";
import CounterChequeRequisite from "./cheques/counter-cheques";
import SalaryUpload from "./trans-processes/uploads/general-salary-upload";
import SalaryUploadWithFees from "./trans-processes/uploads/general-salary-upload-fees";
import SharesTransfer from "./trans-processes/back-office/shares-transfer/shares-transfer";
import FacilityEnquiry from "./lending/facility-enquiry/facility-enquiry";
import VaultActivities from "./teller-ops/vault/vault-activities";
import Create_Additional_Account from "./account-activities/additional-account-creation";
import QuickAccountOpening from "./customer-activities/quick-account-opening";
import LoanClassification from "./reports/sasra-report/loan-classification";
import MultipleBatchPayment from "./trans-processes/back-office/multiple-batch";
import CreditVerification from "./lending/loans-overdrafts/credit-verification";
// import ProductAmendment from "./control-setups/product";
import AccessFormManagement from "./control-setups/menu/access-forms-management";
import AmendUserProfile from "./control-setups/users/amend-user-profile";

import AddMenu from "./administration/control-setups/menus/add-menu";
import Menus from "./administration/control-setups/menus";
import EndOfDay from "./administration/admin_activities/eod/components/end-of-day";
import LienCreation from "./accounts/lien/lien-creation";

// import EndOfDay from ""

// User Creation
import UserCreation from "./control-setups/users/user-creation";
import TransactionReversal from "./teller-ops/components/TransactionReversal";
import StatementOfFinancialReport from "./reports/statement-of-financial-position";
import DormantAccountReactivation from "../screens/account-activities/dormant-account-reactivation";
import DormantAccountApprovalbranch from "./account-activities/dormant-account-reactivation/components/dormant-account-approvalbranc";
import DormantAccountApprovalHeadbranch from "./account-activities/dormant-account-reactivation/components/dormant-account-approvalhead-branch";

import NostroStatementOutstanding from "./treasury/nostro-management/inter-bank-reconciliations/NostroStatementOutstanding";

// static amendment
import StaticAmendment from "./customer-activities/static-amendment";

//Finance
import GLCreateAccount from "./finance/general-ledger-management/gl-create-account";
import GlAmendAccount from "./finance/general-ledger-management/gl-amend-account";
import GlApproveAccount from "./finance/general-ledger-management/gl-approve-account/index.js";
import BSCodesAmendment from "./finance/general-ledger-management/bs-codes-amendment";
import ChartofAccountsEnquiry from "./finance/finance-enquiries/chart-of-accounts-enquiry";
import PnLCodesSetup from "./finance/general-ledger-management/PnL-codes-setup.js";
import PnLCodesAmendment from "./finance/general-ledger-management/PnL-codes-amendment.js";
import AddBranchSpecificAccounts from "./finance/general-ledger-management/add-branch-specific-account.js";
import AccountsPayable from "./finance/payables/account-payable";
import General from "./reports/operation-reports";
import PnLCodesApproval from "./finance/general-ledger-management/PnL-codes-approval/index.js";
import FixedAsset from "./finance/fixed-asset/fixed-asset-profiles/fixed-asset-capture/index.js";
import FixedAssetCaptureApproval from "./finance/fixed-asset/fixed-asset-approvals/fixed-asset-approval/index.js";
import FixedAssetCaptureAmendment from "./finance/fixed-asset/fixed-asset-amendments/amend-asset/index.js";
import ReverseJournal from "./finance/accounting-vouchers/reverse-journal/index.js";
import TaxAccountCreation from "./finance/tax-management/tax-account-creation.js";
import TaxAccountApproval from "./finance/tax-management/tax-account-approval/index.js";
import TaxSetup from "./finance/tax-management/tax-setup.js";

// import General from "./reports/general";
import Prepayment from "./finance/accounting-vouchers/prepayment";
import PrepaymentSchedule from "./finance/accounting-vouchers/prepayment-schedule";
import CostCenterPosting from "./finance/accounting-vouchers/cost-center/index.js";
import FinanceVoucherUpload from "./finance/accounting-vouchers/finance_voucher_upload/index.js";
import BsCodeEnquiry from "./finance/finance-enquiries/bs-code-enquiry";
import PnLCodesEnquiry from "./finance/finance-enquiries/PnL-codes-enquiry";
import BalanceSheetEnquiry from "./finance/finance-enquiries/balance-sheet-enquiry";
import AccountPayablesEnquiry from "./finance/finance-enquiries/account-payables-enquiry";
import GlWithBalances from "./finance/finance-enquiries/gl-with-balances";
import GlAccountEnquiry from "./finance/finance-enquiries/gl-account-enquiry";
import GlAccountEnquiryGlobal from "./finance/finance-enquiries/gl-account-enquiry-global";
import VouchersEnquiry from "./finance/finance-enquiries/vouchers-enquiry";
import FinanceReports from "./reports/finance-reports copy";
import BSCodesApproval from "./finance/general-ledger-management/bs-codes-approval/index.js";
import PayableSchedule from "./finance/payables/payable-schedule";
import GeneralReport from "./reports/general/index.js";
import GLBudgetSetup from "./finance/gl-budget/gl-budget-setup/index.js";
import BudgetApproval from "./finance/gl-budget/gl-budget-approval/index.js";
import BudgetAmendment from "./finance/gl-budget/gl-budget-amendment/index.js";
import ApproveAmendedBudget from "./finance/gl-budget/gl-budget-amendment-approval/index.js";
import BudgetSetupEnquiry from "./finance/gl-budget/gl-budget-setup-enquiry/index.js";
import GLGlobalBudget from "./finance/gl-budget/gl-budget-global-maintenance/index.js";
import GlobalBudgetEnquiry from "./finance/gl-budget/gl-budget-global-enquiry/index.js";
import GlobalBudgetTransEnquiry from "./finance/gl-budget/gl-budget-global-transaction-enquiry/index.js";

// Account Statement
import AccountStatementRequest from "./accounts/account-statement/account-statement-request";
import PrintAccountStatement from "./accounts/account-statement/print-account-statement";

//Close Account
import CloseAccountApproval from "./account-activities/closed-accounts/components/close-account-approval";
// import CloseAccountCashTransferEnquiry from "./account-activities/closed-accounts/components/close-account-cash-transfer-enquiry";
// import AccountCloseByDraft from "./account-activities/closed-accounts/components/close-account-by-draft";
// import CloseAccount from "./account-activities/closed-accounts";
import CloseAccount from "./accounts/close-account/close-account-form";
import CloseAccountCashTransferEnquiry from "./accounts/close-account/close-account-cash-transfer-enquiry";
import AccountCloseByDraft from "./accounts/close-account/close-account-by-draft";

//Collection
import CollectorGroupCreation from "./arrears-mgt/arrears-administration/components/collector-group-creation.jsx";
import CollectorCreation from "./arrears-mgt/arrears-administration/components/collector-creation.jsx";
import CollectorApproval from "./arrears-mgt/arrears-administration/components/collector-approval";
import CollectorRemoval from "./arrears-mgt/arrears-administration/components/collector-removal";

// Lending
import OverdraftControls from "./lending/overdraft-controls/pages/OverdraftControls.js";
import ArrearsManagement from "./arrears-mgt/arrears-management";
import ArrearsCustomerFeedback from "./arrears-mgt/arrears-management/components/arrears-customer-feedback.js";
import ArrearsMonitoryDetail from "./arrears-mgt/arrears-management/components/arrears-monitory-detail.js";
import SupervisorScreen from "./arrears-mgt/arrears-administration/components/supervisor-screen.jsx";
import CollectorEnquiry from "./arrears-mgt/arrears-enquiry/components/collector-enquiry";
import CreditApplicationEnquiry from "./lending/facility-enquiry/credit-application-enquiry/credit-application-enquiry.js";
import DeclinedCreditApplications from "./lending/facility-enquiry/declined-credit-applications/declined-credit-applications";
import CreditPreDisbursementEnquiry from "./lending/facility-enquiry/credit-pre-disbursement-enq/pages/CreditPreDisbursementEnquiry.jsx";
import CreditTransactionsEnquiry from "./lending/facility-enquiry/credit-transactions-enquiry/CreditTransactionsEnquiry.jsx";
import PrintLPAInvoice from "./lending/facility-enquiry/print-lpa-invoice/PrintLPAInvoice.js";

//RISK/COMPLIACE
import RiskIndicatorSetup from "./risk-compliance/risk-indicator/index.js";
import RiskIndicatorEnquiry from "./risk-compliance/risk-indicator/components/risk-indicator-enquiry.js";
import RiskIndicatorApproval from "./risk-compliance/risk-indicator/components/risk-indicator-approval.js";
import ChangePassword from "./administration/general-admin/change-password/change-password";
import LienCancellation from "./accounts/lien/lien-cancellation.js";

//Account Notes
import NewAccountMessage from "./account-activities/account-notes/index.js";
import ApproveAccountMsgG from "./account-activities/account-notes/components/approve-account-msg-G.js";
import ApproveAccountMsg from "./account-activities/account-notes/components/approve-account-msg.js";
import AmendAccountMessage from "./account-activities/account-notes/components/amend-account-message.js";
import ApproveAmendAccountMsgG from "./account-activities/account-notes/components/approve-amend-account-msg-G.js";
import ApproveAmendAccountMsg from "./account-activities/account-notes/components/approve-amend-account-msg.js";
import EnquiryAccountNotes from "./account-activities/account-notes/components/enquiry-account-notes.js";
import CancelAccountMsg from "./account-activities/account-notes/components/cancel-account-msg.js";
import ApproveCancelledAccountMessage from "./account-activities/account-notes/components/approve-cancelled-account-msg.js";
import NewLoanReschedulePayment from "./lending/loan-restructuring/new-loan-reschedule-payment";

// back office
import SinglePayment from "./trans-processes/back-office/single-payment";

// stopped cheque
import StoppedChequeCreation from "./cheques/stopped-cheques/stopped-cheque-creation";
import UntaggedStoppedCheque from "./cheques/stopped-cheques/untagged-stopped-cheque";

//check off
import CheckOffs from "./trans-processes/uploads/check-offs.js";

//Account Blockage
// import Account_Blockage from "./account-activities/account-blockage";

const Cases = ({ setModalSize }) => {
  const formName = localStorage.getItem("formName");

  let componentToShow;

  useEffect(() => {
    switch (formName) {
      case "My Approvals":
        setModalSize("100%");
        break;
      case "Individual Member Registration":
        setModalSize("100%");
        break;
      case "Create Additional Account":
        setModalSize("100%");
        break;
      case "Member Data Amendment":
        setModalSize("100%");
        break;
      case "User Creation":
        setModalSize("30%");
        break;
      case "Quick Member Registration":
        setModalSize("100%");
        break;
      case "Counter Cheque Requisite":
        setModalSize("100%");
        break;
      case "Branch Enquiry":
        setModalSize("100%");
        break;
      case "General Salary Upload (Without Fees)":
        setModalSize("100%");
        break;
      case "Create New Branch":
        setModalSize("100%");
        break;
      case "caop":
        setModalSize("100%");
        break;
      case "Teller Activities":
        setModalSize("100%");
        break;
      case "Alert Request":
        setModalSize("100%");
        break;
      case "Alert Deactivate":
        setModalSize("100%");
        break;
      case "Alert Amend":
        setModalSize("100%");
        break;
      case "FD Deal Entry":
        setModalSize("100%");
        break;
      case "Branch Open Close":
        setModalSize("100%");
        break;
      case "Cheque Book Requisition":
        setModalSize("100%");
        break;
      case "Cheque Book Maintenance":
        setModalSize("100%");
        break;
      case "Cheque Book Issuance":
        setModalSize("100%");
        break;
      case "Cheque Book Enquiry":
        setModalSize("100%");
        break;
      case "Cheque Listing":
        setModalSize("100%");
        break;
      case "Used Cheque No. Enquiry":
        setModalSize("100%");
        break;
      case "Cheque Re-issuance":
        setModalSize("100%");
        break;
      case "Stopped Cheque Creation":
        setModalSize("100%");
        break;
      case "Untagged Stopped Cheque":
        setModalSize("100%");
        break;
      case "Single Payment":
        setModalSize("100%");
        break;
      case "RTGS Origination":
        setModalSize("100%");
        break;
      case "RTGS Reservation(202)":
        setModalSize("100%");
        break;
      case "RTGS Swap (202)":
        setModalSize("100%");
        break;
      case "Loan Quotation":
        setModalSize("100%");
        break;
      case "Add Menu":
        setModalSize("100%");
        break;
      case "Menus":
        setModalSize("100%");
        break;
      case "Loan Overdraft Origination":
        setModalSize("100%");
        break;
      case "Loan Cancellation":
        setModalSize("100%");
        break;
      case "Loan Reschedule Payment":
        setModalSize("100%");
        break;
      case "Loan Write-Off":
        setModalSize("100%");
        break;
      case "Credit Analysis":
        setModalSize("100%");
        break;
      case "Credit Verification":
        setModalSize("100%");
        break;
      case "Referred Credit Originated":
        setModalSize("100%");
        break;
      case "Credit Pre Disbursement":
        setModalSize("100%");
        break;

      case "Credit Pre-Disbursement Enquiry":
        setModalSize("100%");
        break;
      case "Credit Transactions Enquiry":
        setModalSize("100%");
        break;
      case "Print LPA Invoice":
        setModalSize("100%");
        break;

      case "Credit Disbursement":
        setModalSize("100%");
        break;
      case "Repayment Account Change":
        setModalSize("100%");
        break;
      case "Loan Write-Off Recovery":
        setModalSize("100%");
        break;
      case "Loan Trench Payment":
        setModalSize("100%");
        break;
      case "Lien Creation":
        setModalSize("100%");
        break;
      case "Loan Reclassification":
        setModalSize("100%");
        break;
      case "Credit Review":
        setModalSize("100%");
        break;
      case "Tod Verification":
        setModalSize("100%");
        break;
      case "Tod Registration":
        setModalSize("100%");
        break;
      case "Collateral Registration":
        setModalSize("97%");
        break;
      case "Journal":
        setModalSize("100%");
        break;
      case "Receipt":
        setModalSize("100%");
        break;
      case "Payment":
        setModalSize("100%");
        break;
      case "Prepayment":
        setModalSize("100%");
        break;
      case "BS Codes Setup":
        setModalSize("100%");
        break;
      case "Account Balance Enquiry":
        setModalSize("100%");
        break;
      case "Account List Enquiry":
        setModalSize("100%");
        break;
      case "Account General Enquiry":
        setModalSize("100%");
        break;
      case "Customer Search By Name":
        setModalSize("100%");
        break;
      case "Transaction Analyser":
        setModalSize("100%");
        break;
      case "Close Account":
        setModalSize("100%");
        break;
      case "Origination":
        setModalSize("100%");
        break;
      case "Cancel/Amendment":
        setModalSize("100%");
        break;
      case "Corporate Member Registration":
        setModalSize("100%");
        break;
      case "Customer Data Amendment":
        setModalSize("100%");
      case "Customer Data Amendment":
        setModalSize("100%");
        break;
      case "Shares Transfer":
        setModalSize("100%");
        break;
      case "Facility Enquiry":
        setModalSize("100%");
        break;
      case "Vault Activities":
        setModalSize("100%");
        break;
      case "Loan Classification Report":
        setModalSize("100%");
        break;
      case "Multiple Batch":
        setModalSize("100%");
        break;
      case "General Salary Upload (With Fees)":
        setModalSize("100%");
        break;

      case "ATM Card Request":
        setModalSize("100%");
        break;

      case "Access Form Management":
        setModalSize("100%");
        break;

      case "Statement of Financial Position":
        setModalSize("100%");
        break;

      case "Nostro Statement (Outstanding)":
        setModalSize("100%");
        break;

      case "Finance Enquiry":
        setModalSize("100%");
        break;

      case "Dormant Acct Reactivation  ":
        setModalSize("1447px");
        break;
      case "Dormant Acct Approval(Branch)":
        setModalSize("100%");
        break;

      case "Dormant Acct Approval(Head Branch)":
        setModalSize("100%");
        break;
      case "GL Create Account":
        setModalSize("100%");
        break;
      case "GL Amend Account":
        setModalSize("100%");
        break;
      case "GL Approve Account":
        setModalSize("100%");
        break;
      case "GL With Balances":
        setModalSize("100%");
        break;
      case "GLAccountEnq":
        setModalSize("100%");
        break;
      case "GLAccountEnqGlobal":
        setModalSize("100%");
        break;
      case "BS Codes Amend":
        setModalSize("100%");
        break;
      case "PnL Codes Setup":
        setModalSize("100%");
        break;
      case "PnL Codes Amend":
        setModalSize("100%");
        break;
      case "Add Branch Specific Accounts":
        setModalSize("100%");
        break;
      case "BS Codes Enquiry":
        setModalSize("100%");
        break;
      case "Profit And Loss Codes Enquiry":
        setModalSize("100%");
        break;
      case "Balance Sheet Enquiry":
        setModalSize("100%");
        break;
      case "Account Payable Enquiry":
        setModalSize("100%");
        break;
      case "Account Payable":
        setModalSize("100%");
        break;
      case "Vendor Enquiries":
        setModalSize("100%");
        break;
      case "Collector Group Creation":
        setModalSize("100%");
        break;

        break;
      case "Collector Creation":
        setModalSize("100%");
        break;

      case "Collector Approval":
        setModalSize("100%");
        break;

      case "Close Account App":
        setModalSize("100%");
        break;

      case "Close Account Cash Transfer Enquiry":
        setModalSize("100%");
        break;

      case "Account Close By Draft":
        setModalSize("100%");
        break;

      case "Overdraft Cpntrols":
        setModalSize("100%");
        break;

      case "Prepayment Schedule":
        setModalSize("100%");
        break;

      case "Risk Indicator Setup":
        setModalSize("50%");
        break;

      case "Risk Indicator Approval":
        setModalSize("100%");
        break;

      case "Risk Indicator Enquiry":
        setModalSize("100%");
        break;

      // account statement
      case "Account Statement Request":
        setModalSize("100%");
        break;

      case "Print Account Statement":
        setModalSize("100%");
        break;

      case "BS Codes Approve":
        setModalSize("100%");
        break;

      case "PnL Codes Approve":
        setModalSize("100%");
        break;

      case "Arrears Management":
        setModalSize("100%");
        break;

      case "Arrears Customers Feedback ":
        setModalSize("100%");
        break;

      case "Collector Enquiry":
        setModalSize("100%");
        break;

      case "New Account Message":
        setModalSize("100%");
        break;

      case "Approve Account Msg":
        setModalSize("100%");
        break;

      case "Approve Account MsgG":
        setModalSize("100%");
        break;

      case "Amend Account Msg":
        setModalSize("100%");
        break;

      case "Approve Amend Account Msg":
        setModalSize("100%");
        break;

      case "Approve Amend Account MsgG":
        setModalSize("100%");
        break;

      case "  Enquiry Account Notes":
        setModalSize("100%");
        break;

      case "Cancel Account Msg":
        setModalSize("100%");
        break;

      case "Approve Cancelled Account Msg":
        setModalSize("100%");
        break;
      case "Fixed Asset Capture":
        setModalSize("100%");
        break;
      case "Fixed Asset Approval":
        setModalSize("100%");
        break;
      case "Amend Asset":
        setModalSize("100%");
        break;
      case "Tax Account Creation":
        setModalSize("100%");
        break;
      case "Tax Account Approval":
        setModalSize("100%");
        break;
      case "Tax Setup":
        setModalSize("100%");
        break;
      case "Credit Application Enquiry":
        setModalSize("100%");
        break;

      case "Declined Credit Applications":
        setModalSize("100%");
        break;

      case "Supervisor Screen":
        setModalSize("100%");
        break;

      case "Check Offs":
        setModalSize("100%");
        break;

      // case "Account Blockage":
      //   setModalSize("100%");
      //   break;

      default:
        //  setModalSize("1515px");
        break;
    }
  }, [formName, setModalSize]);

  switch (formName) {
    case "Individual Member Registration":
      componentToShow = <Individual_account_opening />;
      break;
    case "Create Additional Account":
      componentToShow = <Create_Additional_Account />;
      break;
    case "Member Data Amendment":
      componentToShow = <StaticAmendment />;
      break;
    case "Corporate Member Registration":
      componentToShow = <CorporateAccountOpening />;
      break;
    // case "Customer Data Amendment":
    //   componentToShow = <StaticAmendment />;
    //   break;
    case "Quick Member Registrations":
      componentToShow = <QuickAccountOpening />;
      break;
    case "My Approvals":
      componentToShow = <My_Approval />;
      break;
    case "User Creation":
      componentToShow = <UserCreation />;
      break;
    case "Branch Enquiry":
      componentToShow = <BranchEnquiry />;
      break;
    case "GL Approve Account":
      componentToShow = <GlApproveAccount />;
      break;
    case "General Salary Upload (Without Fees)":
      componentToShow = <SalaryUpload />;
      break;
    case "General Salary Upload (With Fees)":
      componentToShow = <SalaryUploadWithFees />;
      break;
    case "Create New Branch":
      componentToShow = <CreateNewBranch />;
      break;
    case "Cash Operation":
      componentToShow = <CashOperation />;
      break;
    case "Counter Cheque Requisite":
      componentToShow = <CounterChequeRequisite />;
      break;
    case "Teller Activities":
      componentToShow = <TellerActivities />;
      break;
    case "Alert Request":
      componentToShow = <AlertRequest />;
      break;
    case "Alert Deactivate":
      componentToShow = <AlertDeactivate />;
      break;
    case "Alert Amend":
      componentToShow = <AlertAmend />;
      break;
    case "FD Deal Entry":
      componentToShow = <FDDealEntry />;
      break;
    case "Lien Creation":
      componentToShow = <LienCreation />;
      break;
    case "Lien Cancellation":
      componentToShow = <LienCancellation />;
      break;
    case "Change Password":
      componentToShow = <ChangePassword />;
      break;
    case "Branch Open Close":
      componentToShow = <BranchOpenClose />;
      break;
    case "Cheque Book Requisition":
      componentToShow = <ChequeBookRequisition />;
      break;
    case "Cheque Book Maintenance":
      componentToShow = <ChequeBookMaintenance />;
      break;
    case "Cheque Book Issuance":
      componentToShow = <ChequeBookIssuance />;
      break;
    case "Cheque Book Enquiry":
      componentToShow = <ChequeBookEnquiry />;
      break;
    case "Cheque Listing":
      componentToShow = <ChequeBookListing />;
      break;
    case "Used Cheque No. Enquiry":
      componentToShow = <UsedChequeNoEnquiry />;
      break;
    case "Cheque Re-issuance":
      componentToShow = <ChequeReIssuance />;
      break;
    case "Stopped Cheque Creation":
      componentToShow = <StoppedChequeCreation />;
      break;
    case "Untagged Stopped Cheque":
      componentToShow = <UntaggedStoppedCheque />;
      break;
    case "ATM Request":
      componentToShow = <AtmCardRequest />;
      break;
    case "ATM Card Re-Activation":
      componentToShow = <AtmCardReActivation />;
      break;
    case "Safe Custody Creation":
      componentToShow = <SafeCustodyCreation />;
      break;
    case "Safe Custody Liquidation":
      componentToShow = <SafeCustodyLiquidation />;
      break;
    case "Safe Custody Register Enquiry":
      componentToShow = <SafeCustodyRegisterEnquiry />;
      break;
    case "Single Payment":
      componentToShow = <SinglePayment />;
      break;

    case "Add Menu":
      componentToShow = (
        <div style={{ paddingLeft: "25%", paddingRight: "25%", zoom: "1.3" }}>
          <AddMenu />
        </div>
      );
    case "Menus":
      break;
      componentToShow = <Menus />;
      break;
    case "RTGS Origination":
      componentToShow = <RTGS />;
      break;
    case "RTGS Reservation(202)":
      componentToShow = <RTGSR />;
      break;
    case "RTGS Swap (202)":
      componentToShow = <RtgsSwap />;
      break;
    case "Loan Quotation":
      componentToShow = <LoanQuotation />;
      break;
    case "Collateral Creation":
      componentToShow = <CollateralCreation />;
      break;
    case "Loan Overdraft Origination":
      componentToShow = <CreditOriginationNew />;
      break;
    case "Loan Cancellation":
      componentToShow = <LoanCancellation />;
      break;
    case "Loan Reschedule Payment":
      componentToShow = <NewLoanReschedulePayment />;
      break;
    case "Loan Write-Off":
      componentToShow = <LoanWriteOff />;
      break;
    case "Credit Analysis":
      componentToShow = <CreditAnalysis />;
      break;
    case "Referred Credit Originated":
      componentToShow = <ReferredCreditOriginated />;
      break;
    case "Credit Verification":
      componentToShow = <CreditVerification />;
      break;
    case "Credit Pre Disbursement":
      componentToShow = <CreditPreDisbursement />;
      break;
    case "Credit Pre-Disbursement Enquiry":
      componentToShow = <CreditPreDisbursementEnquiry />;
      break;

    case "Credit Transactions Enquiry":
      componentToShow = <CreditTransactionsEnquiry />;
      break;
    case "Print LPA Invoice":
      componentToShow = <PrintLPAInvoice />;
      break;
    case "Credit Disbursement":
      componentToShow = <CreditDisbursement />;
      break;
    case "Repayment Account Change":
      componentToShow = <RepaymentAccountChange />;
      break;
    case "Loan Write-Off Recovery":
      componentToShow = <WriteOffRecovery />;
      break;
    case "Loan Trench Payment":
      componentToShow = <LoanTrenchPayment />;
      break;
    case "Loan Reclassification":
      componentToShow = <LoanReclassification />;
      break;
    case "Credit Review":
      componentToShow = <CreditReview />;
      break;
    case "Tod Verification":
      componentToShow = <TodVerification />;
      break;
    case "Tod Creation":
      componentToShow = <TodCreation />;
      break;
    case "Journal":
      componentToShow = <Journal />;
      break;
    case "Receipt":
      componentToShow = <Receipt />;
      break;
    case "Payment":
      componentToShow = <Payment />;
      break;
    case "Prepayment":
      componentToShow = <Prepayment />;
      break;
    case "Cost Center Posting":
      componentToShow = <CostCenterPosting />;
      break;
    case "BS Codes Setup":
      componentToShow = <BSCodesSetup />;
      break;
    case "Prepayment Schedule":
      componentToShow = <PrepaymentSchedule />;
      break;
    case "Finance Voucher Upload":
      componentToShow = <FinanceVoucherUpload />;
      break;
    case "Account Balance Enquiry":
      componentToShow = <AccountBalanceEnquiry />;
      break;
    case "Account List Enquiry":
      componentToShow = <AccountListEnquiry />;
      break;
    case "Account General Enquiry":
      componentToShow = <AccountGeneralEnquiry />;
      break;
    case "Transaction Analyser":
      componentToShow = <TransactionAnalyzer />;
      break;
    case "Fixed Asset Capture":
      componentToShow = <FixedAsset />;
      break;
    case "Fixed Asset Approval":
      componentToShow = <FixedAssetCaptureApproval />;
      break;
    case "Amend Asset":
      componentToShow = <FixedAssetCaptureAmendment />;
      break;
    case "Tax Account Creation":
      componentToShow = <TaxAccountCreation />;
      break;
    case "Tax Account Approval":
      componentToShow = <TaxAccountApproval />;
      break;
    case "Tax Setup":
      componentToShow = <TaxSetup />;
    case "Customer Search By Name":
      componentToShow = <CustomerSearchByName />;
      break;
    case "Close Account":
      componentToShow = <CloseAccount />;
      break;
    case "Origination":
      componentToShow = <Origination />;
      break;
    case "Cancel/Amendment":
      componentToShow = <CancelAmendment />;
      break;
    case "Shares Transfer":
      componentToShow = <SharesTransfer />;
      break;
    case "Facility Enquiry":
      componentToShow = <FacilityEnquiry />;
      break;
    case "Vault Activities":
      componentToShow = <VaultActivities />;
      break;
    case "Amend User Profile":
      componentToShow = <AmendUserProfile />;
      break;
    case "Same Day Reversal":
      componentToShow = <TransactionReversal from={"Main"} />;
      break;
    case "Loan Classification Report":
      componentToShow = <LoanClassification />;
      break;
    case "Multiple Batch":
      componentToShow = <MultipleBatchPayment />;
      break;

    case "ATM Card Request":
      componentToShow = <ATMCardRequest />;
      break;

    case "Statement of Financial Position":
      componentToShow = <StatementOfFinancialReport />;
      break;

    case "Access Form Management":
      componentToShow = <AccessFormManagement />;
      break;

    case "Finance Enquiry":
      componentToShow = <ChartofAccountsEnquiry />;
      break;

    case "Nostro Statement (Outstanding)":
      componentToShow = <NostroStatementOutstanding />;
      break;

    case "Dormant Acct Reactivation":
      componentToShow = <DormantAccountReactivation />;
      break;
    case "Dormant Acct Approval(Branch)":
      componentToShow = <DormantAccountApprovalbranch />;
      break;
    case "End Of Day":
      componentToShow = <EndOfDay />;
      break;
    case "Dormant Acct Approval(Head Branch)":
      componentToShow = <DormantAccountApprovalHeadbranch />;
      break;

    default:
      componentToShow = <PageNotFound />;
      break;
    case "GL Amend Account":
      componentToShow = <GlAmendAccount />;
      break;
    case "GL With Balances":
      componentToShow = <GlWithBalances />;
      break;
    case "GLAccountEnq":
      componentToShow = <GlAccountEnquiry />;
      break;
    case "GLAccountEnqGlobal":
      componentToShow = <GlAccountEnquiryGlobal />;
      break;
    case "BS Codes Amend":
      componentToShow = <BSCodesAmendment />;
      break;
    case "BS Codes Approve":
      componentToShow = <BSCodesApproval />;
      break;
    case "PnL Codes Approve":
      componentToShow = <PnLCodesApproval />;
      break;
    case "PnL Codes Setup":
      componentToShow = <PnLCodesSetup />;
      break;
    case "Add Branch Specific Accounts":
      componentToShow = <AddBranchSpecificAccounts />;
      break;
    case "BS Codes Enquiry":
      componentToShow = <BsCodeEnquiry />;
      break;
    case "Profit And Loss Codes Enquiry":
      componentToShow = <PnLCodesEnquiry />;
      break;
    case "Balance Sheet Enquiry":
      componentToShow = <BalanceSheetEnquiry />;
      break;
    case "Vendor Enquiries":
      componentToShow = <VouchersEnquiry />;
      break;
    case "GL Create Account":
      componentToShow = <GLCreateAccount />;
      break;
    case "PnL Codes Setup":
      componentToShow = <PnLCodesSetup />;
      break;
    case "PnL Codes Amend":
      componentToShow = <PnLCodesAmendment />;
      break;
    case "Account Payable Enquiry":
      componentToShow = <AccountPayablesEnquiry />;
      break;

    case "Account Payable":
      componentToShow = <AccountsPayable />;
      break;
    case "Reverse Journal":
      componentToShow = <ReverseJournal />;
      break;

    case "Collector Group Creation":
      componentToShow = <CollectorGroupCreation />;
      break;
    case "Collector Creation":
      componentToShow = <CollectorCreation />;
      break;
    case "Collector Approval":
      componentToShow = <CollectorApproval />;

      break;

    case "Collector Removal":
      componentToShow = <CollectorRemoval />;
      break;

    case "Close Account App":
      componentToShow = <CloseAccountApproval />;
      break;

    case "Account Close by Draft":
      componentToShow = <AccountCloseByDraft />;
      break;

    case "Close Account Cash Transfer Enquiry":
      componentToShow = <CloseAccountCashTransferEnquiry />;
      break;

    case "Overdraft Controls":
      componentToShow = <OverdraftControls />;
      break;

    case "Account Statement Request":
      componentToShow = <AccountStatementRequest />;
      break;

    case "Print Account Statement":
      componentToShow = <PrintAccountStatement />;
      break;

    case "Arrears Monitory Detail":
      componentToShow = <ArrearsMonitoryDetail />;
      break;

    case "Risk Indicator Setup":
      componentToShow = (
        <div style={{ paddingLeft: "10%", paddingRight: "10%", zoom: "1.1" }}>
          <RiskIndicatorSetup />
        </div>
      );
      break;

    case "Risk Indicator Approval":
      componentToShow = <RiskIndicatorApproval />;
      break;

    case "Risk Indicator Enquiry":
      componentToShow = <RiskIndicatorEnquiry />;
      break;

    case "Finance Reports":
      componentToShow = <FinanceReports />;
      break;

    case "Payable Schedule":
      componentToShow = <PayableSchedule />;
      break;

    case "GL Budget Setup":
      componentToShow = <GLBudgetSetup />;
      break;
    case "GL Budget Approval":
      componentToShow = <BudgetApproval />;
      break;
    case "Amend GL Budget":
      componentToShow = <BudgetAmendment />;
      break;
    case "Amend GL Budget Approval":
      componentToShow = <ApproveAmendedBudget />;
      break;
    case "GL Budget Setup Enquiry":
      componentToShow = <BudgetSetupEnquiry />;
      break;
    case "GL Budget Global Maintenance":
      componentToShow = <GLGlobalBudget />;
      break;
    case "GL Budget Global Maint. Enq":
      componentToShow = <GlobalBudgetEnquiry />;
      break;

    case "GL Budget Global Trans Enq":
      componentToShow = <GlobalBudgetTransEnquiry />;
      break;

    case "Operation Reports":
      componentToShow = <General />;
      break;

    case "Arrears Management":
      componentToShow = <ArrearsManagement />;
      break;

    case "Arrears Customers Feedback ":
      componentToShow = <ArrearsCustomerFeedback />;
      break;

    case "Arrears Monitory Detail":
      componentToShow = <ArrearsMonitoryDetail />;
      break;

    case "Collector Enquiry":
      componentToShow = <CollectorEnquiry />;
      break;

    case "New Account Message":
      componentToShow = (
        <div style={{ paddingLeft: "20%", paddingRight: "20%" }}>
          <NewAccountMessage />
        </div>
      );
      break;

    case "Approve Account Msg":
      componentToShow = <ApproveAccountMsg />;
      break;

    case "Approve Account MsgG":
      componentToShow = <ApproveAccountMsgG />;
      break;

    case "Amend Account Message":
      componentToShow = <AmendAccountMessage />;
      break;

    case "Approve Amend Account Msg":
      componentToShow = <ApproveAmendAccountMsg />;
      break;

    case "Approve Amend Account MsgG":
      componentToShow = <ApproveAmendAccountMsgG />;
      break;

    case "Enquiry Account Notes":
      componentToShow = <EnquiryAccountNotes />;
      break;

    case "Cancel Account Message":
      componentToShow = <CancelAccountMsg />;
      break;

    case "Approve Cancelled Account Msg":
      componentToShow = <ApproveCancelledAccountMessage />;
      break;

    case "Credit Application Enquiry":
      componentToShow = <CreditApplicationEnquiry />;
      break;

    case "Declined Credit Applications":
      componentToShow = <DeclinedCreditApplications />;
      break;

    case "Supervisor Screen":
      componentToShow = <SupervisorScreen />;
      break;

    case "General":
      componentToShow = <GeneralReport />;
      break;
    case "Check Offs":
      componentToShow = <CheckOffs />;
      break;

    // case "AccountBlockage":
    //     componentToShow = <AccountBlockage />;
    //     break;
  }

  return componentToShow;
};

export default Cases;
