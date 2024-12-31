import React, { useState, useEffect, useMemo, useCallback } from "react";
import InputField from "../components/fields/InputField.jsx";
import ListOfValue from "../components/fields/ListOfValue.jsx";
import ButtonComponent from "../components/button/ButtonComponent";
import DataTable from "../components/data-table/DataTable";
import HeaderComponent from "../components/header/HeaderComponent";
import ButtonType from "../components/button/ButtonType";
import { Checkbox } from "@mantine/core";
import TextAreaField from "../components/fields/TextArea";
import SelectField from "../components/fields/SelectField.jsx";
// import ArrowStepper from "../components/arrow-stepper/arrow-stepper";
import { MDBIcon } from "mdb-react-ui-kit";
import { API_SERVER } from "../../../../config/constant";
import axios from "axios";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import TabsComponent from "../components/tab-component/tab-component";
import General from "../components/credit-origination/General";
import Tranches from "../components/credit-origination/Tranches";
import Financials from "../components/credit-origination/Financials";
import Employment from "../components/credit-origination/Employment";
import Guarantors from "../components/credit-origination/Guarantors";
import Document from "../components/credit-origination/Document";
import Collateral from "../components/credit-origination/Collateral";
import Bureau from "../components/credit-origination/Bureau";
import swal from "sweetalert";
import Swal from "sweetalert2";
import Findby from "../components/search/Findby";
import { MdManageSearch } from "react-icons/md";
import { TbUserSearch } from "react-icons/tb";

