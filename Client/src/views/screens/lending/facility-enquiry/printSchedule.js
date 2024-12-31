import React, { useEffect, useState, useRef } from "react";
import CustomTable from "../../control-setups/components/CustomTable";
import axios from "axios";
import { API_SERVER } from "../../../../config/constant";
import Header from "../../../../components/others/Header/Header";
import { FiPrinter, FiX, FiXCircle } from "react-icons/fi";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import { useReactToPrint } from "react-to-print";
import coop from "../../../../assets/coop.png";
import { Spin } from "antd";

function PrintSchedule({ fn, closeModal, setShowBg, personalDetails }) {
  // states
  const [reportsData, setReportsData] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
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
  function formatNumber(amount) {
    const formattedAmount = amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });

    const amountWithoutCurrency = formattedAmount.replace("$", "");
    return amountWithoutCurrency;
  }

  var printScheduleHeaders = [
    "#",
    "Repayment Date",
    "Presentation Date",
    "Principal Due",
    "Interest Due",
    "Installment Amt.",
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

    return [
      <div>{i?.repay_seq_no}</div>,
      <div>{formatDate(i?.repayment_date)}</div>,
      <div>
        {formatDate(i?.presentation_date) ===
        "INVALID DATE-Invalid Date-Invalid Date"
          ? ""
          : formatDate(i?.presentation_date)}
      </div>,
      <div className="text-right">
        {formatNumber(parseFloat(i?.principal_due))}
      </div>,
      <div className="text-right">
        {formatNumber(parseFloat(i?.interest_due))}
      </div>,
      <div className="text-right">
        {formatNumber(parseFloat(i?.repayment_amount))}
      </div>,
    ];
  });

  // print
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="p-2" style={{ zoom: 0.8 }}>
      <Header
        title="Loan Schedule"
        headerShade={true}
        closeIcon={<FiX size={20} />}
        handleClose={() => {
          closeModal();
          setShowBg();
        }}
      />

      <div className="flex justify-end mt-3 gap-4 mb-3 mr-3">
        <ButtonComponent
          label={"Print Report"}
          onClick={handlePrint}
          buttonHeight={"32px"}
          buttonWidth={"140px"}
          buttonBackgroundColor={"green"}
          buttonIcon={<FiPrinter />}
        />

        <ButtonComponent
          label={"Exit Report"}
          onClick={() => {
            closeModal();
            setShowBg();
          }}
          buttonHeight={"32px"}
          buttonWidth={"120px"}
          buttonBackgroundColor={"red"}
          buttonIcon={<FiXCircle />}
        />
      </div>

      <hr />

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
              Branch : {branch}
            </div>

            <div style={{ fontSize: "15px" }}>
              Run Date:{" "}
              {formatDate(currentDate) ===
              "Invalid Date-INVALID DATE-Invalid Date"
                ? ""
                : formatDate(currentDate)}
            </div>
          </div>
        </div>
        <hr />
        <br />

        {/* DETAILS OF LOAN SCHEDULE */}
        <div className="px-3">
          <div
            className="flex gap-4 justify-between px-3"
            style={{ color: "rgb(92, 92, 92)", zoom: 0.9 }}
          >
            <div className="flex">
              {/* FIRST ROW */}
              <div className="space-y-3">
                <span className="text-xl font-bold capitalize">
                  {loading ? <Spin /> : personalDetails?.name}
                </span>
                <div>
                  <span className="font-bold">Member No :</span>{" "}
                  {personalDetails?.customer_number}
                </div>

                <div>
                  <span className="font-bold">Address :</span>{" "}
                  {address?.residential_address === "null" ||
                  address?.residential_address === null
                    ? ""
                    : address?.residential_address}
                </div>
                <div className="cursor-default">
                  <span className="font-bold">Fees Description :</span>{" "}
                </div>
                <div>
                  <span className="font-bold">Amount :</span>{" "}
                </div>
              </div>
            </div>

            {/* SECOND ROW */}
            <div className="space-y-3 mt-10">
              <div>
                <span className="font-bold">Loan Id Bal. :</span> {fn}
              </div>
              <div>
                <span className="font-bold">Date :</span>{" "}
                {formatDate(personalDetails?.effective_date) === "NaN"
                  ? ""
                  : formatDate(personalDetails?.effective_date)}
              </div>
              <div>
                <span className="font-bold">Loan Amount :</span>{" "}
                {formatNumber(parseFloat(totalPrincipalDueValue)) === "NaN"
                  ? ""
                  : formatNumber(parseFloat(totalPrincipalDueValue))}
              </div>
              <div>
                <span className="font-bold">Interest Rate (P.A) :</span>{" "}
                {formatNumber(parseFloat(personalDetails?.interest_rate)) + "%"}
              </div>
            </div>

            {/* THIRD ROW */}
            <div className="space-y-3 mt-10">
              <div>
                <span className="font-bold">Interest Calc. :</span>{" "}
                {personalDetails?.interest_type}
              </div>
              <div>
                <span className="font-bold">Amount Disbursed :</span>{" "}
                {formatNumber(parseFloat(totalPrincipalDueValue))}
              </div>
              <div>
                <span className="font-bold">Total Interest :</span>{" "}
                {formatNumber(parseFloat(totalInterestDueValue))}
              </div>
              <div>
                <span className="font-bold">Suspense Penal :</span> {""}
              </div>
            </div>
          </div>
        </div>

        <br />

        {/* table */}
        <div className="px-3">
          <Header title={"Schedule"} headerShade />
          <CustomTable
            headers={printScheduleHeaders}
            data={prin}
            load={loading}
            hidePagination
            rowsPerPage={999}
          />
        </div>

        <br />

        <div
          style={{
            display: "flex",
            justifyContent: "end",
            flexDirection: "column",
          }}
        >
          <div></div>
          <div></div>
          <div
            style={{
              height: "40px",
              display: "grid",
              placeItems: "center",
              fontWeight: "700",
              textDecoration: "underline",
            }}
          >
            Total
          </div>
          <div
            style={{
              height: "40px",
              display: "grid",
              placeItems: "center",
              fontWeight: "700",
              borderRadius: "5px",
            }}
          >
            Principal Due:
            {" " + formatNumber(totalPrincipalDueValue)}
          </div>
          <div
            style={{
              height: "40px",
              display: "grid",
              placeItems: "center",
              fontWeight: "700",
              borderRadius: "5px",
            }}
          >
            Interest Due:
            {" " + formatNumber(totalInterestDueValue)}
          </div>
          <div
            style={{
              height: "40px",
              display: "grid",
              placeItems: "center",
              fontWeight: "700",
              borderRadius: "5px",
            }}
          >
            Total Repayment Amount:
            {" " + formatNumber(totalRepaymentAmountValue)}
          </div>
        </div>
      </div>

      <br />
      <hr />

      <div className="flex items-center pt-3 justify-center">
        <ButtonComponent
          label={"Print Report"}
          onClick={handlePrint}
          buttonHeight={"32px"}
          buttonWidth={"140px"}
          buttonBackgroundColor={"green"}
          buttonIcon={<FiPrinter />}
        />
      </div>
    </div>
  );
}

export default PrintSchedule;
