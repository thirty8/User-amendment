import React, { useEffect, useState } from "react";
import Header from "../../../../components/others/Header/Header";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import ListOfAccountsOCA from "./components/list-of-accounts";
import { Modal } from "@mantine/core";
import ClosedAccounts from "./components/closed-accounts";
import BalanceSheetBreakdown from "./components/list-of-accounts";
import BalanceSheetWorkings from "./components/balancesheetworkings";
import TrialBalance from "./components/trialbalance";
import { API_SERVER } from "../../../../config/constant";
import axios from "axios";

function OperationReports() {
  const [showModal, setShowModal] = useState(false);
  const [component, setComponent] = useState();
  const [currencylov, setCurrencylov] = useState([]);

  const headers = {
    // 'x-api-key': process.env.REACT_APP_API_KEY,
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const formatDate = (inputDate) => {
    const dateParts = inputDate.split("-");
    const day = dateParts[2];
    const month = getMonthName(dateParts[1]);
    const year = dateParts[0];

    return `${day}-${month}-${year}`;
  };

  const getMonthName = (monthNumber) => {
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
    return months[parseInt(monthNumber, 10) - 1];
  };

  useEffect(() => {
    async function getCurrency() {
      let response = await axios.post(
        API_SERVER + "/api/get-code-details",
        { code: "CUR" },
        { headers }
      );
      setCurrencylov(response.data);
    }
    getCurrency();
  }, []);

  function OpenModal(b) {
    let aa = document.getElementById(b)?.id;

    setShowModal(true);

    switch (aa) {
      case "ListOfAccountsOCA":
        return setComponent(
          <ListOfAccountsOCA
            clearModal={clearModal}
            currencylov={currencylov}
            formatDate={formatDate}
            reportName={"List Of Accounts Opened, Closed & Amended"}
          />
        );
      case "ClosedAccounts":
        return setComponent(
          <ClosedAccounts
            clearModal={clearModal}
            currencylov={currencylov}
            reportName={"Closed Accounts"}
          />
        );
      case "BalanceSheetBreakdown":
        return setComponent(
          <BalanceSheetBreakdown
            clearModal={clearModal}
            currencylov={currencylov}
            reportName={"Balance Sheet (YoY) - Breakdown"}
          />
        );
      case "BalanceSheetWorkings":
        return setComponent(
          <BalanceSheetWorkings
            clearModal={clearModal}
            currencylov={currencylov}
            formatDate={formatDate}
            reportName={"Balance Sheet (YoY) - Workings"}
          />
        );
      case "TrialBalance":
        return setComponent(
          <TrialBalance clearModal={clearModal} currencylov={currencylov} />
        );

      default:
        return alert("No report found");
    }
  }

  const openButton = (a) => {
    return (
      <ButtonComponent
        label={"Open"}
        buttonWidth={"50px"}
        onClick={() => OpenModal(a)}
      />
    );
  };

  function clearModal() {
    setShowModal(false);
    setComponent();
  }

  return (
    <div>
      <div>
        <Header title={"Operation Reports"} headerShade={true} />
      </div>
      <div className="p-1 mx-auto grid grid-cols-3 gap-3">
        <div
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
            borderRadius: "3px",
            backgroundColor: "#ffffff",
          }}
        >
          {/* List Of Accounts Opened, Closed & Amended  */}
          <div className="w-full mt-1 px-2">
            <div className="flex mb-3 space-x-[30px] mt-2">
              <span
                className="text-md  text-wrap flex items-center w-[80%] font-semibold"
                id="ListOfAccountsOCA"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 me-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h4.59l-2.1 1.95a.75.75 0 0 0 1.02 1.1l3.5-3.25a.75.75 0 0 0 0-1.1l-3.5-3.25a.75.75 0 1 0-1.02 1.1l2.1 1.95H6.75Z"
                    clipRule="evenodd"
                  />
                </svg>
                List Of Accounts Opened, Closed & Amended{" "}
              </span>
              <span>{openButton("ListOfAccountsOCA")}</span>
            </div>

            {/* Closed Accounts */}
            <div className="flex mb-3  space-x-[30px]">
              <span
                className="text-md text-wrap flex items-center w-[80%] font-semibold"
                id="ClosedAccounts"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 me-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h4.59l-2.1 1.95a.75.75 0 0 0 1.02 1.1l3.5-3.25a.75.75 0 0 0 0-1.1l-3.5-3.25a.75.75 0 1 0-1.02 1.1l2.1 1.95H6.75Z"
                    clipRule="evenodd"
                  />
                </svg>
                Closed Accounts
              </span>
              <span>{openButton("ClosedAccounts")}</span>
            </div>
            {/* Third */}
            <div className="flex mb-3  space-x-[30px]">
              <span
                className="text-md text-wrap flex items-center w-[80%]"
                id="BalanceSheetBreakdown"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 me-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h4.59l-2.1 1.95a.75.75 0 0 0 1.02 1.1l3.5-3.25a.75.75 0 0 0 0-1.1l-3.5-3.25a.75.75 0 1 0-1.02 1.1l2.1 1.95H6.75Z"
                    clipRule="evenodd"
                  />
                </svg>
                Third
              </span>
              <span>{openButton("BalanceSheetBreakdown")}</span>
            </div>

            {/* Fourth */}
            <div className="flex mb-3 space-x-[30px]">
              <span
                className="text-md text-wrap flex items-center w-[80%]"
                id="BalanceSheetWorkings"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 me-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h4.59l-2.1 1.95a.75.75 0 0 0 1.02 1.1l3.5-3.25a.75.75 0 0 0 0-1.1l-3.5-3.25a.75.75 0 1 0-1.02 1.1l2.1 1.95H6.75Z"
                    clipRule="evenodd"
                  />
                </svg>
                Fourth
              </span>
              <span>{openButton("BalanceSheetWorkings")}</span>
            </div>
            {/* Fifth */}
            <div className="flex mb-3 space-x-[30px]">
              <span
                className="text-md text-wrap flex items-center w-[80%]"
                id="TrialBalance"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 me-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h4.59l-2.1 1.95a.75.75 0 0 0 1.02 1.1l3.5-3.25a.75.75 0 0 0 0-1.1l-3.5-3.25a.75.75 0 1 0-1.02 1.1l2.1 1.95H6.75Z"
                    clipRule="evenodd"
                  />
                </svg>
                Fifth
              </span>
              <span>{openButton("TrialBalance")}</span>
            </div>

            {/* last  */}
          </div>
          {showModal && (
            <Modal
              className="p-0 m-0"
              opened={showModal}
              size="55%"
              trapFocus={false}
              padding={0}
              withCloseButton={false}
              withOverlay={false}
              transitionProps={"mounted"}
              onClose={() => clearModal()}
            >
              {/* {OpenModal()} */}
              {component}
            </Modal>
          )}
        </div>

        {/* ---------------------------------------------------------------------------------- */}

        {/* WHEN REPORTS ARE MORE, OTHER DIV HAS BEEN RENDERED BELOW BUT ITS COMMENTED */}
        {/* second div if report is more */}
        {/* <div
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
            borderRadius: "3px",
            backgroundColor: "#ffffff",
          }}
        >
          <div className="w-full mt-1 px-2">
            <div className="flex mb-3 space-x-[30px] mt-2">
              <span
                className="text-md  text-wrap flex items-center w-[80%] font-semibold"
                id="ListOfAccountsOCA"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 me-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h4.59l-2.1 1.95a.75.75 0 0 0 1.02 1.1l3.5-3.25a.75.75 0 0 0 0-1.1l-3.5-3.25a.75.75 0 1 0-1.02 1.1l2.1 1.95H6.75Z"
                    clipRule="evenodd"
                  />
                </svg>
                List Of Accounts Opened, Closed & Amended{" "}
              </span>
              <span>{openButton("ListOfAccountsOCA")}</span>
            </div>
            <div className="flex mb-3  space-x-[30px]">
              <span
                className="text-md text-wrap flex items-center w-[80%] font-semibold"
                id="ClosedAccounts"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 me-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h4.59l-2.1 1.95a.75.75 0 0 0 1.02 1.1l3.5-3.25a.75.75 0 0 0 0-1.1l-3.5-3.25a.75.75 0 1 0-1.02 1.1l2.1 1.95H6.75Z"
                    clipRule="evenodd"
                  />
                </svg>
                Closed Accounts
              </span>
              <span>{openButton("ClosedAccounts")}</span>
            </div>
            <div className="flex mb-3  space-x-[30px]">
              <span
                className="text-md text-wrap flex items-center w-[80%]"
                id="BalanceSheetBreakdown"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 me-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h4.59l-2.1 1.95a.75.75 0 0 0 1.02 1.1l3.5-3.25a.75.75 0 0 0 0-1.1l-3.5-3.25a.75.75 0 1 0-1.02 1.1l2.1 1.95H6.75Z"
                    clipRule="evenodd"
                  />
                </svg>
                Third
              </span>
              <span>{openButton("BalanceSheetBreakdown")}</span>
            </div>
            <div className="flex mb-3 space-x-[30px]">
              <span
                className="text-md text-wrap flex items-center w-[80%]"
                id="BalanceSheetWorkings"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 me-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h4.59l-2.1 1.95a.75.75 0 0 0 1.02 1.1l3.5-3.25a.75.75 0 0 0 0-1.1l-3.5-3.25a.75.75 0 1 0-1.02 1.1l2.1 1.95H6.75Z"
                    clipRule="evenodd"
                  />
                </svg>
                Fourth
              </span>
              <span>{openButton("BalanceSheetWorkings")}</span>
            </div>
            <div className="flex mb-3 space-x-[30px]">
              <span
                className="text-md text-wrap flex items-center w-[80%]"
                id="TrialBalance"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 me-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h4.59l-2.1 1.95a.75.75 0 0 0 1.02 1.1l3.5-3.25a.75.75 0 0 0 0-1.1l-3.5-3.25a.75.75 0 1 0-1.02 1.1l2.1 1.95H6.75Z"
                    clipRule="evenodd"
                  />
                </svg>
                Fifth
              </span>
              <span>{openButton("TrialBalance")}</span>
            </div>

          </div>
          {showModal && (
            <Modal
              className="p-0 m-0"
              opened={showModal}
              size="55%"
              trapFocus={false}
              padding={0}
              withCloseButton={false}
              withOverlay={false}
              transitionProps={"mounted"}
              onClose={() => clearModal()}
            >
              {component}
            </Modal>
          )}
        </div> */}

        {/* third div if report is more    */}
        {/* <div
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
            borderRadius: "3px",
            backgroundColor: "#ffffff",
          }}
        >
          <div className="w-full mt-1 px-2">
            <div className="flex mb-3 space-x-[30px] mt-2">
              <span
                className="text-md  text-wrap flex items-center w-[80%] font-semibold"
                id="ListOfAccountsOCA"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 me-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h4.59l-2.1 1.95a.75.75 0 0 0 1.02 1.1l3.5-3.25a.75.75 0 0 0 0-1.1l-3.5-3.25a.75.75 0 1 0-1.02 1.1l2.1 1.95H6.75Z"
                    clipRule="evenodd"
                  />
                </svg>
                List Of Accounts Opened, Closed & Amended{" "}
              </span>
              <span>{openButton("ListOfAccountsOCA")}</span>
            </div>
            <div className="flex mb-3  space-x-[30px]">
              <span
                className="text-md text-wrap flex items-center w-[80%] font-semibold"
                id="ClosedAccounts"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 me-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h4.59l-2.1 1.95a.75.75 0 0 0 1.02 1.1l3.5-3.25a.75.75 0 0 0 0-1.1l-3.5-3.25a.75.75 0 1 0-1.02 1.1l2.1 1.95H6.75Z"
                    clipRule="evenodd"
                  />
                </svg>
                Closed Accounts
              </span>
              <span>{openButton("ClosedAccounts")}</span>
            </div>
            <div className="flex mb-3  space-x-[30px]">
              <span
                className="text-md text-wrap flex items-center w-[80%]"
                id="BalanceSheetBreakdown"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 me-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h4.59l-2.1 1.95a.75.75 0 0 0 1.02 1.1l3.5-3.25a.75.75 0 0 0 0-1.1l-3.5-3.25a.75.75 0 1 0-1.02 1.1l2.1 1.95H6.75Z"
                    clipRule="evenodd"
                  />
                </svg>
                Third
              </span>
              <span>{openButton("BalanceSheetBreakdown")}</span>
            </div>
            <div className="flex mb-3 space-x-[30px]">
              <span
                className="text-md text-wrap flex items-center w-[80%]"
                id="BalanceSheetWorkings"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 me-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h4.59l-2.1 1.95a.75.75 0 0 0 1.02 1.1l3.5-3.25a.75.75 0 0 0 0-1.1l-3.5-3.25a.75.75 0 1 0-1.02 1.1l2.1 1.95H6.75Z"
                    clipRule="evenodd"
                  />
                </svg>
                Fourth
              </span>
              <span>{openButton("BalanceSheetWorkings")}</span>
            </div>
            <div className="flex mb-3 space-x-[30px]">
              <span
                className="text-md text-wrap flex items-center w-[80%]"
                id="TrialBalance"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 me-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h4.59l-2.1 1.95a.75.75 0 0 0 1.02 1.1l3.5-3.25a.75.75 0 0 0 0-1.1l-3.5-3.25a.75.75 0 1 0-1.02 1.1l2.1 1.95H6.75Z"
                    clipRule="evenodd"
                  />
                </svg>
                Fifth
              </span>
              <span>{openButton("TrialBalance")}</span>
            </div>

          </div>
          {showModal && (
            <Modal
              className="p-0 m-0"
              opened={showModal}
              size="55%"
              trapFocus={false}
              padding={0}
              withCloseButton={false}
              withOverlay={false}
              transitionProps={"mounted"}
              onClose={() => clearModal()}
            >
              {component}
            </Modal>
          )}
        </div> */}

        {/* ---------------------------------------------------------------------------------- */}
      </div>
    </div>
  );
}

export default OperationReports;
