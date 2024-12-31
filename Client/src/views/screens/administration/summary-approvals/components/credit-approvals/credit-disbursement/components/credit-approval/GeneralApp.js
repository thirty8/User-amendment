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
import { API_SERVER } from "../../../../../../../../../config/constant";
import { Modal } from "@mantine/core";
import swal from "sweetalert";
import { IoExitOutline } from "react-icons/io5";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
// import TableLoader from "../../../trans-processes/uploads/components/loader";

const GeneralApp = ({
  selectedOption,
  sector,
  purpose,
  introSource,
  requestedAmount,
  tenorInMonths,
  loanProduct,
  principalRepaymentFrequency,
  interestRepaymentFrequency,
  interestType,
  dealerCode,
  subSector,
  moratoriumPeriod,
  principalRepaymentCount,
  interestRepaymentCount,
  withInt,
  exemptMonth,
  lastWorkingDay,
  lienAmount,
  otherPurpose,
  intRate,
  per,
  bankCode,
  benAcct,
  fee,
  facilityType,
  sourceFunds,
}) => {
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

  const [lienPercencate, setLienPercentage] = useState();
  // const [lienAmount, setLienAmount] = useState();

  const [insurancePercentage, setInsurancePercentage] = useState();
  const [insuranceAmount, setInsuranceAmount] = useState();

  const [processingFeePercentage, setProcessingFeePercentage] = useState();
  const [processingFeeAmount, setProcessingFeeAmount] = useState();

  var chargeArr = [
    [
      <div>
        <InputField
          inputWidth={"100%"}
          disabled
          value={"Lien on Loan"}
          margin={"0px"}
        />
      </div>,
      <div>
        <InputField
          inputWidth={"100%"}
          value={per ? parseFloat(per).toFixed(2) : ""}
          textAlign={"right"}
          disabled
          margin={"0px"}
        />
      </div>,
      <div>
        <InputField
          inputWidth={"100%"}
          value={lienAmount === "NaN" ? "" : lienAmount}
          disabled
          textAlign={"right"}
          margin={"0px"}
        />
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
          // boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          backgroundColor: "white",
          borderRadius: "5px",
          border: "2px solid #cbd4d8",
        }}
      >
        <div>
          <HeaderComponent
            title={facilityType === "16" ? "Loan Details" : "Overdraft Details"}
            // backgroundColor={"#AFE1AF7A"}
          />
        </div>
        {facilityType === "16" ? (
          <div>
            <InputField
              label={"Loan Product"}
              labelWidth={"30%"}
              inputWidth={"50%"}
              disabled
              value={loanProduct === "null" ? "" : loanProduct}
            />
          </div>
        ) : (
          <div>
            <InputField
              label={"Source of Payment"}
              labelWidth={"30%"}
              inputWidth={"50%"}
              value={sourceFunds}
              disabled
            />
          </div>
        )}
        {/* <div style={{}}>
          <InputField
            label={"Facility Type Category"}
            labelWidth={"30%"}
            inputWidth={"50%"}
            disabled
          />
        </div> */}
        <div style={{}}>
          <InputField
            label={"Requested Amount"}
            labelWidth={"30%"}
            inputWidth={"20%"}
            disabled
            textAlign={"right"}
            value={requestedAmount === "NaN" ? "" : requestedAmount}
          />
        </div>

        <div style={{}}>
          <InputField
            label={"Intro Source"}
            labelWidth={"30%"}
            inputWidth={"50%"}
            value={
              introSource === "001"
                ? "LOAN SALES AGENT"
                : introSource === "002"
                ? "STAFF"
                : introSource === "003"
                ? "RADIO/TV/NEWSPAPERS"
                : introSource === "004"
                ? "FRIENDS"
                : introSource === "005"
                ? "RELATIVES"
                : ""
            }
            disabled
          />
        </div>
        <div style={{}}>
          <InputField
            label={"Dealer Code"}
            labelWidth={"30%"}
            inputWidth={"50%"}
            disabled
            value={dealerCode === "null" ? "" : dealerCode}
          />
        </div>
        <div style={{}}>
          <InputField
            label={"Purpose"}
            labelWidth={"30%"}
            inputWidth={"50%"}
            value={purpose === "null" ? "" : purpose}
            disabled
          />
        </div>
        <div style={{}}>
          <TextAreaField
            label={"Other Purpose"}
            labelWidth={"31.5%"}
            disabled
            value={otherPurpose === "null" ? "" : otherPurpose}
            cols={50}
          />
        </div>

        <div style={{}}>
          <InputField
            label={"Sector"}
            labelWidth={"30%"}
            inputWidth={"50%"}
            value={sector === "null" ? "" : sector}
            disabled
          />
        </div>
        <div style={{}}>
          <InputField
            label={"Sub Sector"}
            labelWidth={"30%"}
            inputWidth={"50%"}
            disabled
            value={subSector === "null" ? "" : subSector}
          />
        </div>
        {/* <div style={{}}>
          <InputField
            label={"Sales/Intro Staff"}
            labelWidth={"30%"}
            inputWidth={"50%"}
            disabled
          />
        </div> */}

        <div style={{}}>
          <InputField
            label={"Moratorium Period"}
            labelWidth={"30%"}
            inputWidth={"10%"}
            disabled
            value={moratoriumPeriod === "null" ? "" : moratoriumPeriod}
            textAlign={"center"}
          />
        </div>
        <div style={{}}>
          <InputField
            label={"With Interest"}
            labelWidth={"30%"}
            inputWidth={"10%"}
            disabled
            value={
              withInt === "null"
                ? ""
                : withInt === "N"
                ? "NO"
                : withInt === "Y"
                ? "YES"
                : ""
            }
            textAlign={"center"}
          />
        </div>
        <div style={{}}>
          <InputField
            label={"Bank Code"}
            labelWidth={"30%"}
            inputWidth={"50%"}
            disabled
            value={bankCode === "null" ? "" : bankCode}
          />
        </div>
        <div style={{}}>
          <InputField
            label={"Beneficiary Account"}
            labelWidth={"30%"}
            inputWidth={"50%"}
            disabled
            value={benAcct === "null" ? "" : benAcct}
          />
        </div>
        {/* <div
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
                {/* <ButtonComponent
                  label={"Add"}
                  // buttonBackgroundColor={"black"}
                  background={selectedOption === "02" ? "grey" : "#6faf5e"}
                  buttonHeight={"29px"}
                  buttonWidth={"80px"}
                  buttonColor={"white"}
                  disabled={selectedOption === "02"}
                /> */}
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}
        {/* <div></div> */}
        {/* </div> */}

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
          border: "2px solid #d6d7d9",
          // boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          backgroundColor: "white",
          borderRadius: "5px",
          // border: "1px solid #cbd4d8",
        }}
      >
        {/* <div style={{ borderBottom: "1px solid" }}>
            <h6>Loan Plan</h6>
          </div> */}
        <div>
          <HeaderComponent
            title={facilityType === "16" ? "Loan Plan" : "Overdraft Plan"}
          />
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
              labelWidth={"64.8%"}
              inputWidth={"30%"}
              disabled
              value={intRate ? (intRate / tenorInMonths).toFixed(4) : ""}
              textAlign={"right"}
            />
          </div>
          <div style={{ flex: 0.32 }}>
            <InputField
              inputWidth={"59%"}
              disabled
              value={intRate ? parseFloat(intRate).toFixed(2) : ""}
              textAlign={"right"}
            />
          </div>
        </div>
        <div style={{ marginTop: "-16px" }}>
          <InputField
            label={"Tenor (Months)"}
            labelWidth={"44%"}
            inputWidth={"20.5%"}
            disabled
            value={tenorInMonths === "null" ? "" : tenorInMonths}
            textAlign={"center"}
          />
        </div>
        <div style={{}}>
          <InputField
            label={"Interest Type"}
            labelWidth={"44%"}
            inputWidth={"43%"}
            disabled
            value={interestType === "null" ? "" : interestType}
            // textAlign={"center"}
          />
        </div>
        <div style={{}}>
          <InputField
            label={"Principal Repay Freq."}
            labelWidth={"44%"}
            inputWidth={"43%"}
            disabled
            value={
              principalRepaymentFrequency === "null"
                ? ""
                : principalRepaymentFrequency
            }
            // textAlign={"center"}
          />
        </div>
        <div style={{}}>
          <InputField
            label={"Interest Repay Freq."}
            labelWidth={"44%"}
            inputWidth={"43%"}
            disabled
            value={
              interestRepaymentFrequency === "null"
                ? ""
                : interestRepaymentFrequency
            }
            // textAlign={"center"}
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
              labelWidth={"64.8%"}
              inputWidth={"30%"}
              disabled
              value={
                principalRepaymentCount === "null"
                  ? ""
                  : principalRepaymentCount
              }
              textAlign={"center"}
            />
          </div>
          <div style={{ flex: 0.32 }}>
            <InputField
              inputWidth={"59%"}
              disabled
              value={
                interestRepaymentCount === "null" ? "" : interestRepaymentCount
              }
              textAlign={"center"}
            />
          </div>
        </div>
        {selectedOption !== "169879" ? (
          <div style={{}}>
            <InputField
              label={"Apply Exempt Months"}
              labelWidth={"44%"}
              inputWidth={"20.5%"}
              disabled
              value={
                exemptMonth === "null"
                  ? ""
                  : exemptMonth === "N"
                  ? "NO"
                  : exemptMonth === "Y"
                  ? "YES"
                  : ""
              }
              textAlign={"center"}
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
            inputWidth={"20.5%"}
            disabled
            value={
              lastWorkingDay === "null"
                ? ""
                : lastWorkingDay === "N"
                ? "NO"
                : lastWorkingDay === "Y"
                ? "YES"
                : ""
            }
            textAlign={"center"}
          />
        </div>

        <div className="mt-1">
          <HeaderComponent
            title={facilityType === "16" ? "Loan Fees" : "Overdraft Fees"}
          />
        </div>
        <div style={{ zoom: 0.9 }}>
          {/* <DataTable columns={["Charges", "%", "Fee Amount"]} /> */}
          <CustomTable
            headers={["Charges", "%", "Fee Amount"]}
            data={fee}
            style={{ headerAlignLeft: [1], headerAlignRight: [3] }}
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralApp;
