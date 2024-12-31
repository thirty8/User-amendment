import React, { useEffect, useState } from "react";
import Header from "../../../../components/others/Header/Header";
import InputField from "../../../../components/others/Fields/InputField";
import { API_SERVER } from "../../../../config/constant";
import axios from "axios";

function LoanTerms({ principal_account }) {
  // headers
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  // states
  const [loanSetup, setLoanSetup] = useState([]);

  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/loan-general-enquiry-loan-setup",
        {
          principal_acct: principal_account,
        },
        {
          headers,
        }
      )
      .then(function (response) {
        console.log(response.data[0], "cpp");
        setLoanSetup(response.data[0], "cpp");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ zoom: 0.9 }}>
      <div
        style={{
          border: "1px solid grey",
          padding: "5px",
          paddingBottom: "10px",
        }}
      >
        <Header title={"Status"} headerShade />
        <div className="d-flex flex space-x-4 space-y-4 px-2">
          <InputField
            disabled
            label="Facility Status"
            labelWidth={"30"}
            inputWidth={"50%"}
            value={loanSetup?.loan_status}
          />

          <InputField
            disabled
            label="Status Start Date"
            labelWidth={"30"}
            inputWidth={"50%"}
            value={
              loanSetup?.f_status_sdate === "null"
                ? ""
                : loanSetup?.f_status_sdate
            }
          />

          <InputField
            disabled
            label="Status End Date"
            labelWidth={"30"}
            inputWidth={"50%"}
            value={
              loanSetup?.f_status_edate === "null"
                ? ""
                : loanSetup?.f_status_edate
            }
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          marginTop: "10px",
          marginBottom: "100px",
        }}
      >
        <div
          style={{
            flex: 0.5,
            marginRight: "15px",
            border: "1px solid grey",
            padding: "5px",
            paddingBottom: "10px",
          }}
          className="space-y-4"
        >
          <Header title={"Loan Setup"} headerShade />
          <div className="d-flex flex">
            <div style={{ flex: 0.5 }}>
              <InputField
                disabled
                label="Repayment A/C"
                labelWidth={"40%"}
                inputWidth={"50%"}
                value={loanSetup?.maintenance_fee_account}
              />
            </div>

            <div style={{ flex: 0.5 }}>
              <InputField
                disabled
                label="Tenor"
                labelWidth={"30%"}
                inputWidth={"50%"}
                value={loanSetup?.tenor}
              />
            </div>
          </div>

          <div style={{ flex: 0.5 }}>
            <InputField
              disabled
              label="Penal Charges On"
              labelWidth={"20%"}
              inputWidth={"50%"}
              value={loanSetup?.penal_on === "N/A" ? "" : loanSetup?.penal_on}
            />
          </div>

          <div style={{ flex: 0.5 }}>
            <InputField
              disabled
              label="Penal Rate Type"
              labelWidth={"20%"}
              inputWidth={"50%"}
              value={
                loanSetup?.penal_type === "N/A" ? "" : loanSetup?.penal_type
              }
            />
          </div>

          <div className="d-flex flex">
            <div style={{ flex: 0.5 }}>
              <InputField
                disabled
                label="Base Penalty Rate"
                labelWidth={"40%"}
                inputWidth={"50%"}
                value={loanSetup?.penal_rate}
              />
            </div>

            <div style={{ flex: 0.5 }}>
              <InputField
                disabled
                label="Effective Penalty Rate"
                labelWidth={"30%"}
                inputWidth={"50%"}
                value={loanSetup?.effective_penal_rate}
              />
            </div>
          </div>
        </div>
        {/* right side */}
        <div
          style={{
            flex: 0.5,
            border: "1px solid grey",
            padding: "5px",
            paddingBottom: "10px",
          }}
          className="space-y-4"
        >
          <Header title={"Others"} headerShade />
          <div className="d-flex flex">
            <div style={{ flex: 0.5 }}>
              <InputField
                disabled
                label="Rel. Officer"
                labelWidth={"30%"}
                inputWidth={"50%"}
                value={
                  loanSetup?.relation_officer === "null"
                    ? ""
                    : loanSetup?.relation_officer
                }
              />
            </div>

            <div style={{ flex: 0.5 }}>
              <InputField
                disabled
                label="Branch"
                labelWidth={"30%"}
                inputWidth={"50%"}
                value={loanSetup?.branchdesc}
              />
            </div>
          </div>

          <div className="d-flex flex">
            <div style={{ flex: 0.5 }}>
              <InputField
                disabled
                label="Sector"
                labelWidth={"30%"}
                inputWidth={"50%"}
                value={loanSetup?.sector_code}
              />
            </div>

            <div style={{ flex: 0.5 }}>
              <InputField
                disabled
                label="Prin Rep Plan"
                labelWidth={"30%"}
                inputWidth={"50%"}
                value={loanSetup?.repay_plan}
              />
            </div>
          </div>

          <div className="d-flex flex">
            <div style={{ flex: 0.5 }}>
              <InputField
                disabled
                label="Sub Sector"
                labelWidth={"30%"}
                inputWidth={"50%"}
                value={loanSetup?.sub_sector}
              />
            </div>

            <div style={{ flex: 0.5 }}>
              <InputField
                disabled
                label="Int Repay. Plan"
                labelWidth={"30%"}
                inputWidth={"50%"}
                value={loanSetup?.int_repay}
              />
            </div>
          </div>
          <div>
            <InputField
              disabled
              label="Interest Type"
              labelWidth={"15%"}
              inputWidth={"50%"}
              value={loanSetup?.int_type}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanTerms;
