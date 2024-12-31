import React, { useEffect, useState } from "react";
import Header from "../../../../components/others/Header/Header";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import ProfitAndLossBreakdown from "./components/profitandlossbreakdown";
import { Modal } from "@mantine/core";
import ProfitAndLossWorkings from "./components/profitandlossworkings";
import BalanceSheetBreakdown from "./components/balancesheetbreakdown";
import BalanceSheetWorkings from "./components/balancesheetworkings";
import TrialBalance from "./components/trialbalance";
import { API_SERVER } from "../../../../config/constant";
import axios from "axios";

function FinanceReports() {
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
    let aa = document.getElementById(b).id;

    setShowModal(true);

    switch (aa) {
      case "ProfitAndLossBreakdown":
        return setComponent(
          <ProfitAndLossBreakdown
            clearModal={clearModal}
            currencylov={currencylov}
            formatDate={formatDate}
            reportName={"Profit and Loss (YoY) - Breakdown"}
          />
        );
      case "ProfitAndLossWorkings":
        return setComponent(
          <ProfitAndLossWorkings
            clearModal={clearModal}
            currencylov={currencylov}
            reportName={"Profit and Loss (YoY) - Workings"}
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
          <TrialBalance
            clearModal={clearModal}
            currencylov={currencylov}
            reportName={"LCY Balance Translated Figures"}
          />
        );

      default:
        return alert("No report found");
    }
  }

  const openButton = (a) => {
    return (
      <ButtonComponent
        label={"Open"}
        buttonWidth={"55px"}
        onClick={() => OpenModal(a)}
      />
    );
  };

  function clearModal() {
    setShowModal(false);
    setComponent();
  }

  return (
    <div className="p-1 w-[50%] mx-auto">
      <div>
        <Header title={"Key Finance Reports"} headerShade={true} />
      </div>
      <div
        className="mt-1 px-3 py-3"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          borderRadius: "3px",
          backgroundColor: "#ffffff",
        }}
      >
        <div className="w-[95%] mx-auto">
          <div className="flex gap-10 mb-3">
            <span
              className="text-xl  w-[60%] flex items-center gap-3"
              id="ProfitAndLossBreakdown"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h4.59l-2.1 1.95a.75.75 0 0 0 1.02 1.1l3.5-3.25a.75.75 0 0 0 0-1.1l-3.5-3.25a.75.75 0 1 0-1.02 1.1l2.1 1.95H6.75Z"
                  clipRule="evenodd"
                />
              </svg>
              Profit and Loss - Breakdown
            </span>
            <span>{openButton("ProfitAndLossBreakdown")}</span>
          </div>
          <div className="flex gap-10 mb-3 items-center">
            <span
              className="text-xl w-[60%] flex items-center gap-3"
              id="ProfitAndLossWorkings"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h4.59l-2.1 1.95a.75.75 0 0 0 1.02 1.1l3.5-3.25a.75.75 0 0 0 0-1.1l-3.5-3.25a.75.75 0 1 0-1.02 1.1l2.1 1.95H6.75Z"
                  clipRule="evenodd"
                />
              </svg>
              Profit and Loss - Workings
            </span>
            <span>{openButton("ProfitAndLossWorkings")}</span>
          </div>
          <div className="flex gap-10 mb-3">
            <span
              className="text-xl  w-[60%] flex items-center gap-3"
              id="BalanceSheetBreakdown"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h4.59l-2.1 1.95a.75.75 0 0 0 1.02 1.1l3.5-3.25a.75.75 0 0 0 0-1.1l-3.5-3.25a.75.75 0 1 0-1.02 1.1l2.1 1.95H6.75Z"
                  clipRule="evenodd"
                />
              </svg>
              Balance Sheet - Breakdown
            </span>
            <span>{openButton("BalanceSheetBreakdown")}</span>
          </div>
          <div className="flex gap-10 mb-3">
            <span
              className="text-xl w-[60%] flex items-center gap-3"
              id="BalanceSheetWorkings"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h4.59l-2.1 1.95a.75.75 0 0 0 1.02 1.1l3.5-3.25a.75.75 0 0 0 0-1.1l-3.5-3.25a.75.75 0 1 0-1.02 1.1l2.1 1.95H6.75Z"
                  clipRule="evenodd"
                />
              </svg>
              Balance Sheet - Workings
            </span>
            <span>{openButton("BalanceSheetWorkings")}</span>
          </div>
          <div className="flex gap-10 mb-3">
            <span
              className="text-xl w-[60%] flex items-center gap-3"
              id="TrialBalance"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h4.59l-2.1 1.95a.75.75 0 0 0 1.02 1.1l3.5-3.25a.75.75 0 0 0 0-1.1l-3.5-3.25a.75.75 0 1 0-1.02 1.1l2.1 1.95H6.75Z"
                  clipRule="evenodd"
                />
              </svg>
              Trial Balance
            </span>
            <span>{openButton("TrialBalance")}</span>
          </div>
        </div>
        {showModal && (
          <Modal
            className="p-0 m-0"
            opened={showModal}
            size="55%"
            padding={0}
            withCloseButton={false}
            transitionProps={"mounted"}
            onClose={() => clearModal()}
          >
            {/* {OpenModal()} */}
            {component}
          </Modal>
        )}
      </div>
    </div>
  );
}

export default FinanceReports;
