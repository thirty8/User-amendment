import React, { useEffect, useState } from "react";
import ActionButtons from "../../../../../../components/others/action-buttons/ActionButtons";
import InputField from "../../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../../components/others/Fields/ListOfValue";
import CustomTable from "../../../../control-setups/components/CustomTable";
import axios from "axios";
import { API_SERVER } from "../../../../../../config/constant";
import Header from "../../../../../../components/others/Header/Header";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import { FiArrowRight } from "react-icons/fi";

function CreditPreDisbursementEnquiry() {
  // STATES
  const [credData, setCredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    applicantName: "",
    applicantNo: "",
    amount: "",
    actionBy: "",
  });
  const [credBranches, setCredBranches] = useState([]);
  const [credBranchesValue, setCredBranchesValue] = useState("");
  // CONSTANTS
  const creditPreDisbursementHeaders = [
    <div>App. No</div>,
    <div>Loan Type</div>,
    <div>Currency</div>,
    <div>Applicant Name</div>,
    <div>Requested Amount</div>,
    <div>Source Branch</div>,
    <div>Age</div>,
    <div>Date</div>,
    <div>Action by</div>,
    <div>Action</div>,
  ];

  // FUNCTIONS
  function formatNumberWithoutDecimals(amount) {
    const formattedAmount = amount.toLocaleString("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
    });

    const amountWithoutCurrency = formattedAmount.replace("$", "");
    return amountWithoutCurrency;
  }

  function formatNumber(num) {
    if (isNaN(num)) {
      return "";
    }
    const formatted = num.toLocaleString("en-US", { minimumFractionDigits: 2 });

    return formatted;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = date.toLocaleString("en-GB", { day: "2-digit" });
    const month = date
      .toLocaleString("en-GB", { month: "short" })
      .toUpperCase()
      .slice(0, 3);
    const year = date.toLocaleString("en-GB", { year: "numeric" });

    return `${day}-${month}-${year}`;
  }

  //   VARIABLES
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const cred = credData?.map((i) => {
    return [
      <div className="text-left">{i?.applicant_no}</div>,
      <div className="text-left">{i?.facility_type}</div>,
      <div className="text-left">{i?.currency}</div>,
      <div className="text-left">{i?.applicant_name}</div>,
      <div className="text-right">{formatNumber(parseFloat(i?.amount))}</div>,
      <div className="text-left">{i?.branch_code}</div>,
      <div className="text-right">
        {formatNumberWithoutDecimals(parseFloat(i?.age))}
      </div>,
      <div>{formatDate(i?.posting_sys_date)}</div>,
      <div className="text-left">{i?.returned_by}</div>,
      <div className="flex justify-center items-center">
        <ButtonComponent
          buttonIcon={<FiArrowRight />}
          buttonHeight={"20px"}
          buttonWidth={"40px"}
        />
      </div>,
    ];
  });

  //   FUNCTIONS
  const getCreditPreDisbursementData = () => {
    axios
      .post(
        API_SERVER + "/api/get-credit-preDisbursementData",
        {
          amount: formData?.amount,
          application_no: formData?.applicantNo,
          action_by: formData?.actionBy,
          branch: credBranchesValue,
          relation_officer: formData?.actionBy,
        },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response?.data, "CREDD");
        setCredData(response?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const getCreditPreDisbursementBranches = () => {
    axios
      .get(API_SERVER + "/api/get-credit-predisbursement-branches", {
        headers: headers,
      })
      .then(function (response) {
        setCredBranches(response?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  // EFFECTS
  useEffect(() => {
    getCreditPreDisbursementData();
    getCreditPreDisbursementBranches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4 mb-56">
      <ActionButtons
        displayAuthorise={"none"}
        displayCancel={"none"}
        displayDelete={"none"}
        displayHelp={"none"}
        displayReject={"none"}
        displayView={"none"}
        displayOk={"none"}
        onFetchClick={() => {
          getCreditPreDisbursementData();
        }}
        onNewClick={() => {
          setCredBranchesValue("");
          setFormData({
            applicantName: "",
            applicantNo: "",
            amount: "",
            actionBy: "",
          });
        }}
      />
      <hr />
      <br />
      <div className="space-y-4">
        <div className="flex">
          <InputField
            label="Applicant Name"
            labelWidth="25%"
            inputWidth="50%"
            onChange={(e) =>
              setFormData({
                ...formData,
                applicantName: e.target.value,
              })
            }
            value={formData?.applicantName}
          />
          <InputField
            label="Applicant No."
            labelWidth="15%"
            inputWidth="50%"
            onChange={(e) =>
              setFormData({
                ...formData,
                applicantNo: e.target.value,
              })
            }
            value={formData?.applicantNo}
          />
        </div>
        <div className="flex">
          <InputField
            label="Amount >"
            labelWidth="25%"
            inputWidth="50%"
            onChange={(e) =>
              setFormData({
                ...formData,
                amount: e.target.value,
              })
            }
            value={formData?.amount}
          />
          <InputField
            label="Action By"
            labelWidth="15%"
            inputWidth="50%"
            onChange={(e) =>
              setFormData({
                ...formData,
                actionBy: e.target.value,
              })
            }
            value={formData?.actionBy}
          />
        </div>

        <ListOfValue
          label="Branch"
          labelWidth="12.5%"
          inputWidth="25%"
          data={credBranches}
          onChange={(value) => {
            setCredBranchesValue(value);
          }}
          value={credBranchesValue}
        />
      </div>

      <br />

      <div style={{ zoom: 0.9 }}>
        <Header title={"F6 Pre Disbursement Enquiry"} headerShade />
        <CustomTable
          headers={creditPreDisbursementHeaders}
          data={cred}
          rowsPerPage={10}
          load={loading}
        />
      </div>
    </div>
  );
}

export default CreditPreDisbursementEnquiry;
