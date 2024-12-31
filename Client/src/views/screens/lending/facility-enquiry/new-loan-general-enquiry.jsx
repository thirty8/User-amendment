import React, { useEffect, useState } from "react";
import Header from "../../../../components/others/Header/Header";
import user from "../../../../assets/images/user.png";
import {
  FiActivity,
  FiClipboard,
  FiEye,
  FiFileText,
  FiMail,
  FiPhone,
  FiPrinter,
  FiX,
} from "react-icons/fi";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import { API_SERVER } from "../../../../config/constant";
import axios from "axios";
import { headers } from "../../teller-ops/teller/teller-activities";
import Swal from "sweetalert2";
import CustomTable from "../../control-setups/components/CustomTable";
import TabsComponent from "../../../../components/others/tab-component/tab-component";
import Schedule from "./schedule";
// import LoanTerms from "./loanterms";
import Financials from "./financials";
import Guarantors from "./guarantors";
import Collateral from "./collateral";
import Documents from "./documents";
import NewLoanTerms from "./new-loanterms";
import { Spin } from "antd";
import { Modal, ScrollArea } from "@mantine/core";
import ViewAllLoans from "./view-all-loans";
import ChargesStatements from "./chargesStatements";
import PrintSchedule from "./printSchedule";
import PrintStatements from "./printStatements";
import PrintRepayments from "./printRepayment";

