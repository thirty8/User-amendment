import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_SERVER } from "../../../../config/constant";
import { headers } from "../../teller-ops/teller/teller-activities";

function NewLoanTerms({ principal_account }) {
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
          headers: headers,
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
    <div style={{ color: "rgb(92, 92, 92)" }} className="px-3 py-4">
      <div className="flex items-center justify-between">
        {/* FIRST COL */}
        <div className="space-y-3 mt-4">
          <div>
            <span className="font-bold">Repayment A/C :</span>{" "}
            {loanSetup?.maintenance_fee_account}
          </div>
          <div>
            <span className="font-bold">Facility Status :</span>{" "}
            {loanSetup?.loan_status}
          </div>
          <div>
            <span className="font-bold">Status Start Date :</span>{" "}
            {loanSetup?.f_status_sdate === "null"
              ? ""
              : loanSetup?.f_status_sdate}
          </div>
          <div>
            <span className="font-bold">Status End Date :</span>{" "}
            {loanSetup?.f_status_edate === "null"
              ? ""
              : loanSetup?.f_status_edate}
          </div>
        </div>

        {/* SECOND COL */}
        <div className="space-y-3 mt-4">
          <div>
            <span className="font-bold">Tenor :</span> {loanSetup?.tenor}
          </div>
          <div>
            <span className="font-bold">Penal Charges On :</span>{" "}
            {loanSetup?.penal_on === "N/A" ? "" : loanSetup?.penal_on}
          </div>
          <div>
            <span className="font-bold">Penal Rate Type :</span>{" "}
            {loanSetup?.penal_type === "N/A" ? "" : loanSetup?.penal_type}
          </div>
          <div>
            <span className="font-bold">Base Penalty Rate :</span>{" "}
            {loanSetup?.penal_rate}
          </div>
        </div>

        {/* THIRD COL */}
        <div className="space-y-3 mt-4">
          <div>
            <span className="font-bold">Effective Penalty Rate :</span>{" "}
            {loanSetup?.effective_penal_rate}
          </div>
          <div>
            <span className="font-bold">Rel. Officer :</span>{" "}
            {loanSetup?.relation_officer === "null"
              ? ""
              : loanSetup?.relation_officer}
          </div>
          <div>
            <span className="font-bold">Sector :</span> {loanSetup?.sector_code}
          </div>
          <div>
            <span className="font-bold">Sub Sector :</span>{" "}
            {loanSetup?.sub_sector}
          </div>
        </div>

        {/* FOURTH COL */}
        <div className="space-y-3 mt-4">
          <div>
            <span className="font-bold">Interest Type :</span>{" "}
            {loanSetup?.int_type}
          </div>
          <div>
            <span className="font-bold">Branch :</span> {loanSetup?.branchdesc}
          </div>
          <div>
            <span className="font-bold">Prin. Rep Plan :</span>{" "}
            {loanSetup?.repay_plan}
          </div>
          <div>
            <span className="font-bold">Int Repay. Plan :</span>{" "}
            {loanSetup?.int_repay}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewLoanTerms;
