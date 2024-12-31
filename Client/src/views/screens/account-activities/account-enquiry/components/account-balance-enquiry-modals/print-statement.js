import React, { useEffect, useState, useRef } from "react";
import CustomTable from "../../../../control-setups/components/CustomTable";
import axios from "axios";
import { API_SERVER } from "../../../../../../config/constant";
import Header from "../../../../../../components/others/Header/Header";
import { FiX } from "react-icons/fi";
import InputField from "../../../../../../components/others/Fields/InputField";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import { useReactToPrint } from "react-to-print";
import coop from "../../../../../../assets/coop.png";
import "../../../account-enquiry/customer-search.css";

function PrintStatement({balanceBroughtForward,fn,accountNumber, personalDetails ,data,stateOne}) {

  function formattedNumber(num) {
    if (num === undefined || num === " " || isNaN(num) || num === "0.00" || num === ".00" || num === "0" || num === "") {
      return "";
    } else {
      const numberString = num.toString();
      const decimalIndex = numberString.indexOf('.');
  
      if (decimalIndex === -1  ) {
        // Number has no decimal places
        const formatted = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
        return formatted;
      } else {
        // Number has decimal places, format the whole number
        const integerPart = numberString.substr(0, decimalIndex);
        const decimalPart = numberString.substr(decimalIndex);
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return formattedInteger + decimalPart;
      }
    }
  }

  // states
  let finalData = []
//   const [finalData, setFinalData] = useState([]);
  const [reportsData, setReportsData] = useState([]);

  // print functionality
  const componentRef = useRef();

  // local storage
  var branch = JSON.parse(localStorage.getItem("userInfo")).branch;

  // Current date and time
  const [currentDate, setCurrentDate] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString();
    setCurrentDate(formattedDate);

    axios
      .post(
        API_SERVER + "/api/loan-general-enquiry-get-customer-personal-details",
        {
          customer_number: personalDetails?.customer_number,
        },
        { headers: headers }
      )
      .then(function (response) {
        setAddress(response.data[0]);
        console.log(response.data, "resiTorsu");
      })
      .catch((err) => console.log(err));
  }, []);

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

  // number formatter
  function formatNumber(num) {
    if (num === undefined || num === "") {
      return " ";
    } else {
      const formatted =
        num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
      return formatted;
    }
  }

  var printStatementHeaders = [
    "Posting Date",
    "Value Date",
    "Transaction Details",
    "Document Reference",
    "Debit",
    "Credit",
    "Balance"
  ];

  //headers
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/loan-general-enquiry-print-schedule",
        {
          facility_no: fn,
        },
        {
          headers: headers,
        }
      )
      .then(function (response) {
        setReportsData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  let totalPrincipalDueValue = 0;
  let totalInterestDueValue = 0;
  let totalRepaymentAmountValue = 0;

  var prin = reportsData.map((i) => {
    const principalDueValue = parseFloat(i?.principal_due);
    const interestDueValue = parseFloat(i?.interest_due);
    const repaymentAmountValue = parseFloat(i?.repayment_amount);

    // Add the values to the totals if they are not NaN
    if (!isNaN(principalDueValue)) {
      totalPrincipalDueValue += principalDueValue;
    }
    if (!isNaN(interestDueValue)) {
      totalInterestDueValue += interestDueValue;
    }
    if (!isNaN(repaymentAmountValue)) {
      totalRepaymentAmountValue += repaymentAmountValue;
    }

    console.log(balanceBroughtForward,"gogogmi")
    
    return [
      <div>{i?.repay_seq_no}</div>,
      <div>{formatDate(i?.repayment_date)}</div>,
      <div>
        {formatDate(i?.presentation_date) ===
        "INVALID DATE-Invalid Date-Invalid Date"
          ? ""
          : formatDate(i?.presentation_date)}
      </div>,
      <div>{formatNumber(parseInt(i?.principal_due))}</div>,
      <div>{formatNumber(parseInt(i?.interest_due))}</div>,
      <div>{formatNumber(parseInt(i?.repayment_amount))}</div>,
    ];
  });

  prin.push([
    <div></div>,
    <div></div>,
    <div
      style={{
        height: "40px",
        display: "grid",
        placeItems: "center",
        fontWeight: "700",
        textDecoration: "underline",
      }}
    >
      Total:
    </div>,
    <div
      style={{
        backgroundColor: "#a8ffcf",
        height: "40px",
        display: "grid",
        placeItems: "center",
        fontWeight: "700",
        borderRadius: "5px",
      }}
    >
      {formatNumber(totalPrincipalDueValue)}
    </div>,
    <div
      style={{
        backgroundColor: "#a8ffcf",
        height: "40px",
        display: "grid",
        placeItems: "center",
        fontWeight: "700",
        borderRadius: "5px",
      }}
    >
      {formatNumber(totalInterestDueValue)}
    </div>,
    <div
      style={{
        backgroundColor: "#a8ffcf",
        height: "40px",
        display: "grid",
        placeItems: "center",
        fontWeight: "700",
        borderRadius: "5px",
      }}
    >
      {formatNumber(totalRepaymentAmountValue)}
    </div>,
  ]);

  // print
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  data.map((i)=>{finalData.push([i[0],i[1],i[2],i[3],i[5],i[6],i[7]])})
    console.log(finalData,"finalData")

  return (
    <div style={{ zoom: 0.7 }}>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "10px" }}
      >
        <ButtonComponent
          label={"Print Report"}
          // buttonWidth={"100px"}
          onClick={handlePrint}
          buttonHeight={"40px"}
          buttonWidth={"200px"}
        />
      </div>

      {/* body of report */}
      <div ref={componentRef}>
        <div
          className="space-y-4"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          <div></div>
          <div className="space-y-2 mr-4">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src={coop} alt="Coop Tech" style={{ height: "80px" }} />
            </div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: "800",
              }}
            >
              COOPTECH
            </div>

            <div
              style={{
                fontSize: "15px",
                textDecoration: "capitalize",
              }}
            >
              Branch : {stateOne.branch}
            </div>
            <div
              style={{
                fontSize: "15px",
                textDecoration: "capitalize",
              }}
            >
              Currency : {stateOne.currency}
            </div>

            <div style={{ fontSize: "15px" }}>
              Run Date: {formatDate(currentDate)}
            </div>
          </div>
        </div>
        <hr />
        <br />

        <div
          style={{display: "flex",marginBottom: "10px",justifyContent: "space-between"}}
        >
            <div style={{display:"flex",flex:1}}>
            <div style={{flex:0.02}}></div>
            <div style={{flex:0.96}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",rowGap:"15px",padding:"0px 5px 10px 5px"}}>
        <InputField
              label="Account Name  :"
              labelWidth={"25%"}
              inputWidth={"50%"}
              value={stateOne.description}
              id={"description"}
              readOnly
            />
            <InputField
              label="Book Balance  :"
              labelWidth={"45%"}
              inputWidth={"40%"}
              value={formattedNumber(stateOne.availableBalance)}
              readOnly
              id={"description"}
            />
        <InputField
              label="Account Number  :"
              labelWidth={"25%"}
              inputWidth={"50%"}
              value={accountNumber}
              readOnly
              id={"description"}
            />
            <InputField
              label="Uncleared Balance  :"
              labelWidth={"45%"}
              inputWidth={"40%"}
              value={stateOne.unclearedBalance}
              id={"description"}
            //   value={personalDetails?.customer_number}
              readOnly
            />
             <InputField
              label="Product  :"
              labelWidth={"25%"}
              inputWidth={"50%"}
              value={stateOne.product}
              id={"description"}
            //   value={personalDetails?.name}
              readOnly
            />
        {/* <InputField
              label="Branch"
              labelWidth={"20%"}
              inputWidth={"50%"}
            //   value={personalDetails?.name}
              readOnly
            /> */}
            <InputField
              label="Cleared Balance  :"
              labelWidth={"45%"}
              inputWidth={"40%"}
              value={formattedNumber(stateOne.clearedBalance)}
              id={"description"}
            //   value={personalDetails?.customer_number}
              readOnly
            />
            {/* <div></div>
            <InputField
             label={"Balance Brought Forward :"}
              labelWidth={"45%"}
              inputWidth={"40%"}
              value={formattedNumber(balanceBroughtForward)}
              id={"description"}
            //   value={personalDetails?.customer_number}
              readOnly
            /> */}
            {/* <InputField
              label="Cleared Balance"
              labelWidth={"35%"}
              inputWidth={"65%"}
            //   value={personalDetails?.customer_number}
              readOnly
            /> */}
        </div>
            </div>
            <div style={{flex:0.02}}></div>
      
          {/* <div className="space-y-4" style={{ flex: 0.45 }}>
            <InputField
              label="Client Name"
              labelWidth={"35%"}
              inputWidth={"40%"}
              value={personalDetails?.name}
              readOnly
            />
            <InputField
              label="Customer Number"
              labelWidth={"35%"}
              inputWidth={"40%"}
              value={personalDetails?.customer_number}
              readOnly
            />
            <InputField
              label="Address"
              labelWidth={"35%"}
              inputWidth={"40%"}
              value={address?.residential_address}
              readOnly
            />
            <InputField
              label="Fees Description"
              labelWidth={"35%"}
              inputWidth={"40%"}
              readOnly
            />
            <InputField
              label="Amount"
              readOnly
              labelWidth={"35%"}
              inputWidth={"40%"}
            />
          </div> */}
          {/* <div
            className="space-y-4 pb-5"
            style={{
              flex: 0.45,
              border: "1px solid grey",
              borderRadius: "5px",
              marginRight: "10px",
            }}
          >
            <div style={{ textAlign: "center", marginTop: "5px" }}>
              {personalDetails?.description}
            </div>
            <InputField
              label="Loan ID"
              labelWidth={"35%"}
              inputWidth={"40%"}
              value={fn}
              readOnly
              textAlign={"right"}
            />
            <InputField
              label="Date"
              labelWidth={"35%"}
              inputWidth={"40%"}
              textAlign={"right"}
              value={formatDate(personalDetails?.effective_date)}
              readOnly
            />
            <InputField
              label="Loan Amount"
              labelWidth={"35%"}
              inputWidth={"40%"}
              textAlign={"right"}
              value={formatNumber(parseInt(totalPrincipalDueValue))}
              readOnly
            />
            <InputField
              label="Interest Rate (P.A)"
              labelWidth={"35%"}
              inputWidth={"40%"}
              textAlign={"right"}
              value={
                formatNumber(parseInt(personalDetails?.interest_rate)) + "%"
              }
              readOnly
            />
            <InputField
              label="Interest Calculation"
              labelWidth={"35%"}
              inputWidth={"40%"}
              textAlign={"right"}
              value={personalDetails?.interest_type}
              readOnly
            />
            <InputField
              label="Amount Disbursed "
              labelWidth={"35%"}
              inputWidth={"40%"}
              textAlign={"right"}
              value={formatNumber(parseInt(totalPrincipalDueValue))}
              readOnly
            />
            <InputField
              label="Total Interest"
              labelWidth={"35%"}
              inputWidth={"40%"}
              textAlign={"right"}
              value={formatNumber(parseInt(totalInterestDueValue))}
              readOnly
            />
          </div> */}
           </div>
        </div>
        <hr />
        {/* table */}
        <div style={{display:"flex",justifyContent:"flex-end",padding:"10px 0px 10px 0px"}}>
                <div style={{display:"flex",flex:0.56}}></div>
                <div style={{display:"flex",flex:0.43}}>
              <InputField
                        label={"Balance Brought Forward :"}
                        labelWidth={"75%"}
                        inputWidth={"25%"}
                        value={formattedNumber(balanceBroughtForward)}
                        textAlign={"right"}
                        id={"description"}
                        readOnly
                      />
                  </div>
                  <div style={{display:"flex",flex:0.01}}></div>
              </div>
        <div className="px-2">
          <CustomTable rowsPerPage={13} headers={printStatementHeaders} data={finalData} />
        </div>
      </div>
    </div>
  );
}

export default PrintStatement;