function NewLoanGeneralEnquiry({
  facilityDetails,
  selectedCustomer,
  closeModal,
}) {
  // STATES
  const [facilityTableDetails, setFacilityTableDetails] = useState([]);
  const [customerPersonalDetails, setCustomerPersonalDetails] = useState([]);
  const [facilityLoading, setFacilityLoading] = useState(false);
  const [office, setOffice] = useState("");
  const [showViewAllLoans, setShowViewAllLoans] = useState(false);
  const [allLoansMod, setAllLoansMod] = useState(false);
  const [chargesMod, setChargesMod] = useState(false);
  const [loading, setloading] = useState(true);
  const [showBg, setShowBg] = useState("");
  const [chargesStatements, setChargesStatements] = useState(false);
  const [printScheduleScreen, setPrintScheduleScreen] = useState("");
  const [printRepayments, setPrintRepayments] = useState(false);
  const [statementsHist, setStatementsHist] = useState("");

  console.log(facilityDetails, "FAC DEETS");

  //   FUNCTIONS
  const handleShowCHargesStatements = () => setChargesStatements(true);
  const closeChargesStatements = () => setChargesStatements(false);
  const closePrintModal = () => {
    setPrintScheduleScreen(false);
  };

  //   FORMAT NUMBER
  function formatNumber0(num) {
    if (isNaN(num)) {
      return "";
    }
    const formatted = num.toLocaleString("en-US", { minimumFractionDigits: 2 });

    return formatted;
  }

  // DATE FORMATTER
  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = date.toLocaleString("en-GB", { day: "2-digit" });
    const month = date
      .toLocaleString("en-GB", { month: "short" })
      .toUpperCase();
    const year = date.toLocaleString("en-GB", { year: "numeric" });

    return `${month}-${day}-${year}`;
  }

  //   VARIABLES
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

  // TABS
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
        // <LoanTerms principal_account={facilityDetails?.principal_account} />
        <NewLoanTerms principal_account={facilityDetails?.principal_account} />
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
    {
      value: "4",
      label: "Collateral",
      component: (
        <Collateral principalAccount={facilityDetails?.principal_account} />
      ),
    },
    {
      value: "5",
      label: "Documents",
      component: (
        <Documents principal_account={facilityDetails?.principal_account} />
      ),
    },
  ];

  const [activeTab, setActiveTab] = useState(enquiryTabs[0].value);

  //   EFFECTS
  useEffect(() => {
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
        setloading(false);
        console.log(response.data, "celeb");
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });

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
      .catch((err) => {
        console.log(err);
      });

    axios
      .post(
        API_SERVER + "/api/loan-general-enquiry-get-customer-personal-details",
        {
          customer_number:
            selectedCustomer?.customer_number ||
            facilityTableDetails[0]?.customer_no,
        },
        { headers: headers }
      )
      .then(function (response) {
        setCustomerPersonalDetails(response.data);
        setloading(false);
        console.log(response.data, "freddie");
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  }, [selectedCustomer, facilityDetails, facilityTableDetails]);

  //   FUNCTIONS
  var ftd = facilityTableDetails?.map((i) => {
    return [
      <div>{i?.facility_no}</div>,
      <div>
        {selectedCustomer?.principal_account ||
          facilityDetails?.principal_account}
      </div>,
      <div>{i?.maintenance_fee_account}</div>,
      <div>{formatDate(i?.disbursement_date)}</div>,
      <div>{formatDate(i?.last_repay_date)}</div>,
      <div>{selectedCustomer?.iso_code}</div>,
      <div>{office}</div>,
      <div style={{ textAlign: "right" }}>
        {formatNumber0(parseFloat(facilityTableDetails[0]?.facility_amount))}
      </div>,
      <div style={{ textAlign: "right" }}>
        {formatNumber0(parseFloat(i?.interest_rate))}
      </div>,
      <div>{i?.loan_status}</div>,
    ];
  });

  return (
    <div
      style={{
        zoom: 0.87,
        padding: "10px",
        display: showBg || allLoansMod || chargesMod ? "none" : "block",
      }}
    >
      {/* OVERLAY LOADER */}
      {loading && (
        <div className=" h-full w-full grid place-items-center bg-white top-0 right-0 left-0 opacity-90 absolute z-10">
          <div className="z-30 opacity-100  rounded-full">
            <Spin size="large" />
          </div>
        </div>
      )}

      {/* MAIN LOAN GENERAL ENQUIRY SCREEN */}
      <div>
        <Header
          title={"Loan General Enquiry"}
          handleClose={closeModal}
          fontColor={"white"}
          backgroundColor={"#3b82f6"}
          closeIcon
        />

        <br />

        <div>
          <div
            className="flex gap-4 justify-between px-3"
            style={{ color: "rgb(92, 92, 92)" }}
          >
            <div className="flex">
              <div className="mr-5">
                <img src={user} alt="User Icon" className="h-12 w-12" />
              </div>

              {/* FIRST ROW */}
              <div className="space-y-3">
                <span className="text-xl font-bold capitalize">
                  {loading ? <Spin /> : facilityTableDetails[0]?.acct_name}
                </span>
                <div>
                  <span className="font-bold">Member No :</span>{" "}
                  {facilityTableDetails[0]?.customer_no}
                </div>

                <div>
                  <span className="font-bold">Classification :</span>{" "}
                  {facilityTableDetails[0]?.ac_class}
                </div>
                <div
                  className="cursor-default"
                  title={selectedCustomer?.description}
                >
                  <span className="font-bold">Prod Desc. :</span>{" "}
                  {selectedCustomer?.description?.length > 17
                    ? selectedCustomer?.description.substring(0, 16) + "..."
                    : selectedCustomer?.description}
                </div>
                <div>
                  <span className="font-bold">Sector :</span>{" "}
                  {facilityTableDetails[0]?.sector}
                </div>
              </div>
            </div>

            {/* SECOND ROW */}
            <div className="space-y-3 mt-10">
              <div>
                <span className="font-bold">Principal Bal. :</span>{" "}
                {formatNumber0(parseFloat(facilityTableDetails[0]?.loan_bal))}
              </div>
              <div>
                <span className="font-bold">Principal in Arrears :</span>{" "}
                {facilityTableDetails[0]?.prin_pastdue === "NaN"
                  ? ""
                  : formatNumber0(
                      parseFloat(facilityTableDetails[0]?.prin_pastdue)
                    )}
              </div>
              <div>
                <span className="font-bold">Interest in Arrears :</span>{" "}
                {facilityTableDetails[0]?.od_int_pastdue === "NaN"
                  ? ""
                  : facilityTableDetails[0]?.od_int_pastdue}
              </div>
              <div>
                <span className="font-bold">Total Facility Bal. :</span>{" "}
                {selectedCustomer?.loan_balance === "NaN"
                  ? ""
                  : formatNumber0(
                      parseFloat(facilityTableDetails[0]?.total_amt)
                    )}
              </div>
            </div>

            {/* THIRD ROW */}
            <div className="space-y-3 mt-10">
              <div>
                <span className="font-bold">Income Interest :</span>{" "}
                {facilityTableDetails[0]?.accr_int === "NaN"
                  ? ""
                  : formatNumber0(
                      parseFloat(facilityTableDetails[0]?.accr_int)
                    )}
              </div>
              <div>
                <span className="font-bold">Income Penal :</span>{" "}
                {facilityTableDetails[0]?.penal_amt === "NaN"
                  ? ""
                  : formatNumber0(
                      parseFloat(facilityTableDetails[0]?.penal_amt)
                    )}
              </div>
              <div>
                <span className="font-bold">Suspense Interest :</span>{" "}
                {facilityTableDetails[0]?.int_susp === "NaN"
                  ? ""
                  : formatNumber0(
                      parseFloat(facilityTableDetails[0]?.int_susp)
                    )}
              </div>
              <div>
                <span className="font-bold">Suspense Penal :</span>{" "}
                {facilityTableDetails[0]?.penal_susp === "NaN"
                  ? ""
                  : formatNumber0(
                      parseFloat(facilityTableDetails[0]?.penal_susp)
                    )}
              </div>
            </div>

            {/* FOURTH ROW */}
            <div className="flex flex-col space-y-2 mt-10">
              <div className="flex">
                <div className="font-bold mr-2">Email :</div>
                <div>
                  {customerPersonalDetails[0]?.email_address === "null"
                    ? ""
                    : customerPersonalDetails[0]?.email_address}
                </div>
              </div>

              <div>
                <ButtonComponent
                  label={"Send Email"}
                  buttonWidth={"120px"}
                  buttonHeight={"26px"}
                  buttonColor={"white"}
                  buttonBackgroundColor={
                    customerPersonalDetails[0]?.email_address === "null"
                      ? "#ccc"
                      : "green"
                  }
                  buttonIcon={<FiMail color={"white"} />}
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

              <div className="flex">
                <div className="font-bold mr-2">Phone :</div>
                <div>
                  {customerPersonalDetails[0]?.mobile1 === "null"
                    ? ""
                    : customerPersonalDetails[0]?.mobile1}
                </div>
              </div>

              <div>
                <ButtonComponent
                  label={"Send SMS"}
                  buttonWidth={"120px"}
                  buttonHeight={"26px"}
                  buttonColor={"white"}
                  buttonBackgroundColor={
                    customerPersonalDetails[0]?.mobile1 === "null"
                      ? "#ccc"
                      : "green"
                  }
                  buttonIcon={<FiPhone color={"white"} />}
                  onClick={() => {
                    if (customerPersonalDetails[0]?.mobile1 === "null") {
                      Swal.fire("ERR-01936!", "Invalid Phone Number!", "error");
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <br />
        <hr />

        {/* SAVE, EXIT, VIEW ALL LOANS */}
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex gap-3">
            {" "}
            <div>
              <ButtonComponent
                label={"View all loans"}
                buttonBackgroundColor={"#070269"}
                buttonWidth={"155px"}
                buttonHeight={"32px"}
                buttonIcon={<FiEye />}
                onClick={() => {
                  setShowViewAllLoans(true);
                  setAllLoansMod(true);
                  setShowBg(true);
                }}
              />

              {/* MODAL TO DISPLAY VIEW ALL LOANS */}
              <Modal
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
                  customer_number={
                    selectedCustomer?.customer_number ||
                    facilityTableDetails[0]?.customer_no
                  }
                  closeLoansModal={() => {
                    setShowViewAllLoans(false);
                    setAllLoansMod(false);
                    setShowBg(false);
                  }}
                />
              </Modal>
            </div>
            <div>
              <ButtonComponent
                label={"Charges Statement Enq."}
                buttonBackgroundColor={"#070269"}
                buttonWidth={"235px"}
                buttonHeight={"32px"}
                buttonIcon={<FiActivity />}
                onClick={() => {
                  handleShowCHargesStatements();
                  setShowBg(true);
                }}
              />

              <Modal
                className=""
                size={"75%"}
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
                  // setShowBg={() => setShowBg(false)} deja vu
                  closeModal={() => {
                    closeChargesStatements();
                    setShowBg(false);
                  }}
                  principal_details={selectedCustomer || facilityDetails}
                />
              </Modal>
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              <ButtonComponent
                label={"Exit"}
                onClick={closeModal}
                buttonBackgroundColor={"red"}
                buttonWidth={"80px"}
                buttonHeight={"32px"}
                buttonIcon={<FiX />}
              />
            </div>
          </div>
        </div>
        <hr />

        {/* CUSTOM TABLE */}
        <div>
          <div>
            <Header title={"Facility"} headerShade />
            <CustomTable
              headers={facilityHeaders}
              data={ftd}
              load={facilityLoading}
              hidePagination
              rowsPerPage={1}
            />
          </div>
        </div>

        <br />

        <hr />

        {/* PRINT BUTTONS */}
        <div className="flex items-center justify-between px-6 py-4">
          <div></div>
          <div className="flex gap-3">
            {" "}
            <div>
              <ButtonComponent
                label={"Print Loan Schedule"}
                buttonBackgroundColor={"#120d00"}
                buttonWidth={"225px"}
                buttonHeight={"32px"}
                buttonIcon={<FiClipboard />}
                onClick={() => {
                  setPrintScheduleScreen(true);
                  setShowBg(true);
                }}
              />

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
            </div>
            <div>
              <ButtonComponent
                label={"Print Repayments"}
                buttonBackgroundColor={"#120d00"}
                buttonWidth={"205px"}
                buttonHeight={"32px"}
                buttonIcon={<FiPrinter />}
                onClick={() => {
                  setShowBg(true);
                  setPrintRepayments(true);
                }}
                // torsu
              />

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
            </div>
            <div>
              <ButtonComponent
                label={"Print Statements (Hist)"}
                buttonBackgroundColor={"#120d00"}
                buttonWidth={"235px"}
                buttonHeight={"32px"}
                buttonIcon={<FiFileText />}
                onClick={() => {
                  setStatementsHist(true);
                  setShowBg(true);
                }}
              />

              <Modal
                opened={statementsHist}
                size={"70%"}
                padding={"9px"}
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
            </div>
          </div>
        </div>
        <hr />
        <br />

        {/* TABS - SCHEDULE/REPAYMENT, LOAN TERMS, FINANCIALS, GUARANTOR, COLLATERAL, DOCUMENTS  */}
        <div>
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

export default NewLoanGeneralEnquiry;
