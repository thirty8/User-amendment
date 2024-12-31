import React, { useEffect, useState } from "react";
import Header from "../../../../components/others/Header/Header";
import CustomTable from "../../control-setups/components/CustomTable";
import { FiEye, FiX } from "react-icons/fi";
import InputField from "../../../../components/others/Fields/InputField";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import { API_SERVER } from "../../../../config/constant";
import axios from "axios";
import TabsComponent from "../../../../components/others/tab-component/tab-component";
import Schedule from "./schedule";
import { Modal, ScrollArea } from "@mantine/core";
import PrintSchedule from "./printSchedule";
import LoanTerms from "./loanterms";
import Collateral from "./collateral";
import Guarantors from "./guarantors";
import Documents from "./documents";
import Financials from "./financials";
import Swal from "sweetalert2";
import ViewAllLoans from "./view-all-loans";
import ChargesStatements from "./chargesStatements";
import LoanReschedule from "../loan-restructuring/loan-reschedule-payment";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import PrintRepayments from "./printRepayment";
import PrintStatements from "./printStatements";

function LoanGeneralEnquiry({ closeModal, selectedCustomer, facilityDetails }) {
  // states
  const [facilityTableDetails, setFacilityTableDetails] = useState([]);
  const [customerPersonalDetails, setCustomerPersonalDetails] = useState([]);
  const [reportingSchedule, setReportingSchedule] = useState("");
  const [scheduleData, setScheduleData] = useState([]);
  const [office, setOffice] = useState("");
  const [printScheduleScreen, setPrintScheduleScreen] = useState("");
  const [showBg, setShowBg] = useState("");
  const [showViewAllLoans, setShowViewAllLoans] = useState(false);
  const [allLoansMod, setAllLoansMod] = useState(false);
  const [chargesStatements, setChargesStatements] = useState(false);
  const [statementsHist, setStatementsHist] = useState("");
  const [printRepayments, setPrintRepayments] = useState(false);

  const closePrintModal = () => {
    setPrintScheduleScreen(false);
  };

  // headers
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  //tabs data
  //   var enquiryTabs = [<FacilityEnquiry />];

  // date formatter
  function formatDate(dateString) {
    const date = new Date(dateString);

    // Get individual parts of the date
    const day = date.toLocaleString("en-GB", { day: "2-digit" });
    const month = date
      .toLocaleString("en-GB", { month: "short" })
      .toUpperCase();
    const year = date.toLocaleString("en-GB", { year: "numeric" });

    // Combine the parts with hyphens
    return `${month}-${day}-${year}`;
  }
  //   // number formatter
  function formatNumber(amount) {
    return amount;
  }

  function formatNumber0(num) {
    if (isNaN(num)) {
      return "";
    }
    const formatted = num.toLocaleString("en-US", { minimumFractionDigits: 2 });

    return formatted;
  }

  // table Headers
  var facilityHeaders = [
    "Facility Number",
    "Facility A/C",
    "Repayment A/C",
    "Disb. Date",
    "Expiry Date",
    "Currency",
    "Loan Officer",
    <div style={{ textAlign: "right" }}>Amount Granted</div>,
    <div style={{ textAlign: "right" }}>Int Rate</div>,
    "Status",
  ];

  var loanScheduleHeaders = [
    "Seq No",
    "Date Due",
    "Principal",
    "Interest",
    "Total Installment",
    "Principal Paid",
    "Interest Paid",
    "Pri. Repay Date",
    "Int Repay Date",
  ];

  useEffect(() => {
    console.log(facilityDetails, "food");

    console.log(selectedCustomer, "food2");
    axios
      .post(
        API_SERVER + "/api/loan-general-enquiry-get-facility-table-details",
        {
          facility_no: facilityDetails?.facility_no,
        },
        { headers: headers }
      )
      .then(function (response) {
        setFacilityTableDetails(response.data);
        console.log(response.data, "celeb");
      })
      .catch((err) => console.log(err));

    axios
      .post(
        API_SERVER + "/api/get-office",
        {
          loan_app_no: selectedCustomer?.loan_app_no,
        },
        { headers: headers }
      )
      .then(function (response) {
        setOffice(response.data[0]?.office);
      })
      .catch((err) => console.log(err));

    axios
      .post(
        API_SERVER + "/api/loan-general-enquiry-get-customer-personal-details",
        {
          customer_number: selectedCustomer?.customer_number,
        },
        { headers: headers }
      )
      .then(function (response) {
        setCustomerPersonalDetails(response.data);
        console.log(response.data, "freddie");
      })
      .catch((err) => console.log(err));
  }, []);

  // tabs
  const enquiryTabs = [
    {
      value: "default",
      label: "Schedule/Repayment",
      component: <Schedule fn={facilityDetails?.facility_no} />,
    },
    {
      value: "1",
      label: "Loan Terms",
      component: (
        <LoanTerms principal_account={facilityDetails?.principal_account} />
      ),
    },
    {
      value: "2",
      label: "Financials",
      component: (
        <Financials principal_account={facilityDetails?.principal_account} />
      ),
    },
    {
      value: "3",
      label: "Guarantor",
      component: (
        <Guarantors principal_account={facilityDetails?.principal_account} />
      ),
    },
    { value: "4", label: "Collateral", component: <Collateral /> },
    { value: "5", label: "Documents", component: <Documents /> },
  ];

  var ftd = facilityTableDetails?.map((i) => {
    return [
      <div>{i?.facility_no}</div>,
      <div>{selectedCustomer?.principal_account}</div>,
      <div>{i?.maintenance_fee_account}</div>,
      <div>{formatDate(i?.disbursement_date)}</div>,
      <div>{formatDate(i?.last_repay_date)}</div>,
      <div>{selectedCustomer?.iso_code}</div>,
      <div>{office}</div>,
      <div style={{ textAlign: "right" }}>
        {formatNumber0(parseFloat(facilityTableDetails[0]?.facility_amount))}
      </div>,
      <div style={{ textAlign: "right" }}>
        {formatNumber(parseFloat(i?.interest_rate))}
      </div>,
      <div>{i?.loan_status}</div>,
    ];
  });

  const [activeTab, setActiveTab] = useState(enquiryTabs[0].value);
  const [reschedulePayments, setReschedulePayments] = useState(false);

  const handleShowCHargesStatements = () => setChargesStatements(true);
  const handleReschedulePayments = () => setReschedulePayments(true);
  const closeChargesStatements = () => setChargesStatements(false);
  return (
    <div
      style={{
        zoom: "0.96",
        display: showBg || allLoansMod ? "none" : "block",
      }}
      className="p-2"
    >
      <div>
        <Header
          title="Loan General Enquiry"
          closeIcon
          handleClose={closeModal}
          // headerShade
          fontColor={"white"}
          backgroundColor={"#0063d1"}
        />
        <div style={{ display: "flex", width: "100%" }}>
          <div
            style={{
              width: "50%",
              marginTop: "5px",
              marginRight: "5px",
              marginLeft: "5px",
            }}
          >
            {/* loan details */}
            <Header title="Loan Details" headerShade={true} />
            <div className="space-y-4 border-2 rounded py-5 px-2">
              <InputField
                inputWidth="100%"
                labelWidth={"22%"}
                label={"Member Name"}
                className={"font-bold"}
                disabled
                value={facilityTableDetails[0]?.acct_name}
              />
              <div className="flex">
                <InputField
                  inputWidth="50%"
                  label={"Member No."}
                  labelWidth={"35%"}
                  disabled
                  value={facilityTableDetails[0]?.customer_no}
                />
                <InputField
                  inputWidth="70%"
                  label={"Prod Desc"}
                  labelWidth={"30%"}
                  disabled
                  value={selectedCustomer?.description}
                />
              </div>
              <InputField
                inputWidth="100%"
                labelWidth={"22.5%"}
                label={"Address"}
                disabled
                value={
                  customerPersonalDetails[0]?.residential_address === "null"
                    ? ""
                    : customerPersonalDetails[0]?.residential_address
                }
              />
              <div className="flex space-x-2">
                <InputField
                  inputWidth="60%"
                  label={"Email"}
                  labelWidth={"27%"}
                  disabled
                  value={
                    customerPersonalDetails[0]?.email_address === "null"
                      ? ""
                      : customerPersonalDetails[0]?.email_address
                  }
                />

                <ButtonComponent
                  buttonWidth={"50%"}
                  label={"Send Email"}
                  buttonHeight={"30px"}
                  labelWidth={"50%"}
                  buttonBackgroundColor={
                    customerPersonalDetails[0]?.email_address === "null"
                      ? "#ccc"
                      : ""
                  }
                  onClick={() => {
                    if (customerPersonalDetails[0]?.email_address === "null") {
                      Swal.fire(
                        "ERR- 01936",
                        "Invalid Email Address.",
                        "error"
                      );
                    }
                  }}
                />
              </div>

              <div className="flex space-x-2">
                <InputField
                  inputWidth="60%"
                  label={"Phone"}
                  labelWidth={"27%"}
                  disabled
                  value={
                    customerPersonalDetails[0]?.mobile1 === "null"
                      ? ""
                      : customerPersonalDetails[0]?.mobile1
                  }
                />

                <ButtonComponent
                  buttonWidth={"50%"}
                  label={"Send SMS"}
                  buttonHeight={"30px"}
                  labelWidth={"50%"}
                  buttonBackgroundColor={
                    customerPersonalDetails[0]?.mobile1 === "null" ? "#ccc" : ""
                  }
                  onClick={() => {
                    if (customerPersonalDetails[0]?.mobile1 === "null") {
                      Swal.fire("ERR-01936!", "Invalid Phone Number!", "error");
                    } else {
                      axios
                        .post(
                          "http://10.203.14.16:8080/waste/create_notification",
                          {
                            activity_code: "FAENQ",
                            entrySource: "React",
                            branch: "000",
                            created_by: "UNIONADMIN",
                            device_id: "vxxf",
                            para1: "",
                            para2: customerPersonalDetails[0]?.mobile1,
                            para3: selectedCustomer?.name,
                            para4: "6,000 ",
                            ref_no: "563456465",
                            notify: "Y",
                          },
                          {
                            headers: {
                              "x-api-key": "usgnotificationtest",
                              "Content-Type": "application/json",
                            },
                          }
                        )
                        .then(function (response) {
                          Swal.fire("SMS sent to phone number", "", "success");
                        })
                        .catch((err) => console.log(err));
                    }
                  }}
                />
              </div>

              <hr />
              <div className="flex">
                <InputField
                  inputWidth="50%"
                  label={"Classication"}
                  labelWidth={"35%"}
                  disabled
                  // className={"font-bold !text-red-500"}
                  value={facilityTableDetails[0]?.ac_class}
                />
                <InputField
                  inputWidth="70%"
                  label={"Sector"}
                  labelWidth={"30%"}
                  disabled
                  value={facilityTableDetails[0]?.sector}
                />
              </div>

              <hr />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div></div>
                <div className="flex-end space-x-2">
                  <ButtonComponent
                    buttonWidth={"175px"}
                    buttonIcon={<FiEye />}
                    label={"View All Loans"}
                    buttonHeight={"30px"}
                    onClick={() => {
                      setShowViewAllLoans(true);
                      setAllLoansMod(true);
                    }}
                  />
                </div>

                {/* view all Loans */}
                <Modal
                  className=""
                  size={"60%"}
                  opened={showViewAllLoans}
                  padding={0}
                  withCloseButton={false}
                  onClose={() => {
                    setShowViewAllLoans(false);
                  }}
                  trapFocus={false}
                  scrollAreaComponent={ScrollArea.Autosize}
                >
                  <ViewAllLoans
                    customer_number={selectedCustomer?.customer_number}
                    closeLoansModal={() => {
                      setShowViewAllLoans(false);
                      setAllLoansMod(false);
                    }}
                  />
                </Modal>
              </div>
            </div>
          </div>

          {/* label */}
          <div style={{ width: "50%", marginTop: "5px", marginRight: "5px" }}>
            <Header title="Label" headerShade={true} />
            <div className="space-y-4 border-2 rounded py-2 px-2">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div></div>

                <div>
                  <InputField
                    inputWidth="60%"
                    label={"Principal Balance"}
                    labelWidth={"30%"}
                    disabled
                    className={"font-bold"}
                    value={formatNumber0(
                      parseFloat(facilityTableDetails[0]?.loan_bal)
                    )}
                    textAlign={"right"}
                  />
                </div>
              </div>

              <hr />
              <Header title="Arrears" headerShade={true} />
              <div className="flex">
                <InputField
                  inputWidth="100%"
                  label={"Principal"}
                  labelWidth={"47%"}
                  disabled
                  value={
                    facilityTableDetails[0]?.prin_pastdue === "NaN"
                      ? ""
                      : formatNumber0(
                          parseFloat(facilityTableDetails[0]?.prin_pastdue)
                        )
                  }
                  textAlign={"right"}
                />
                <InputField
                  inputWidth="100%"
                  label={"Interest"}
                  labelWidth={"50%"}
                  disabled
                  value={
                    facilityTableDetails[0]?.od_int_pastdue === "NaN"
                      ? ""
                      : facilityTableDetails[0]?.od_int_pastdue
                  }
                  textAlign={"right"}
                />
              </div>

              <hr />

              <Header title="Accrual" headerShade={true} />
              <div className="flex">
                <div style={{ width: "50%", textAlign: "center" }}>Income</div>
                <div style={{ width: "50%", textAlign: "center" }}>
                  Suspense
                </div>
              </div>
              <div className="flex">
                <InputField
                  inputWidth="100%"
                  label={"Interest"}
                  labelWidth={"50%"}
                  disabled
                  value={
                    // formatNumber(
                    //   parseFloat(facilityTableDetails[0]?.accr_int)
                    // ) === "NaN"
                    //   ? ""
                    //   : formatNumber(
                    //       parseFloat(facilityTableDetails[0]?.accr_int)
                    //     )

                    facilityTableDetails[0]?.accr_int === "NaN"
                      ? ""
                      : facilityTableDetails[0]?.accr_int
                  }
                  textAlign={"right"}
                />
                <InputField
                  inputWidth="100%"
                  labelWidth={"50%"}
                  disabled
                  value={
                    facilityTableDetails[0]?.int_susp === "NaN"
                      ? ""
                      : facilityTableDetails[0]?.int_susp
                  }
                  textAlign={"right"}
                />
              </div>

              <div className="flex">
                <InputField
                  inputWidth="100%"
                  label={"Penal"}
                  labelWidth={"50%"}
                  disabled
                  value={
                    facilityTableDetails[0]?.penal_amt === "NaN"
                      ? ""
                      : facilityTableDetails[0]?.penal_amt
                  }
                  textAlign={"right"}
                />
                <InputField
                  inputWidth="100%"
                  labelWidth={"50%"}
                  disabled
                  value={
                    facilityTableDetails[0]?.penal_susp === "NaN"
                      ? ""
                      : facilityTableDetails[0]?.penal_susp
                  }
                  textAlign={"right"}
                />
              </div>

              <hr />
              <InputField
                inputWidth="34%"
                label={"Total Facility Balance"}
                labelWidth={"70%"}
                disabled
                textAlign={"right"}
                // className={"font-bold !text-red-500"}
                value={
                  selectedCustomer?.loan_balance === "NaN"
                    ? ""
                    : formatNumber0(
                        parseFloat(facilityTableDetails[0]?.total_amt)
                      )
                }
              />
            </div>
          </div>
        </div>

        {/* facility */}
        <div style={{ zoom: "0.85" }}>
          <Header
            title={"Facility"}
            headerShade
            // backgroundColor={"#abfca7"}
            greenShade
          />
          <CustomTable headers={facilityHeaders} data={ftd} green />
        </div>

        <hr />

        <div className="flex space-x-2 py-4 px-2">
          <ButtonComponent
            buttonWidth={"35%"}
            label={"Print Loan Schedule"}
            labelWidth={"50%"}
            buttonHeight={"35px"}
            onClick={() => {
              setPrintScheduleScreen(true);
              setShowBg(true);
            }}
          />

          <ButtonComponent
            buttonWidth={"35%"}
            label={"Print Repayments"}
            labelWidth={"50%"}
            buttonHeight={"35px"}
            onClick={() => {
              setShowBg(true);
              setPrintRepayments(true);
            }}
          />

          {/* <ButtonComponent
            buttonWidth={"35%"}
            label={"Loan Rescheduling"}
            labelWidth={"50%"}
            buttonHeight={"35px"}
            onClick={() => {
              setShowBg(true);
              handleReschedulePayments();
            }}
          /> */}

          <ButtonComponent
            buttonWidth={"35%"}
            label={"Charges statements enq."}
            labelWidth={"50%"}
            buttonHeight={"35px"}
            onClick={() => {
              handleShowCHargesStatements();
              setShowBg(true);
            }}
          />

          {/* Charges Statements Enquiry */}
          <Modal
            className=""
            size={"80%"}
            opened={chargesStatements}
            padding={0}
            withCloseButton={false}
            onClose={() => {
              setChargesStatements(false);
            }}
            trapFocus={false}
            scrollAreaComponent={ScrollArea.Autosize}
          >
            <ChargesStatements
              setShowBg={() => setShowBg(false)}
              closeModal={closeChargesStatements}
              principal_details={selectedCustomer}
            />
          </Modal>

          <ButtonComponent
            buttonWidth={"35%"}
            label={"Print statements (Hist)"}
            labelWidth={"50%"}
            buttonHeight={"35px"}
            onClick={() => {
              setStatementsHist(true);
              setShowBg(true);
            }}
          />
        </div>

        <Modal
          className=""
          size={"80%"}
          opened={printScheduleScreen}
          padding={0}
          withCloseButton={false}
          onClose={() => {
            setPrintScheduleScreen(false);
          }}
          trapFocus={false}
          scrollAreaComponent={ScrollArea.Autosize}
        >
          <PrintSchedule
            fn={facilityDetails?.facility_no}
            closeModal={closePrintModal}
            setShowBg={() => setShowBg(false)}
            personalDetails={selectedCustomer}
          />
        </Modal>

        {/* <Modal
          size={"80%"}
          opened={reschedulePayments}
          padding={0}
          withCloseButton={false}
          onClose={() => {
            setReschedulePayments(false);
          }}
          trapFocus={false}
          scrollAreaComponent={ScrollArea.Autosize}
        >
          <Header
            title={"Loan Reschedule"}
            headerShade
            closeIcon={<FiX />}
            handleClose={() => {
              setReschedulePayments(false);
              setShowBg(false);
            }}
          />
          <div style={{ zoom: 0.8 }}>
            <LoanReschedule memberDetails={facilityTableDetails[0]} />
          </div>
        </Modal> */}

        <Modal
          opened={statementsHist}
          size={"80%"}
          padding={0}
          withCloseButton={false}
          trapFocus={false}
          scrollAreaComponent={ScrollArea.Autosize}
          onClose={() => {
            setStatementsHist(false);
          }}
        >
          <Header
            title={"Print Statements"}
            headerShade
            closeIcon={true}
            handleClose={() => {
              setStatementsHist(false);
              setShowBg(false);
            }}
          />
          <PrintStatements
            account_number={selectedCustomer?.principal_account}
          />
        </Modal>

        <Modal
          opened={printRepayments}
          size={"80%"}
          padding={0}
          withCloseButton={false}
          trapFocus={false}
          scrollAreaComponent={ScrollArea.Autosize}
          onClose={() => {
            setPrintRepayments(false);
          }}
        >
          <Header
            headerShade
            handleClose={() => {
              setShowBg();
              setPrintRepayments(false);
            }}
            closeIcon={true}
            title={"Loan Repayments"}
          />
          <PrintRepayments
            fn={facilityDetails?.facility_no}
            setShowBg={() => setShowBg(false)}
          />
        </Modal>

        <div style={{ zoom: "0.95", marginTop: "25px" }}>
          {/* <Header title={"Tabs"} headerShade /> */}
          <TabsComponent
            tabsData={enquiryTabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            activeColor={"#87adff"}
            inactiveColor={"#c2e3fc"}
          />
        </div>
      </div>
    </div>
  );
}

export default LoanGeneralEnquiry;
