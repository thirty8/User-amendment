import React, { useState, useEffect } from "react";
import InputField from "../fields/InputField";
import ListOfValue from "../fields/ListOfValue";
import SelectField from "../fields/SelectField";
import ButtonComponent from "../button/ButtonComponent";
import CustomTable from "../data-table/CustomTable";
import ButtonType from "../button/ButtonType";
import Label from "../label/Label";
import TextAreaField from "../fields/TextArea";
import HeaderComponent from "../header/HeaderComponent";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import { Modal } from "@mantine/core";
import swal from "sweetalert";
import { IoExitOutline } from "react-icons/io5";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
// import TableLoader from "../../../trans-processes/uploads/components/loader";

const GeneralApp = ({ selectedOption }) => {
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const [testSub, setTestSub] = useState("");

  function formatNumber(amount) {
    const formattedAmount = amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });

    const amountWithoutCurrency = formattedAmount.replace("$", "");
    return amountWithoutCurrency;
  }

  const [lovFacilityTypeCategory, setLovFacilityTypeCategory] = useState([]);
  const [facilityTypeCategory, setFacilityTypeCategory] = useState();

  const [lovLoanProducts, setLovLoanProducts] = useState([]);
  const [loanProduct, setLoanProduct] = useState();

  const [lovInterestType, setLovInterestType] = useState([]);
  const [interestType, setInterestType] = useState();

  const [interestRate, setInterestRate] = useState();
  const [interestRateAnnum, setInterestRateAnnum] = useState();

  const [effectiveInterestRate, setEffectiveInterestRate] = useState();
  const [effectiveInterestRateAnnum, setEffectiveInterestRateAnnum] =
    useState();

  const [lovPrincipalRepayFreq, setLovPrincipalRepayFreq] = useState([]);
  const [principalRepaymentFrequency, setPrincipalRepaymentFrequency] =
    useState();

  const [lovInterestRepayFreq, setLovInterestRepayFreq] = useState([]);
  const [interestRepaymentFrequency, setInterestRepaymentFrequency] =
    useState();

  const [principalRepaymentCount, setPrincipalRepaymentCount] = useState();
  const [interestRepaymentCount, setInterestRepaymentCount] = useState();

  const [exemptMonth, setExemptMonth] = useState("");
  const [lastWorkingDay, setLastWorkingDay] = useState();

  const [lovIntroSource, setLovIntroSource] = useState([]);
  const [introSource, setIntroSource] = useState();

  const [lovDealerCode, setLovDealerCode] = useState([]);
  const [dealerCode, setDealerCode] = useState();

  const [lovPurpose, setLovPurpose] = useState([]);
  const [purpose, setPurpose] = useState();

  const [otherPurpose, setOtherPurpose] = useState("");

  const [lovSector, setLovSector] = useState([]);
  const [sector, setSector] = useState([]);

  const [lovSubSector, setLovSubSector] = useState([]);
  const [subSector, setSubSector] = useState();

  const [lovStaff, setLovStaff] = useState([]);
  const [staff, setStaff] = useState();

  const [requestedAmount, setRequestedAmount] = useState();

  const [count, setCount] = useState();
  const [tenorInMonths, setTenorInMonths] = useState();

  const [lienPercencate, setLienPercentage] = useState();
  const [lienAmount, setLienAmount] = useState();

  const [insurancePercentage, setInsurancePercentage] = useState();
  const [insuranceAmount, setInsuranceAmount] = useState();

  const [processingFeePercentage, setProcessingFeePercentage] = useState();
  const [processingFeeAmount, setProcessingFeeAmount] = useState();

  const [moratoriumPeriod, setMoratorium] = useState("");
  const [withInterest, setWithInterest] = useState();
  const [loanScheduleModal, setLoanScheduleModal] = useState();

  const [quotationNumber, setQuotationNumber] = useState();
  const [data, setData] = useState([]);

  const [responseData, setResponseData] = useState();
  const [error, setError] = useState();

  var chargeArr = [
    [
      <div>
        <InputField inputWidth={"100%"} disabled value={"Lien on Loan"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} value={lienPercencate} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} value={lienAmount} />
      </div>,
    ],
    [
      <div>
        <InputField inputWidth={"100%"} disabled value={"Insurance"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} value={insurancePercentage} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} value={insuranceAmount} />
      </div>,
    ],
    [
      <div>
        <InputField inputWidth={"100%"} disabled value={"Processing Fee"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} value={processingFeePercentage} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} value={processingFeeAmount} />
      </div>,
    ],
  ];

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {/* <div className="absolute top-0 left-0 z-10 h-full opacity-50 bg-white flex justify-center align-middle w-full">
        <TableLoader />
      </div> */}
      <div
        style={{
          flex: "0.55",
          padding: "10px",
          border: "none",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          backgroundColor: "white",
          borderRadius: "5px",
          border: "2px solid #cbd4d8",
        }}
      >
        {selectedOption === "16" ? (
          <div>
            <InputField
              label={"Loan Product"}
              labelWidth={"30%"}
              inputWidth={"50%"}
              disabled
            />
          </div>
        ) : (
          <div>
            <InputField
              label={"Source of Payment"}
              labelWidth={"30%"}
              inputWidth={"50%"}
              disabled
            />
          </div>
        )}
        <div style={{}}>
          <InputField
            label={"Facility Type Category"}
            labelWidth={"30%"}
            inputWidth={"50%"}
            disabled
          />
        </div>
        <div style={{}}>
          <InputField
            label={"Requested Amount"}
            labelWidth={"30%"}
            inputWidth={"20%"}
            disabled
            textAlign={"right"}
          />
        </div>

        <div style={{}}>
          <InputField
            label={"Intro Source"}
            labelWidth={"30%"}
            inputWidth={"50%"}
            disabled
          />
        </div>
        <div style={{}}>
          <InputField
            label={"Dealer Code"}
            labelWidth={"30%"}
            inputWidth={"50%"}
            disabled
          />
        </div>
        <div style={{}}>
          <InputField
            label={"Purpose"}
            labelWidth={"30%"}
            inputWidth={"50%"}
            disabled
          />
        </div>
        <div style={{}}>
          <TextAreaField label={"Other Purpose"} labelWidth={"30%"} disabled />
        </div>

        <div style={{}}>
          <InputField
            label={"Sector"}
            labelWidth={"30%"}
            inputWidth={"50%"}
            disabled
          />
        </div>
        <div style={{}}>
          <InputField
            label={"Sub Sector"}
            labelWidth={"30%"}
            inputWidth={"50%"}
            disabled
          />
        </div>
        <div style={{}}>
          <InputField
            label={"Sales/Intro Staff"}
            labelWidth={"30%"}
            inputWidth={"50%"}
            disabled
          />
        </div>

        <div style={{}}>
          <InputField
            label={"Moratorium Period"}
            labelWidth={"30%"}
            inputWidth={"20%"}
            disabled
          />
        </div>
        <div style={{}}>
          <InputField
            label={"With Interest"}
            labelWidth={"30%"}
            inputWidth={"20%"}
            disabled
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            // marginTop: "10px",
          }}
        >
          <div
            style={{
              flex: 0.6,
              padding: "5px",
              // borderRadius: "3px",
              // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
              // backgroundColor: "white",
              // height: "130px",
              // border: "0.5px solid #e0dfe0",
            }}
          >
            <div>
              <InputField
                label={"Number of Tranches"}
                labelWidth={"50%"}
                inputWidth={"17%"}
                disabled
              />
            </div>
            <div style={{}}>
              <InputField
                label={"Reference Number"}
                labelWidth={"50%"}
                inputWidth={"30%"}
                disabled
              />
            </div>
            <div
              style={{
                display: "flex",
                // marginBottom: "-17px",
                marginTop: "-8px",
              }}
            >
              <div style={{ flex: 0.73, marginTop: "-10px" }}>
                <InputField
                  label={"Disbursement Accounts"}
                  labelWidth={"70%"}
                  inputWidth={"24%"}
                  disabled
                />
              </div>
              <div style={{ flex: 0.2, marginTop: "1px" }}>
                <ButtonComponent
                  label={"Add"}
                  // buttonBackgroundColor={"black"}
                  background={selectedOption === "02" ? "grey" : "#6faf5e"}
                  buttonHeight={"29px"}
                  buttonWidth={"80px"}
                  buttonColor={"white"}
                  disabled={selectedOption === "02"}
                />
              </div>
            </div>
          </div>
          <div></div>
        </div>

        {/* <div style={{ marginTop: "20px" }}>
                <InputField
                  label={"Interest Rate"}
                  labelWidth={"30%"}
                  inputWidth={"15%"}
                />
              </div> */}
      </div>
      <div
        style={{
          flex: "0.45",
          padding: "10px",
          border: "1.5px solid #d6d7d9",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          backgroundColor: "white",
          borderRadius: "5px",
          border: "1px solid #cbd4d8",
        }}
      >
        <div
          style={{
            padding: "10px",
            borderRadius: "3px",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            backgroundColor: "white",
            border: "0.5px solid #e0dfe0",
            marginBottom: "10px",
          }}
        >
          {/* <div style={{ borderBottom: "1px solid" }}>
            <h6>Loan Plan</h6>
          </div> */}
          <div>
            <HeaderComponent title={"Loan Plan"} />
          </div>
          {selectedOption === "16" ? (
            <div style={{ display: "flex", marginBottom: "-16px" }}>
              <div style={{ flex: 0.68 }}>
                <InputField
                  label={"Interest Rate P.M / P.A"}
                  labelWidth={"68%"}
                  inputWidth={"30%"}
                  disabled

                  // fontSize={"85%"}
                />
              </div>
              <div style={{ flex: 0.32 }}>
                <InputField inputWidth={"59%"} disabled />
              </div>
            </div>
          ) : (
            ""
          )}
          <div style={{ display: "flex", marginTop: "" }}>
            <div style={{ flex: 0.68 }}>
              <InputField
                label={"Effective Interest Rate (P.M / P.A)"}
                labelWidth={"68%"}
                inputWidth={"30%"}
                disabled
              />
            </div>
            <div style={{ flex: 0.32 }}>
              <InputField inputWidth={"59%"} disabled />
            </div>
          </div>
          <div style={{ marginTop: "-16px" }}>
            <InputField
              label={"Tenor (Months)"}
              labelWidth={"44%"}
              inputWidth={"20%"}
              disabled
            />
          </div>
          <div style={{}}>
            <InputField
              label={"Interest Type"}
              labelWidth={"44%"}
              inputWidth={"45%"}
              disabled
            />
          </div>
          <div style={{}}>
            <InputField
              label={"Principal Repay Freq."}
              labelWidth={"44%"}
              inputWidth={"45%"}
              disabled
            />
          </div>
          <div style={{}}>
            <InputField
              label={"Interest Repay Freq."}
              labelWidth={"44%"}
              inputWidth={"45%"}
              disabled
            />
          </div>
          <div
            style={{
              display: "flex",
              marginBottom: "-12px",
              marginTop: "-12px",
            }}
          >
            <div style={{ flex: 0.68 }}>
              <InputField
                label={"Principal Count / Interest Count"}
                labelWidth={"68%"}
                inputWidth={"30%"}
                disabled
              />
            </div>
            <div style={{ flex: 0.32 }}>
              <InputField inputWidth={"59%"} disabled />
            </div>
          </div>
          {selectedOption === "16" ? (
            <div style={{}}>
              <InputField
                label={"Apply Exempt Months"}
                labelWidth={"44%"}
                inputWidth={"20%"}
                disabled
              />
            </div>
          ) : (
            <div style={{}}>
              <InputField
                label={"Interest Date Option"}
                labelWidth={"44%"}
                inputWidth={"45%"}
                disabled
              />
            </div>
          )}
          <div style={{}}>
            <InputField
              label={"Last Working Day"}
              labelWidth={"44%"}
              inputWidth={"20%"}
              disabled
            />
          </div>
        </div>
        <div style={{}}>
          {/* <DataTable columns={["Charges", "%", "Fee Amount"]} /> */}
          <CustomTable
            headers={["Charges", "%", "Fee Amount"]}
            data={chargeArr}
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralApp;
