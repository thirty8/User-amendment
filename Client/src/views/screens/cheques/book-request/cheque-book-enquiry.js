import React from "react";
import TabsComponent from "../../../../components/others/tab-component/tab-component";
import ChequeBookEnquiryIssuance from "./components/cheque-enquiry-issuance";
import ChequeBookEnquiryNumber from "./components/cheque-enquiry-number";
import ChequeBookEnquiryRequisition from "./components/cheque-enquiry-requisition";

const ChequeBookEnquiry = () => {
  const tabsData = [
    {
      value: "default",
      label: "REQUISITION",
      component: <ChequeBookEnquiryRequisition />,
    },
    {
      value: "tab-2",
      label: "ISSUANCE",
      component: <ChequeBookEnquiryIssuance />,
    },

    {
      value: "tab-3",
      label: "CHEQUE NUMBER ENQUIRY",
      component: <ChequeBookEnquiryNumber />,
    },
  ];
  return (
    <div>
      <TabsComponent tabsData={tabsData} />
    </div>
  );
};

export default ChequeBookEnquiry;
