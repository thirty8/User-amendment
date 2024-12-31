import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { Modal } from "@mantine/core";
import { API_SERVER } from "../../../../config/constant";
import { AiOutlineCloseCircle, AiOutlineDoubleRight } from "react-icons/ai";

import Header from "../../../../components/others/Header/Header";
import InputField from "../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
import RadioButtons from "../../../../components/others/Fields/RadioButtons";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import CustomTable from "../../teller-ops/components/CustomTable";
import AccountBalanceEnquiry from "../../account-activities/account-enquiry/components/account-balance-enquiry";

function ChartofAccountsEnquiry() {
  const headers = {
    // 'x-api-key': process.env.REACT_APP_API_KEY,
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const [enquiryDetails, setEnquiryDetails] = useState([]);
  const [chartGroupLov, setChartGroupLov] = useState([]);
  const [createdByLov, setCreatedByLov] = useState([]);
  const [cleartoAccountLov, setCleartoAccountLov] = useState([]);
  const [chartGroup, setChartGroup] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [clearToAccount, setClearToAccount] = useState("");
  const [status, SetStatus] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [accountDescription, setAccountDescription] = useState("");
  const [reconcilation, setReconcilation] = useState("");
  const [balanceAccount, setBalanceAccount] = useState({});
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    async function ChartGroup() {
      let response = await axios.post(
        API_SERVER + "/api/get-code-details",
        { code: "CAC" },
        { headers }
      );
      setChartGroupLov(response.data);
    }

    // console.log(reconcilation,"statusstatus")
    async function cleartoAccount() {
      let response = await axios.get(
        API_SERVER + "/api/get-clear-to-account-details",
        { headers }
      );
      setCleartoAccountLov(response.data);
    }
    async function createdUsers() {
      let response = await axios.get(
        API_SERVER + "/api/get-created-by-details",
        { headers }
      );
      setCreatedByLov(response.data);
    }
    createdUsers();
    ChartGroup();
    cleartoAccount();
    getEnquiryDetails();
  }, []);

  const handleExitClick = () => {
    if (document.getElementById("exitBTN1")) {
      const exitBTN = document.getElementById("exitBTN1");
      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      exitBTN.dispatchEvent(clickEvent);
    }
  };

  function formatDate(inputDateStr) {
    var inputDate = new Date(inputDateStr);
    var months = [
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
    return (
      inputDate.getDate() +
      "-" +
      months[inputDate.getMonth()] +
      "-" +
      inputDate.getFullYear()
    );
  }

  async function getEnquiryDetails() {
    await axios
      .post(
        API_SERVER + "/api/get-chart-of-accounts-enquiry",
        {
          chartGroup: chartGroup,
          accountNumber: accountNumber,
          clearToAccount: clearToAccount,
          Status: status,
          dateFrom: dateFrom ? formatDate(dateFrom) : "",
          dateTo: dateTo ? formatDate(dateTo) : "",
          createdBy: createdBy,
          accountDescription: accountDescription,
          reconcilation: reconcilation,
        },
        { headers }
      )
      .then((response) => {
        if (response.data.length > 0) {
          let arr = [];
          response.data.map((j, key) => {
            arr.push([
              j.chart_code,
              j.tacct,
              j.account_descrp,
              j.level_id,
              j.clear_to_code,
              j.currency,
              j.branch_code,
              j.posted_by,
              formatDate(j.posting_date),
              j.flag_message,
              <div className="flex justify-center">
                <ButtonComponent
                  buttonIcon={<AiOutlineDoubleRight size={16} />}
                  onClick={() => {
                    setBalanceAccount({ accountNumber: j.tacct });
                    setShowModal(true);
                  }}
                />
              </div>,
            ]);
          });
          // alert(arr.length)
          setEnquiryDetails(arr);
        } else {
          swal({
            icon: "error",
            title: "No data found",
          });
          setEnquiryDetails([]);
          // getEnquiryDetailsRefresh();
        }
      });
  }

  async function getEnquiryDetailsRefresh() {
    setAccountDescription("");
    setChartGroup("");
    setAccountNumber("");
    setClearToAccount("");
    setCreatedBy("");
    setEnquiryDetails([]);
    setDateFrom("");
    setDateTo("");
    setReconcilation("");
    SetStatus("");
    await axios
      .post(
        API_SERVER + "/api/get-chart-of-accounts-enquiry",
        {
          chartGroup: "",
          accountNumber: "",
          clearToAccount: "",
          Status: "",
          dateFrom: "",
          dateTo: "",
          createdBy: "",
          accountDescription: "",
        },
        { headers }
      )
      .then((response) => {
        if (response.data.length > 0) {
          let arr = [];
          response.data.map((j) => {
            arr.push([
              j.chart_code,
              j.tacct,
              j.account_descrp,
              j.level_id,
              j.clear_to_code,
              j.currency,
              j.branch_code,
              j.posted_by,
              formatDate(j.posting_date),
              j.flag_message,
              <div className="flex justify-center">
                <ButtonComponent
                  buttonIcon={<AiOutlineDoubleRight size={16} />}
                  onClick={() => {
                    setShowModal(true);
                  }}
                />
              </div>,
            ]);
          });
          setEnquiryDetails(arr);
        } else {
          swal({
            icon: "error",
            title: "No data found",
          });
        }
      });
  }
  return (
    <div className="p-1">
      <div className="mb-2">
        <Header title={"Chart Of Account Enquiry"} headerShade={true} />
      </div>
      <div>
        <hr className="my-3" />
        <div className="flex mb-3">
          <div style={{ flex: 0.5 }}>
            <ListOfValue
              label={"Chart Group"}
              labelWidth={"35%"}
              inputWidth={"55%"}
              data={chartGroupLov}
              onChange={(value) => {
                setChartGroup(value);
              }}
              value={chartGroup}
            />
          </div>
          <div style={{ flex: 0.5 }}>
            <InputField
              label={"Account Number"}
              labelWidth={"35%"}
              inputWidth={"45%"}
              onChange={(e) => {
                setAccountNumber(e.target.value);
              }}
              value={accountNumber}
            />
          </div>
        </div>
        <div className="flex mb-3">
          <div style={{ flex: 0.5 }}>
            <ListOfValue
              label={"Clear to Account"}
              labelWidth={"35%"}
              inputWidth={"55%"}
              data={cleartoAccountLov}
              onChange={(value) => {
                setClearToAccount(value);
              }}
              value={clearToAccount}
            />
          </div>
          <div style={{ flex: 0.5 }}>
            <RadioButtons
              label={"Status"}
              labelWidth={"35%"}
              radioLabel={"Active"}
              value={"Y"}
              display={true}
              id={"active"}
              radioLabel2={"Non-Active"}
              display2={true}
              id2={"nonActive"}
              value2={"N"}
              name={"status"}
              checked={status === "Y"}
              checked2={status === "N"}
              onChange={(e) => SetStatus(e.target.value)}
            />
          </div>
        </div>
        <div className="flex mb-3">
          <div style={{ flex: 0.5 }}>
            <InputField
              type={"date"}
              label={"From"}
              labelWidth={"35%"}
              inputWidth={"55%"}
              onChange={(e) => {
                setDateFrom(e.target.value);
              }}
              value={dateFrom}
            />
          </div>
          <div style={{ flex: 0.5 }}>
            <InputField
              type={"date"}
              label={"To"}
              labelWidth={"35%"}
              inputWidth={"45%"}
              onChange={(e) => {
                setDateTo(e.target.value);
              }}
              value={dateTo}
            />
          </div>
        </div>
        <div className="flex mb-3">
          <div style={{ flex: 0.5 }}>
            <ListOfValue
              label={"Created By"}
              labelWidth={"35%"}
              inputWidth={"55%"}
              data={createdByLov}
              onChange={(value) => {
                setCreatedBy(value);
              }}
              value={createdBy}
            />
          </div>
          <div style={{ flex: 0.5 }}>
            {/* <InputField 
                     label={"Account Reconcilation"}
                     labelWidth={"35%"}
                     inputWidth={"45%"}
                    /> */}
            <RadioButtons
              label={"Account Reconcilation"}
              labelWidth={"35%"}
              radioLabel={"Auto"}
              value={"A"}
              display={true}
              id={"auto"}
              radioLabel2={"Manual"}
              display2={true}
              value2={"M"}
              id2={"manual"}
              radioLabel3={"Not Applicable"}
              display3={true}
              value3={"N"}
              id3={"not_applicable"}
              name={"reconcilation"}
              checked2={reconcilation === "M"}
              checked3={reconcilation === "N"}
              checked={reconcilation === "A"}
              onChange={(e) => {
                setReconcilation(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex mb-3">
          <div style={{ flex: 0.5 }}>
            <InputField
              label={"Account Description"}
              labelWidth={"35%"}
              inputWidth={"55%"}
              onChange={(e) => {
                setAccountDescription(e.target.value);
              }}
              value={accountDescription}
            />
          </div>
          <div style={{ flex: 0.5 }}></div>
        </div>
        <hr className="my-3" />
        <div className="flex justify-end gap-2 pr-5 mb-3">
          <ButtonComponent
            label={"Fetch"}
            buttonWidth={"70px"}
            onClick={getEnquiryDetails}
          />
          <ButtonComponent
            label={"Refresh"}
            buttonWidth={"100px"}
            onClick={getEnquiryDetailsRefresh}
          />
          <ButtonComponent
            label={"Exit"}
            buttonWidth={"50px"}
            onClick={handleExitClick}
          />
        </div>
        <div className="mb-1">
          <Header title={"General Ledger Accounts"} headerShade={true} />
        </div>
        <div style={{ zoom: 0.9 }}>
          <CustomTable
            headers={[
              "Chart Group",
              "Account Number",
              "Account Description",
              "Level",
              "Clear To Account",
              "Currency",
              "Branch",
              "Created By",
              "Date Created",
              "Status",
              "Action",
            ]}
            data={enquiryDetails}
            rowsPerPage={10}
          />
        </div>
      </div>
      {showModal && (
        <Modal
          padding={0}
          opened={showModal}
          size="95%"
          style={{ margin: 0, padding: 0 }}
          withCloseButton={false}
          transitionProps={"mounted"}
          onClose={() => {
            setShowModal(false);
          }}
        >
          <div>
            <div>
              <Header
                title={"Account Balance Enquiry"}
                closeIcon={<AiOutlineCloseCircle size={18} />}
                handleClose={() => {
                  setShowModal(false);
                }}
                backgroundColor={"#0369A1"}
              />
            </div>
            <div className="p-2">
              <AccountBalanceEnquiry state={balanceAccount} />
            </div>
            {/* <div>{balanceAccount}</div> */}
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ChartofAccountsEnquiry;