const CreditOrigination = ({
  setOriginationModal,
  acct,
  cusNo,
  originationModal,
  acctCheck,
  currencyDescription,
  curCode,
}) => {
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const [selectedOption, setSelectedOption] = useState("16");
  const [disableInput, setDisableInput] = useState();

  const [facilityType, setFacilityType] = useState("16");
  const [lovFacilityType, setLovFacilityType] = useState([]);

  const [lovCustomerType, setLovCustomerType] = useState([]);
  const [customerType, setCustomerType] = useState("I");

  const [lovFacilityServiceAccount, setLovFacilityServiceAccount] = useState(
    []
  );
  const [facilityServiceAccount, setFacilityServiceAccount] = useState();

  const [accountName, setAccountName] = useState([]);

  const [allAccount, setAllAccount] = useState();

  const [currency, setCurrency] = useState();
  const [applicationNumber, setApplicaionNumber] = useState();

  const [category, setCategory] = useState();

  const [pepStatus, setPepStatus] = useState();

  const [riskStatus, setRiskStatus] = useState();

  const [withInt, setWithInt] = useState();
  const [currencyCode, setCurrencyCode] = useState("");
  const [customer_Number, setCustomer_Number] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [typeOfAccount, setTypeOfAccount] = useState("");
  const [appNumber, setAppNumber] = useState("");
  const [name, setName] = useState("");
  const [loanAmount, setLoanAmount] = useState();
  const [quotationNo, setQuotationNo] = useState();

  const [guarantorLimit, setGuarantorLimit] = useState();
  const [guarantorBeneficiaryLimit, setGuarantorBeneficiaryLimit] = useState();
  const [loanLimit, setLoanLimit] = useState(0);
  const [loanLmt, setLoanLmt] = useState("");
  const [availableBalance, setAvailableBalance] = useState(0);
  const [total, setTotal] = useState(0);
  const [curDesc, setCurDesc] = useState("");
  const [memberStatus, setMemberStatus] = useState("");
  const [loanIns, setLoanIns] = useState("");
  /////////////////////////////////////////////////
  const [tn, setTn] = useState("");
  const [int, setInt] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [toggleNew, setToggleNew] = useState(false);

  const handleSelectChange = (value) => {
    const selectedValue = value;
    setSelectedOption(selectedValue);
    setFacilityType(selectedValue);
    // Disable input fields based on selected option
    // setDisableInput(selectedValue === "disabled");
  };
  // console.log(currencyCode, "hkjkjkjlkj");
  function firstTab() {
    setActiveTab(tabsData[0].value);
  }

  function secondTab() {
    setActiveTab(tabsData[1].value);
    enableTab("financials");
  }

  function empTab() {
    setActiveTab(tabsData[2].value);
    enableTab("employment");
  }

  function guaTab() {
    setActiveTab(tabsData[3].value);
    enableTab("guarantors");
  }

  function docTab() {
    setActiveTab(tabsData[4].value);
    enableTab("document");
  }

  function collTab() {
    setActiveTab(tabsData[5].value);
    enableTab("collateral");
  }

  function burTab() {
    setActiveTab(tabsData[6].value);
    enableTab("bureau");
  }

  function enableTab(tabValue) {
    // Enable the tab if it's currently disabled
    if (disabledTabs.includes(tabValue)) {
      setDisabledTabs(disabledTabs.filter((tab) => tab !== tabValue));
    }
  }

  const tabsData = [
    {
      value: "general",
      label: "General",
      component: (
        <General
          selectedOption={selectedOption}
          // withInterests={withInt}
          facilityServiceAccount={facilityServiceAccount}
          currency={currencyCode}
          customerNumber={customerNumber}
          typeOfAccount={typeOfAccount}
          setAppNumber={setAppNumber}
          appNumber={appNumber}
          secondTab={secondTab}
          setLoanAmount={setLoanAmount}
          setLoanIns={setLoanIns}
          setQuotationNo={setQuotationNo}
          accountName={accountName}
          name={name}
          setGuarantorLimit={setGuarantorLimit}
          setGuarantorBeneficiaryLimit={setGuarantorBeneficiaryLimit}
          facilityType={facilityType}
          total={total}
          availableBalance={availableBalance}
          curDesc={curDesc}
          memberStatus={memberStatus}
          setTn={setTn}
          setInt={setInt}
          loanLmt={loanLmt}
          customerType={customerType}
        />
      ),
    },
    // {
    //   value: "tranches",
    //   label: "Tranches",
    //   component: <Tranches appNumber={appNumber} thirdTab={thirdTab} />,
    // },
    {
      value: "financials",
      label: "Financials",

      component: (
        <Financials
          appNumber={appNumber}
          quotationNo={quotationNo}
          empTab={empTab}
          firstTab={firstTab}
          loanIns={loanIns}
          loanAmount={loanAmount}
          customerNumber={customerNumber}
          tn={tn}
          int={int}
        />
      ),
    },
    {
      value: "employment",
      label: "Employment",
      component: (
        <Employment
          customerNumber={customerNumber}
          guaTab={guaTab}
          secondTab={secondTab}
        />
      ),
    },
    {
      value: "guarantors",
      label: "Guarantors",
      component: (
        <Guarantors
          customerNumber={customerNumber}
          appNumber={appNumber}
          guarantorLimit={guarantorLimit}
          guarantorBeneficiaryLimit={guarantorBeneficiaryLimit}
          docTab={docTab}
          empTab={empTab}
        />
      ),
    },
    {
      value: "document",
      label: "Document",
      component: <Document collTab={collTab} guaTab={guaTab} />,
    },
    {
      value: "collateral",
      label: "Collateral",
      component: (
        <Collateral loanAmount={loanAmount} burTab={burTab} docTab={docTab} />
      ),
    },
    {
      value: "bureau",
      label: "External Credit Bureau",
      component: <Bureau collTab={collTab} />,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabsData[0].value);
  // console.log(name, "lllll");

  function formatNumber(amount) {
    const formattedAmount = amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });

    const amountWithoutCurrency = formattedAmount.replace("$", "");
    return amountWithoutCurrency;
  }

  // useEffect(() => {
  //   axios
  //     .post(
  //       API_SERVER + "/api/get-facility-service-account",
  //       {
  //         facilityType: "16",
  //         customerType: "I",
  //       },
  //       { headers }
  //     )
  //     .then((res) => {
  //       // console.log({ vvvzzzz: res.data });

  //       setLovFacilityServiceAccount(res.data);
  //     });
  // }, []);

  // useEffect(() => {
  //   axios
  //     .post(
  //       API_SERVER + "/api/get-facility-service-account",
  //       {
  //         facilityType,
  //         customerType,
  //       },
  //       { headers }
  //     )
  //     .then((res) => {
  //       // console.log({ vvvzzzz: res.data });

  //       setLovFacilityServiceAccount(res.data);
  //     });
  // }, [facilityType, customerType]);

  useEffect(() => {
    async function getCustomerType() {
      let response = await axios.post(
        API_SERVER + "/api/get-code-details",
        { code: "CTP" },
        {
          headers,
        }
      );
      // response = await response();
      //  console.log(response);
      setLovCustomerType(response.data);
    }

    async function getFacilityServiceAccount() {
      let response = await fetch(
        API_SERVER + "/api/get-facility-service-account",
        {
          headers,
        }
      );
      response = await response.json();
      setLovFacilityServiceAccount(response);
      console.log(response);
    }

    async function getFacilityType() {
      let response = await axios.post(
        API_SERVER + "/api/get-code-details",
        { code: "FTP" },
        {
          headers,
        }
      );
      // response = await response();
      //  console.log(response);
      setLovFacilityType(response.data);
    }

    Promise.all([getFacilityType(), getCustomerType()]);

    // getFacilityServiceAccount();
  }, []);

  // useEffect(() => {
  //   async function getLoanLimit() {
  //     try {
  //       const response = await axios.get(API_SERVER + "/api/get-loan-limit", {
  //         headers,
  //       });
  //       const { data } = response;
  //       setLoanLimit(data?.loanLimit);
  //       setLoanLmt(data?.loanLimit);
  //     } catch (error) {
  //       // Handle error here (e.g., show an error message)
  //       console.error("Error fetching loan limit:", error);
  //     }
  //   }
  //   getLoanLimit();
  // }, []);

  // async function fetchAvailableBalance() {
  //   let response = await axios.post(
  //     API_SERVER + "/api/get-available-balance",
  //     { account_number: acct?.trim() },
  //     {
  //       headers,
  //     }
  //   );
  //   const avBal = response.data[0]?.av_bal;
  //   let totalValue =
  //     parseFloat(response.data[0]?.av_bal) * parseFloat(loanLimit);

  //   setAvailableBalance(formatNumber(parseFloat(avBal)));
  //   setTotal(totalValue);
  //   console.log(loanLimit, "limit");
  //   console.log(avBal, "avllllll");
  //   console.log(totalValue, "total");
  // }

  // const fetchAvailableBalance = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${API_SERVER}/api/get-available-balance`,
  //       {
  //         account_number: name,
  //       },
  //       { headers }
  //     );

  //     const avBal = response.data[0]?.av_bal;
  //     let totalValue = parseFloat(avBal) * parseFloat(loanLimit);

  //     setAvailableBalance(parseFloat(avBal));
  //     setTotal(totalValue);
  //   } catch (error) {
  //     console.error("Error fetching available balance:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchAvailableBalance();
  // }, [customerNumber]);

  useEffect(() => {
    async function getLoanLimit() {
      try {
        const response = await axios.get(API_SERVER + "/api/get-loan-limit", {
          headers,
        });
        const { data } = response;
        console.log("limittttt:", data?.loanLimit);
        setLoanLimit(data?.loanLimit);
        setLoanLmt(data?.loanLimit);
      } catch (error) {
        console.error("Error fetching loan limit:", error);
      }
    }
    getLoanLimit();
  }, []);

  useEffect(() => {
    async function fetchAvailableBalance() {
      let response = await axios.post(
        API_SERVER + "/api/get-available-balance",
        { account_number: acct?.trim() },
        {
          headers,
        }
      );
      const avBal = parseFloat(response.data[0]?.av_bal);
      setAvailableBalance(avBal);
    }
    fetchAvailableBalance();
  }, [loanLimit, customerNumber]);

  useEffect(() => {
    const totalValue = availableBalance * loanLimit;
    setTotal(totalValue);
    console.log(loanLimit, "limit");
    console.log(availableBalance, "available balance");
    console.log(totalValue, "total");
  }, [availableBalance, loanLimit]);

  // console.log(loanLimit, "limit");
  // console.log(total, "total");
  // console.log(availableBalance, "avl");

  function generateLoan() {
    if (appNumber) {
      Swal.fire({
        icon: "success",
        title: `Facility Origination Successful, Pending Verification Approval With Ref - ${appNumber}`,
      }).then((result) => {
        setOriginationModal(false);
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: "All Fields Are Required",
        html: 'Please fill all required fields with <span style="color: red; font-weight: bold;">asterisk (*)</span>',
      }).then((result) => {
        // handleExitClick();
      });
    }
  }

  const handleExitClick = () => {
    if (document.getElementById("exitBTN1")) {
      const exitBTN = document.getElementById("exitBTN1");
      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        // cancelable: true,
        // view: window,
      });
      exitBTN.dispatchEvent(clickEvent);
    }
  };
  // console.log({ name, acct });
  const handleMemberChange = (param) => {
    // console.log({ value });
    // alert("nmae");
    let value;
    if (param?.includes("-")) {
      value = param;
    } else {
      value = lovFacilityServiceAccount.find((i) =>
        i?.value?.includes(param)
      )?.value;
    }

    setName();
    //   if (value?.includes("-")) {
    //     // alert("Y");

    //   } else {
    //     // alert("N");

    //     setName(
    //       lovFacilityServiceAccount.find((i) =>
    //         i.value?.includes(value?.trim())
    //       )?.label
    //     );
    //   }
    // console.log({
    //   i: lovFacilityServiceAccount.find((i) => i?.value?.includes(value))
    //     ?.label,
    //   a: lovFacilityServiceAccount,
    // });
    // alert("name");
    // setFacilityServiceAccount(acct);
    // const data = lovFacilityServiceAccount.find(
    //   (i) =>
    //     i.value.split("-")[0] === value.split("-")[0].trim()
    // );

    // console.log(data, "faa");
    // axios
    //   .post(
    //     "http://192.168.1.63:3320/api/typeOfAccount",
    //     {
    //       repay_acct_v: value.split("-")[0].trim(),
    //     },
    //     { headers }
    //   )
    //   .then((response) => {
    //     setTypeOfAccount(response.data);
    //     // console.log(response.data, "reeeeeeessssssss");
    //   });

    // setAccountName(value?.split("-")[3]);
    setCurDesc(currencyDescription);
    // setMemberStatus(value?.split("-")[5]);
    setCurrency(currency);
    setCurrencyCode(curCode);
    // setCustomer_Number(value?.split("-")[1]);
    // setCustomerNumber(value?.split("-")[1]);
    // setWithInt(true);
  };

  useEffect(() => {
    // console.log({ acct, originationModal });
    if (acctCheck) {
      setCustomerNumber(cusNo);
      setFacilityServiceAccount(acct);
      handleMemberChange(acct?.trim());
      setCurrency(curCode);
      setCurrencyCode(curCode);
      setCurDesc(currencyDescription);

      // axios
      //   .post(
      //     API_SERVER + "/api/get-risk-status",
      //     {
      //       customerNumber: cusNo,
      //     },
      //     { headers }
      //   )
      //   .then((res) => {
      //     console.log(res, "riskkkkk");
      //     setPepStatus(res.data.pep_status);
      //     setRiskStatus(res.data.risk_status);
      //   });
    }
  }, [originationModal]);

  console.log(currencyCode, "tesssstttttttttCodeee");
  console.log(curDesc, "tesssstttttttttDescccc");
  console.log(facilityServiceAccount, "tesssstttttttttAccttttt");

  const searchAcct = (value) => {
    axios
      .post(
        API_SERVER + "/api/get-facility-service-account-new",
        {
          acct_link: value,
        },
        {
          headers: headers,
        }
      )
      .then(function (response) {
        console.log({ response });
        if (response.data.length <= 0) {
          Swal.fire({
            icon: "warning",
            title: `INF - Account Number does not Exist`,
          }).then((result) => {});
        } else {
          handleMemberChange();
        }
      });
  };

  const selectedNew = (row) => {
    // axios
    //   .post(
    //     API_SERVER + "/api/get-risk-status",
    //     {
    //       customerNumber: row?.customer_number,
    //     },
    //     { headers }
    //   )
    //   .then((res) => {
    //     // console.log(res, "riskkkkk");
    //     setPepStatus(res.data.pep_status);
    //     setRiskStatus(res.data.risk_status);
    //   });
    setFacilityServiceAccount(row?.acct_link);
    // console.log(row);
    setAccountNumber(`${row?.customer_number} - ${row?.account_descrp}`);
    setCustomerNumber(row?.customer_number);
    setCurDesc(row?.currency);
    setCurrencyCode(row?.currency_code);
    searchAcct(row?.acct_link);
    setToggleNew(false);
  };

  const [disabledTabs, setDisabledTabs] = useState([
    "financials",
    "employment",
    "guarantors",
    "document",
    "collateral",
    "bureau",
  ]);

  return (
    <div style={{ zoom: 0.9 }}>
      <div style={{}}>
        <div className="pb-2">
          <ActionButtons
            displayFetch={"none"}
            displayAuthorise={"none"}
            displayCancel={"none"}
            displayDelete={"none"}
            displayHelp={"none"}
            displayRefresh={"none"}
            displayReject={"none"}
            displayView={"none"}
            onOkClick={generateLoan}
            onExitClick={() => {
              // setRiskStatus("");
              // setPepStatus("");
              // setAccountNumber("");
              setOriginationModal(false);
            }}
          />
        </div>
        <div
          style={{
            border: "2px solid #dfdce6",
            borderRadius: "5px",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          }}
        >
          <div
            style={{
              display: "flex",
              background: "white",
            }}
          >
            <div style={{ flex: 0.6 }}>
              <div>
                <SelectField
                  label={"Facility Type"}
                  // labelWidth={"25%"}
                  inputWidth={"50%"}
                  lovdata={lovFacilityType}
                  onChange={handleSelectChange}
                  value={facilityType}
                  required

                  // value={selectedOption}
                />
              </div>
              {/* <div style={{}}>
                <SelectField
                  label={"Member Type"}
                  // labelWidth={"25%"}
                  inputWidth={"100%"}
                  lovdata={lovCustomerType}
                  value={customerType}
                  onChange={(value) => setCustomerType(value)}
                  required
                />
              </div> */}
              <div style={{}}>
                {/* {name ? (
                  <InputField
                    label={"Member Disbursement Account"}
                    // labelWidth={"25%"}
                    inputWidth={"100%"}
                    value={name}
                    required
                    id={"memberIDInput"}
                    onFocus={() => {
                      setName("");
                      setAccountName([]);
                      setPepStatus("");
                      setRiskStatus("");
                      setTimeout(() => {
                        document.getElementById("memberFocus")?.focus();
                      }, 100);
                    }}
                  />
                ) : (
                  <ListOfValue
                    id={"memberFocus"}
                    label={"Member Disbursement Account"}
                    // labelWidth={"25%"}
                    inputWidth={"100%"}
                    required
                    value={name}
                    lovdata={lovFacilityServiceAccount}
                    onChange={handleMemberChange}
                  />
                )} */}
                {acct ? null : (
                  // <InputField
                  //   label={"Member Account"}
                  //   value={acct}
                  //   disabled
                  //   // onChange={(e) => {
                  //   //   setAccountNumber(e.target.value);
                  //   // }}
                  // />
                  <div className="flex -mt-4">
                    <div style={{ flex: 0.9 }}>
                      <InputField
                        label={"Member"}
                        inputWidth={"100%"}
                        value={accountNumber}
                        onChange={(e) => {
                          setAccountNumber(e.target.value);
                        }}
                        // onKeyPress={(e) => {
                        //   if (e.key == "Enter") {
                        //     searchAcct(e.target.value);
                        //   }
                        // }}
                      />
                    </div>
                    <div className="pt-9">
                      <ButtonComponent
                        // label={"Search"}
                        buttonIcon={<TbUserSearch size={20} color="blue" />}
                        buttonWidth={"33px"}
                        buttonHeight={"27px"}
                        buttonBackgroundColor={"#d4e2ff"}
                        onClick={() => {
                          setToggleNew(true);
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
              {/* <div style={{ marginTop: "-5px" }}>
              <ListOfValue
                label={"Facility Service Account"}
                labelWidth={"25%"}
                inputWidth={"30%"}
                required
                lovdata={lovFacilityServiceAccount}
                onChange={(value) => {
                  // Retrieve data based on the selected value
                  const data = allAccount.find(
                    (i) => i.account_number === value
                  );

                  if (!data) {
                    // Display Swal alert if the account number is not found or invalid
                    swal({
                      icon: "error",
                      title: "Invalid Account Number",
                      text: "The selected account number is not valid.",
                    });
                    return; // Exit the onChange function
                  }

                  // Send a POST request to retrieve risk status using axios
                  axios
                    .post(
                      "http://10.203.14.195:3320/api/get-risk-status",
                      {
                        customerNumber: data.customer_number,
                      },
                      { headers }
                    )
                    .then((res) => {
                      // console.log(res);
                      setPepStatus(res.data.pep_status);
                      setRiskStatus(res.data.risk_status);
                    });

                  setAccountName(data.account_name);
                  setCurrency(data.currency);
                  setCategory(data.category);
                  setWithInt(true);
                }}
              />
            </div> */}
              {/* <div style={{ marginTop: "-5px" }}>
                <InputField
                  label={"Member Name"}
                  labelWidth={"25%"}
                  disabled
                  inputWidth={"30%"}
                  value={accountName}
                />
              </div> */}
              {/* <div style={{ display: "flex", marginTop: "-10px" }}>
                <div style={{ marginTop: "-10px", flex: 0.38 }}>
                  <InputField
                    label={"Currency"}
                    labelWidth={"69%"}
                    disabled
                    inputWidth={"26%"}
                    value={currency}
                    textAlign={"center"}
                  />
                </div>
                <div style={{ marginTop: "-10px", flex: 0.5 }}>
                  <InputField
                    inputWidth={"33%"}
                    disabled
                    value={category}
                    textAlign={"center"}
                  />
                </div>
              </div> */}
            </div>
            {/* <div
              style={{
                flex: 0.4,
              }}
            >
              <div>
                <InputField
                  label={"Application Number"}
                  inputWidth={"100%"}
                  disabled
                  value={appNumber}
                  textAlign={"center"}
                  className={"font-bold"}
                />
              </div>
              <div style={{}}>
                <InputField
                  label={"Pep Status"}
                  inputWidth={"100%"}
                  disabled
                  className={"font-bold"}
                  color="red"
                  value={pepStatus}
                  inputColor={"red"}
                  textAlign={"center"}
                />
              </div>
              <div style={{}}>
                <InputField
                  label={"Risk Status"}
                  inputWidth={"100%"}
                  disabled
                  color="red"
                  value={riskStatus}
                  inputColor={"red"}
                  className={"font-bold"}
                  textAlign={"center"}
                />
              </div>
            </div> */}
          </div>
        </div>
        <br />
        <div>
          {/* <ArrowStepper selectedOption={selectedOption} /> */}
          {/* <TabsComponent
            tabsData={tabsData}
            inactiveColor={"white"}
            // inactiveColor={"#AFE1AF7A"}
            disabledTabs={[
              "financials",
              "employment",
              "guarantors",
              "document",
              "collateral",
              "bureau",
            ]}
            activeColor={"#40c057"}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          /> */}
          <TabsComponent
            tabsData={tabsData}
            inactiveColor={"white"}
            activeColor={"#40c057"}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            disabledTabs={disabledTabs}
          />
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div></div>
          <div style={{ display: "flex", gap: "20px" }}></div>
        </div>
      </div>
      <Findby
        showModal={toggleNew}
        facilityType={facilityType}
        customerType={customerType}
        setShowModal={setToggleNew}
        determinant={"restricted"}
        handleSelected={selectedNew}
      />
    </div>
  );
};

export default CreditOrigination;
