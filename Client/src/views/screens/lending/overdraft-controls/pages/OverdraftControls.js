import React, { useEffect, useState } from "react";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import Header from "../../../../../components/others/Header/Header";
import InputField from "../../components/fields/InputField";
import SelectField from "../../components/fields/SelectField";
import ListOfValue from "../../components/fields/ListOfValue";
import RadioButtons from "../../../../../components/others/Fields/RadioButtons";
import CustomTable from "../../../control-setups/components/CustomTable";
import ButtonType from "../../../../../components/others/Button/ButtonType";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";

function OverdraftControls() {
  // STATES AND CONSTANTS
  const [amendPenalOn, setamendPenalOn] = useState("N");
  const [amendPenalType, setamendPenalType] = useState("N");
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState([]);
  const [reviewFrequency, setReviewFrequency] = useState([]);
  const [documentSet, setDocumentSet] = useState([]);
  const [documentSetValue, setDocumentSetValue] = useState("");
  const [feesDescription, setFeesDescription] = useState([]);
  const [reviewFreqValue, setReviewFreqValue] = useState("");
  const [allowTrancheValue, setAllowTrancheValue] = useState("");
  const [writeOffAccounts, setWriteOffAccounts] = useState([]);
  const [writeOffAccountValue, setWriteOffAccountValue] = useState("");
  const [recoveryAccounts, setRecoveryAccounts] = useState([]);
  const [recoveryAccountValue, setRecoveryAccountValue] = useState("");
  const [overdraftControls, setOverdraftControls] = useState([]);
  const [excessODControls, setExcessODControls] = useState([]);
  const [feesAcct, setFeesAcct] = useState([]);
  const [currencyValue, setCurrencyValue] = useState("");
  const [formData, setFormData] = useState({
    maxTenorInMonths: "",
    maxTenorInDays: "",
    maxODAmount: "",
    warningDays: "",
    dtiRatio: "",
    collateralCoverage: "",
    noOfGuarantors: "",
    bcaGradingCorporate: "",
    minInterestTolerance: "",
    maxInterestTolerance: "",
    minScoreGrade: "",
  });

  // HEADERS
  const feesHeader = [
    <div style={{ width: "300px" }}>Fee Description</div>,
    <div>Fee Type</div>,
    <div>Fee</div>,
    <div>Min. Fee</div>,
    <div>Max. Fee</div>,
    <div>Amortize or Apply Tax</div>,
    <div style={{ width: "300px" }}>Fee Account</div>,
    <div>Fee Account Contra</div>,
  ];

  const feesHeaders = [
    <div>Fee Value</div>,
    <div>Fee Type</div>,
    <div>Fee Account</div>,
  ];

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  // FUNCTIONS
  const feeData = [
    [
      <ListOfValue lovdata={feesDescription} inputWidth={"100%"} />,
      <SelectField
        lovdata={[
          {
            label: "Fixed Amount",
            value: "A",
          },
          {
            label: "% of Amount",
            value: "P",
          },
        ]}
      />,
      <InputField inputWidth={"100%"} />,
      <InputField inputWidth={"100%"} />,
      <InputField inputWidth={"100%"} />,
      <div style={{ display: "flex" }} className="space-x-4">
        <ButtonType type={"checkbox"} label={"Amortise"} />
        <ButtonType type={"checkbox"} label={"Apply Tax"} />
      </div>,
      <ListOfValue inputWidth={"100%"} lovdata={feesAcct} />,
      <ListOfValue />,
    ],
  ];

  const feeData2 = [
    [
      <InputField
        label="Excess OD Fees"
        labelWidth={"40%"}
        inputWidth={"50%"}
        value={
          overdraftControls?.length > 0 ? overdraftControls[0]?.excess_fee : 0
        }
        textAlign={"right"}
      />,
      <div style={{ justifyContent: "center", display: "flex" }}>
        <SelectField
          lovdata={[
            {
              label: "Fixed Amount",
              value: "A",
            },
            {
              label: "% of Loan Amount",
              value: "P",
            },
          ]}
          value={overdraftControls[0]?.excess_ftype}
        />
      </div>,
      <div style={{ width: "100%" }}>
        <ListOfValue
          label="Excess OD Account"
          lovdata={excessODControls}
          value={
            overdraftControls?.length > 0
              ? overdraftControls[0]?.excess_fee_ac
              : ""
          }
          inputWidth={"100%"}
        />
      </div>,
    ],
    [
      <InputField
        label="Hold Account"
        labelWidth={"40%"}
        inputWidth={"50%"}
        value={overdraftControls[0]?.lien_fee}
        textAlign={"right"}
      />,
      <div style={{ justifyContent: "center", display: "flex" }}>
        <SelectField
          lovdata={[
            {
              label: "Fixed Amount",
              value: "A",
            },
            {
              label: "% of Loan Amount",
              value: "P",
            },
          ]}
          value={overdraftControls[0]?.lien_ftype}
        />
      </div>,
      <div style={{ width: "100%" }}>
        <SelectField
          label="Hold Amount Type"
          lovdata={[
            {
              label: "Move to Cash Collateral Account",
              value: "01",
            },

            {
              label: "Block Hold Amount as Lien",
              value: "02",
            },
          ]}
          inputWidth="50%"
          value={overdraftControls[0]?.lien_type}
        />
      </div>,
    ],
  ];

  // FORMAT NUMBER
  function formatNumber(num) {
    if (isNaN(num)) {
      return "";
    }
    const formatted = num.toLocaleString("en-US", { minimumFractionDigits: 2 });

    return formatted;
  }

  // EFFECTS
  useEffect(() => {
    // GET CURRENCY
    axios
      .get(API_SERVER + "/api/get-currency", { headers: headers })
      .then(function (response) {
        setCurrency(response.data);
      })
      .catch((err) => console.log(err));

    // GET DOCUMENT SET
    axios
      .get(API_SERVER + "/api/get-document-set", { headers: headers })
      .then(function (response) {
        setDocumentSet(response.data);
      })
      .catch((err) => console.log(err));

    // GET FREQUENCIES
    axios
      .post(
        API_SERVER + "/api/get-code-details",
        { code: "LRP" },
        { headers: headers }
      )
      .then(function (response) {
        setReviewFrequency(response.data);
      })
      .catch((err) => console.log(err));

    // GET FEE DESCRIPTION
    axios
      .get(API_SERVER + "/api/get-fee-description", { headers: headers })
      .then(function (response) {
        setFeesDescription(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // FUNCTIONS
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // WRITE OFF ACCTS
  const getWriteOffAccounts = (value) => {
    axios
      .post(
        API_SERVER + "/api/get-write-off-acct",
        { currencyCode: value },
        { headers: headers }
      )
      .then(function (response) {
        setWriteOffAccounts(response.data);
      })
      .catch((err) => console.log(err));
  };

  const getRecoveryAccounts = (value) => {
    axios
      .post(
        API_SERVER + "/api/get-recovery-acct",
        { currencyCode: value },
        { headers: headers }
      )
      .then(function (response) {
        setRecoveryAccounts(response.data);
      })
      .catch((err) => console.log(err));
  };

  const getOverdraftControls = (value) => {
    axios
      .post(
        API_SERVER + "/api/get-overdraft-controls",
        { currencyCode: value },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response.data, "overD Controls");
        setOverdraftControls(response.data);
      })
      .catch((err) => console.log(err));
  };

  // GET EXCESS OD ACCOUNTS
  const getExcessODAccounts = (value) => {
    axios
      .post(
        API_SERVER + "/api/get-excess-od-accts",
        { currencyCode: value },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response.data, "overD Controls");
        setExcessODControls(response.data);
      })
      .catch((err) => console.log(err));
  };

  // GET FEES ACCOUNTS
  const getFeesAccounts = (value) => {
    axios
      .post(
        API_SERVER + "/api/get-fees-acct",
        { currencyCode: value },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response.data, "overD Controls");
        setFeesAcct(response.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ marginBottom: "50px" }}>
      <ActionButtons
        displayAuthorise={"none"}
        displayCancel={"none"}
        displayDelete={"none"}
        displayHelp={"none"}
        displayReject={"none"}
        displayView={"none"}
        displayRefresh={"none"}
        onNewClick={() => {
          setDocumentSetValue("");
          setReviewFreqValue("");
          setAllowTrancheValue("");
          setWriteOffAccountValue("");
          setRecoveryAccountValue("");
          setamendPenalOn("");
          setamendPenalType("");
          setFormData({
            maxTenorInMonths: "",
            maxTenorInDays: "",
            maxODAmount: "",
            warningDays: "",
            dtiRation: "",
            collateralCoverage: "",
            noOfGuarantors: "",
            bcaGradingCorporate: "",
            minInterestTolerance: "",
            maxInterestTolerance: "",
            minScoreGrade: "",
          });
          setOverdraftControls([]);
          setCurrencyValue("");
        }}
      />
      <br />

      <Header title={"Overdraft Controls"} headerShade />
      <br />

      <ListOfValue
        lovdata={currency}
        label={"Currency"}
        labelWidth={"40%"}
        inputWidth={"20%"}
        onChange={(value) => {
          getWriteOffAccounts(value);
          getRecoveryAccounts(value);
          getOverdraftControls(value);
          getExcessODAccounts(value);
          getFeesAccounts(value);
          setCurrencyValue(value);
        }}
        value={currencyValue}
      />

      {/* OVERDRAFT OTHERS */}
      <div style={{ border: "1px solid #bfbfbf", borderRadius: "4px" }}>
        <Header title={"Overdraft Others"} headerShade />

        <div style={{ display: "flex" }}>
          <div className="space-y-4" style={{ flex: 0.5 }}>
            <InputField
              label={"Maximum Tenor (In Months)"}
              required
              labelWidth={"40%"}
              inputWidth={"50%"}
              name={"maxTenorInMonths"}
              onChange={handleChange}
              value={
                overdraftControls?.length > 0
                  ? overdraftControls[0]?.maturity_period
                  : ""
              }
              textAlign={"right"}
            />

            <SelectField
              label={"Allow Tranche Overdraft"}
              labelWidth={"40%"}
              inputWidth={"50%"}
              lovdata={[
                {
                  label: "Yes",
                  value: "Y",
                },
                {
                  label: "No",
                  value: "N",
                },
              ]}
              onChange={(value) => setAllowTrancheValue(value)}
              value={
                overdraftControls?.length > 0
                  ? overdraftControls[0]?.allow_tranche
                  : ""
              }
            />

            <ListOfValue
              label={"Review Frequency"}
              labelWidth={"40%"}
              inputWidth={"50%"}
              lovdata={reviewFrequency}
              onChange={(value) => setReviewFreqValue(value)}
              value={
                overdraftControls?.length > 0
                  ? overdraftControls[0]?.review_freq
                  : ""
              }
            />

            <InputField
              label={"(DTI) Ratio (%)"}
              labelWidth={"40%"}
              inputWidth={"50%"}
              onChange={handleChange}
              name={"dtiRatio"}
              value={
                overdraftControls?.length > 0
                  ? overdraftControls[0]?.dti_ratio
                  : ""
              }
              textAlign={"right"}
            />
          </div>

          <div className="space-y-4" style={{ flex: 0.5 }}>
            <InputField
              label={"Maximum Temporary OD Tenor (In Days)"}
              required
              labelWidth={"40%"}
              inputWidth={"50%"}
              onChange={handleChange}
              name={"maxTenorInDays"}
              textAlign={"right"}
              value={
                overdraftControls?.length > 0
                  ? overdraftControls[0]?.recession_days
                  : ""
              }
            />

            <InputField
              label={"Max. Temporary OD Amount"}
              labelWidth={"40%"}
              required
              inputWidth={"50%"}
              onChange={handleChange}
              name={"maxODAmount"}
              textAlign={"right"}
              value={
                overdraftControls?.length > 0
                  ? formatNumber(
                      parseFloat(overdraftControls[0]?.max_tod_amount)
                    )
                  : ""
              }
            />

            <InputField
              label={"Warning Days"}
              labelWidth={"40%"}
              inputWidth={"50%"}
              onChange={handleChange}
              name={"warningDays"}
            />

            <InputField
              label={"Collateral Coverage"}
              labelWidth={"40%"}
              inputWidth={"50%"}
              onChange={handleChange}
              name={"collateralCoverage"}
              textAlign={"right"}
              value={
                overdraftControls?.length > 0
                  ? formatNumber(
                      parseFloat(overdraftControls[0]?.collateral_coverage)
                    )
                  : ""
              }
            />

            <InputField
              label={"No. Of Guarantors Required"}
              labelWidth={"40%"}
              inputWidth={"50%"}
              onChange={handleChange}
              name={"noOfGuarantors"}
              value={
                overdraftControls?.length > 0
                  ? overdraftControls[0]?.no_of_guarators
                  : ""
              }
            />
          </div>
        </div>
      </div>
      <br />

      {/* LENDING RULE & REQUIREMENTS */}
      <div style={{ border: "1px solid #bfbfbf", borderRadius: "4px" }}>
        <Header title={"LENDING RULE & REQUIREMENTS"} headerShade />

        <div style={{ display: "flex" }}>
          <div className="space-y-4" style={{ flex: 0.5 }}>
            <InputField
              label={"BCA Grading Corporate"}
              labelWidth={"50%"}
              inputWidth={"50%"}
              name={"bcaGradingCorporate"}
              onChange={handleChange}
              textAlign={"right"}
              value={
                overdraftControls?.length > 0
                  ? overdraftControls[0]?.bca_grade
                  : ""
              }
            />

            <InputField
              label={"Min. Interest Tolerance (%)"}
              labelWidth={"50%"}
              inputWidth={"50%"}
              name={"minInterestTolerance"}
              onChange={handleChange}
              textAlign={"right"}
              value={
                overdraftControls?.length > 0
                  ? formatNumber(
                      parseFloat(overdraftControls[0]?.min_int_tolerance)
                    )
                  : ""
              }
            />

            <InputField
              label={"Max. Interest Tolerance (%)"}
              labelWidth={"50%"}
              inputWidth={"50%"}
              name={"maxInterestTolerance"}
              onChange={handleChange}
              textAlign={"right"}
              value={
                overdraftControls?.length > 0
                  ? formatNumber(
                      parseFloat(overdraftControls[0]?.max_int_tolerance)
                    )
                  : ""
              }
            />
          </div>

          <div className="space-y-4" style={{ flex: 0.2 }}>
            <div style={{ display: "flex" }}>
              <InputField inputWidth={"100%"} />
              <InputField inputWidth={"100%"} />
            </div>
          </div>

          <div className="space-y-4" style={{ flex: 0.5 }}>
            <InputField
              label={"Min Score Grade (Indv.)"}
              labelWidth={"28%"}
              inputWidth={"50%"}
              name={"minScoreGrade"}
              onChange={handleChange}
              textAlign={"right"}
              value={
                overdraftControls?.length > 0
                  ? overdraftControls[0]?.required_grade
                  : ""
              }
            />

            <ListOfValue
              label={"Document Set"}
              labelWidth={"28%"}
              inputWidth={"50%"}
              lovdata={documentSet}
              value={
                overdraftControls?.length > 0
                  ? overdraftControls[0]?.document_set
                  : ""
              }
              onChange={(value) => setDocumentSetValue(value)}
            />
          </div>
        </div>
      </div>

      <br />

      {/* PENAL AMENDMENT */}
      <div
        style={{ border: "1px solid #bfbfbf", borderRadius: "4px" }}
        className="space-y-4"
      >
        <Header title={"PENAL AMENDMENT"} headerShade />

        <div style={{ display: "flex" }}>
          <div style={{ flex: 0.4 }} className="space-y-4">
            <RadioButtons
              labelWidth={"60%"}
              label={"Amend Penal On"}
              radioLabel={"Enable"}
              radioLabel2={"Disable"}
              display={true}
              display2={true}
              radioButtonsWidth={"50%"}
              name={"amendPenal"}
              value={"Y"}
              value2={"N"}
              checked={overdraftControls[0]?.am_penal_on === "Y"}
              checked2={overdraftControls[0]?.am_penal_on === "N"}
              onChange={(e) => setamendPenalOn(e.target.value)}
            />

            <RadioButtons
              labelWidth={"60%"}
              label={"Amend Penal Type"}
              radioLabel={"Enable"}
              radioLabel2={"Disable"}
              display={true}
              display2={true}
              radioButtonsWidth={"50%"}
              name={"amendPenal2"}
              value={"Y"}
              value2={"N"}
              checked={overdraftControls[0]?.am_penal_type === "Y"}
              checked2={overdraftControls[0]?.am_penal_type === "N"}
              onChange={(e) => setamendPenalType(e.target.value)}
            />
            <br />
          </div>
        </div>
      </div>
      <br />

      {/* FEES */}
      <div>
        <Header title={"FEES"} headerShade />

        <CustomTable data={feeData} load={loading} headers={feesHeader} green />
      </div>

      {/* FEES */}
      <div>
        {/* <Header title={"FEES"} headerShade /> */}

        <CustomTable
          data={feeData2}
          load={loading}
          headers={feesHeaders}
          green
        />
      </div>

      <br />

      {/* ACCOUNTS */}
      <div style={{ display: "flex" }}>
        <div style={{ flex: 0.5 }}>
          <ListOfValue
            label="Write-Off Account"
            labelWidth={"40%"}
            inputWidth={"50%"}
            lovdata={writeOffAccounts}
            value={
              overdraftControls?.length > 0
                ? overdraftControls[0]?.writeoff_acct
                : ""
            }
            onChange={(value) => setWriteOffAccountValue(value)}
          />
        </div>
        <div style={{ flex: 0.5 }}>
          <ListOfValue
            label="Recovery Account"
            labelWidth={"40%"}
            inputWidth={"50%"}
            lovdata={recoveryAccounts}
            value={overdraftControls[0]?.recovery_acct}
            onChange={(value) => setRecoveryAccountValue(value)}
          />
        </div>
      </div>

      <br />
      <br />
      <br />
    </div>
  );
}

export default OverdraftControls;
