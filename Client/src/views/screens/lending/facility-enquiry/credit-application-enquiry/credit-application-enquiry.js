import React, { useEffect, useState } from "react";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import InputField from "../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import SelectField from "../../../../../components/others/Fields/SelectField";
import Header from "../../../../../components/others/Header/Header";
import CustomTable from "../../../control-setups/components/CustomTable";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import { headers } from "../../../../../App";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import { Modal } from "@mantine/core";

function CreditApplicationEnquiry() {
  // HEADERS
  const caeHeaders = [
    <div>Application No</div>,
    <div className="text-left">Customer Name</div>,
    <div>Type</div>,
    <div className="text-right">Loan Amount</div>,
    <div>Currency</div>,
    <div>Loan Stage</div>,
    <div className="text-right">Days</div>,
    <div className="text-left">Originated By</div>,
    <div className="text-left">Loan Source</div>,
    <div>Action</div>,
  ];

  //   FUNCTIONS
  const handleRefreshClick = () => {
    setFormData({
      customer_no: "",
      customer_name: "",
      branch_code_v: "",
      loan_type_v: "",
      apprv_by_v: "",
      relation_officer_v: "",
      processing_age: "",
      num: "",
      loan_amount: "",
      app_flag: "",
      currency_v: "",
      channel: "",
      date_approved: "",
      expiry_date: "",
    });
  };

  // FUNCTIONS
  // DATE FORMATTER
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

  //   NUMBER FORMATTER
  function formatNumber(num) {
    if (isNaN(num)) {
      return "";
    }
    const formatted = num.toLocaleString("en-US", { minimumFractionDigits: 2 });

    return formatted;
  }

  //   STATES
  const [loading, setLoading] = useState(false);
  const [creditApplicationTable, setCreditApplicationTable] = useState([]);
  const [loanType, setLoanType] = useState([]);
  const [branches, setBranches] = useState([]);
  const [approvedBy, setApprovedBy] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [relativeOfficer, setRelativeOfficer] = useState([]);
  const [stages, setStages] = useState([]);
  const [approversTable, setApproversTable] = useState([]);
  const [approversModal, setApproversModal] = useState(false);
  const [approversLoading, setApproversLoading] = useState(false);
  const [formData, setFormData] = useState({
    customer_no: "",
    customer_name: "",
    currency_v: "",
    branch_code_v: "",
    loan_type_v: "",
    apprv_by_v: "",
    relation_officer_v: "",
    processing_age: "",
    num: "",
    loan_amount: "",
    app_flag: "",
    channel: "",
    date_approved: "",
    expiry_date: "",
  });

  //   APIS CONSUMPTION
  const handleCreditApplicationEnquiry = () => {
    setLoading(true);
    axios
      .post(
        API_SERVER + "/api/credit-application-enq",
        {
          customer_no: formData?.customer_no,
          customer_name: formData?.customer_name,
          branch_code: formData?.branch_code_v,
          loan_type: formData?.loan_type_v,
          apprv_by: formData?.apprv_by_v,
          relation_officer: formData?.relation_officer_v,
          processing_age: formData?.processing_age,
          num: formData?.num,
          loan_amount: formData?.loan_amount,
          app_flag: formData?.app_flag,
          currency: formData?.currency_v,
          channel: formData?.channel,
          date_approved:
            formatDate(formData?.date_approved) ===
            "Invalid Date-INV-Invalid Date"
              ? ""
              : formatDate(formData?.date_approved),
          expiry_date:
            formatDate(formData?.expiry_date) ===
            "Invalid Date-INV-Invalid Date"
              ? ""
              : formatDate(formData?.expiry_date),
        },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response.data);
        setCreditApplicationTable(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleApprovers = (loan_app_no) => {
    setApproversLoading(true);
    axios
      .post(
        API_SERVER + "/api/credit-application-approvers-data",
        { application_no: loan_app_no },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response.data);
        setApproversTable(response.data);
        setApproversLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setApproversLoading(false);
      });
  };

  const handleFetch = () => {
    handleCreditApplicationEnquiry();
  };

  useEffect(() => {
    handleCreditApplicationEnquiry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   TABLE DATA
  var credApplicationData = creditApplicationTable?.map((i) => {
    return [
      <div>{i?.loan_app_no}</div>,
      <div className="text-left">{i?.customer_name}</div>,
      <div>{i?.type_of_acct}</div>,
      <div className="text-right">{formatNumber(i?.facility_amount)}</div>,
      <div>{i?.currency}</div>,
      <div>{i?.loan_app_no}</div>,
      <div>{i?.processing_age}</div>,
      <div className="text-left">{i?.posted_by}</div>,
      <div className="text-left">{i?.channel}</div>,
      <div>
        <ButtonComponent
          label={"View Approvers"}
          buttonHeight={"30px"}
          buttonWidth={"150px"}
          onClick={() => {
            setApproversModal(true);
            handleApprovers(i?.loan_app_no);
          }}
        />
      </div>,
    ];
  });

  var approversData = approversTable?.map((i) => {
    return [
      <div>{i?.application_no}</div>,
      <div style={{ textAlign: "left" }}>{i?.from_stage}</div>,
      <div>{i?.arrived_from}</div>,
      <div>{formatDate(i?.arrival_date)}</div>,
    ];
  });

  //   EFFECT
  useEffect(() => {
    axios
      .get(API_SERVER + "/api/credit-app-loan-type-lov", { headers: headers })
      .then(function (response) {
        setLoanType(response.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(API_SERVER + "/api/credit-app-branches-lov", { headers: headers })
      .then(function (response) {
        setBranches(response.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(API_SERVER + "/api/credit-app-usernames-lov", { headers: headers })
      .then(function (response) {
        setApprovedBy(response.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(API_SERVER + "/api/credit-app-currency-lov", { headers: headers })
      .then(function (response) {
        setCurrency(response.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(API_SERVER + "/api/credit-app-stages-lov", { headers: headers })
      .then(function (response) {
        setStages(response.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(API_SERVER + "/api/credit-app-rel-off-lov", { headers: headers })
      .then(function (response) {
        setRelativeOfficer(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="mb-40">
      <ActionButtons
        displayAuthorise={"none"}
        displayCancel={"none"}
        displayHelp={"none"}
        displayDelete={"none"}
        displayReject={"none"}
        displayView={"none"}
        displayNew={"none"}
        displayOk={"none"}
        onFetchClick={handleFetch}
        onRefreshClick={handleRefreshClick}
      />
      <hr />

      <div className="flex mt-4 mb-8">
        {/* LEFT SIDE */}
        <div className="space-y-4 w-[50%]">
          <InputField
            label={"Customer Name"}
            labelWidth={"20%"}
            inputWidth={"60%"}
            value={formData?.customer_name}
            onChange={(e) => {
              setFormData({
                ...formData,
                customer_name: e.target.value,
              });
            }}
          />
          <InputField
            label={"Customer No"}
            labelWidth={"20%"}
            inputWidth={"60%"}
            value={formData?.customer_no}
            onChange={(e) => {
              setFormData({
                ...formData,
                customer_no: e.target.value,
              });
            }}
          />
          <ListOfValue
            label={"Loan Type"}
            labelWidth={"20%"}
            inputWidth={"60%"}
            data={loanType}
            value={formData?.loan_type_v}
            onChange={(value) => {
              setFormData({
                ...formData,
                loan_type_v: value,
              });
            }}
          />
          <ListOfValue
            label={"Branch"}
            labelWidth={"20%"}
            inputWidth={"60%"}
            data={branches}
            value={formData?.branch_code_v}
            onChange={(value) => {
              setFormData({
                ...formData,
                branch_code_v: value,
              });
            }}
          />
          <ListOfValue
            label={"Username"}
            labelWidth={"20%"}
            inputWidth={"60%"}
            data={approvedBy}
            value={formData?.apprv_by_v}
            onChange={(value) => {
              setFormData({
                ...formData,
                apprv_by_v: value,
              });
            }}
          />
          <ListOfValue
            label={"Currency"}
            labelWidth={"20%"}
            inputWidth={"60%"}
            data={currency}
            value={formData?.currency_v}
            onChange={(value) => {
              setFormData({
                ...formData,
                currency_v: value,
              });
            }}
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-4 w-[50%]">
          <InputField
            label={"Requested Amt"}
            labelWidth={"20%"}
            inputWidth={"60%"}
            textAlign={"right"}
            value={formData?.loan_amount}
            onChange={(e) => {
              setFormData({
                ...formData,
                loan_amount: e.target.value,
              });
            }}
          />

          <div className="flex w-full">
            <InputField
              label={"Age(Days) between"}
              labelWidth={"40%"}
              inputWidth={"50%"}
              value={formData?.processing_age}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  processing_age: e.target.value,
                });
              }}
            />
            <InputField
              label={"and"}
              labelWidth={"10%"}
              inputWidth={"50%"}
              value={formData?.num}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  num: e.target.value,
                });
              }}
            />
          </div>

          <ListOfValue
            label={"Loan Stage"}
            labelWidth={"20%"}
            inputWidth={"60%"}
            data={stages}
            value={formData?.app_flag}
            onChange={(value) => {
              setFormData({
                ...formData,
                app_flag: value,
              });
            }}
          />

          <div className="flex w-full">
            <InputField
              label={"Posting Date from"}
              labelWidth={"40%"}
              inputWidth={"50%"}
              type={"date"}
              value={formData?.date_approved}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  date_approved: e.target.value,
                });
              }}
            />
            <InputField
              label={"To"}
              labelWidth={"10%"}
              inputWidth={"50%"}
              type={"date"}
              value={formData?.expiry_date}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  expiry_date: e.target.value,
                });
              }}
            />
          </div>

          <ListOfValue
            label={"Relation Officer"}
            labelWidth={"20%"}
            inputWidth={"60%"}
            data={relativeOfficer}
            value={formData?.relation_officer_v}
            onChange={(value) => {
              setFormData({
                ...formData,
                relation_officer_v: value,
              });
            }}
          />

          <SelectField
            label={"Loan Source"}
            labelWidth={"20%"}
            inputWidth={"60%"}
            data={[
              {
                label: "G2P PAYMENT",
                value: "G2P PAYMENT",
              },
              {
                label: "HUMAN RESOURCE",
                value: "HUMAN RESOURCE",
              },
              {
                label: "SWIFT",
                value: "SWIFT",
              },
              {
                label: "BRANCH",
                value: "BRANCH",
              },
              {
                label: "STP",
                value: "STP",
              },
              {
                label: "VIRTUAL BRANCH",
                value: "VIRTUAL BRANCH",
              },
              {
                label: "RTGS",
                value: "RTGS",
              },
              {
                label: "WALLET",
                value: "WALLET",
              },
              {
                label: "MERCHANT PAYMENT",
                value: "MERCHANT PAYMENT",
              },
              {
                label: "MOBILE APP",
                value: "MOBILE APP",
              },
              {
                label: "ATM",
                value: "ATM",
              },
              {
                label: "API GATEWAY",
                value: "API GATEWAY",
              },
              {
                label: "AFRICEL",
                value: "AFRICEL",
              },
              {
                label: "SMALL WORLD",
                value: "SMALL WORLD",
              },
              {
                label: "POS",
                value: "POS",
              },
              {
                label: "PROCUREMENT",
                value: "PROCUREMENT",
              },
              {
                label: "ACH",
                value: "ACH",
              },
              {
                label: "EXPRESS BRANCH",
                value: "EXPRESS BRANCH",
              },
              {
                label: "API",
                value: "API",
              },
              {
                label: "REMITTANCE",
                value: "REMITTANCE",
              },
              {
                label: "MTN GATEWAY",
                value: "MTN GATEWAY",
              },
              {
                label: "END OF DAY PROCEDURE",
                value: "END OF DAY PROCEDURE",
              },
              {
                label: "USSD",
                value: "USSD",
              },
              {
                label: "INTERNET BANKING",
                value: "INTERNET BANKING",
              },
            ]}
            onChange={(value) => {
              setFormData({
                ...formData,
                channel: value,
              });
            }}
            value={formData?.channel}
          />
        </div>
      </div>

      <hr className="mb-4" />

      <Header headerShade title={"Credit Application Enquiry"} />

      <div style={{ zoom: 0.85 }}>
        <CustomTable
          headers={caeHeaders}
          data={credApplicationData}
          load={loading}
          rowsPerPage={10}
        />
      </div>

      <Modal
        opened={approversModal}
        onClose={() => setApproversModal(false)}
        size={"xl"}
        withCloseButton={false}
        centered
      >
        <div style={{ zoom: 0.85 }}>
          <Header title={"Facility Approvers"} headerShade />
          <CustomTable
            headers={[
              <div>Application No</div>,
              <div style={{ textAlign: "left" }}>Stage</div>,
              <div>Approved by</div>,
              <div>Approved Date</div>,
            ]}
            data={approversData}
            load={approversLoading}
          />
        </div>
      </Modal>
    </div>
  );
}

export default CreditApplicationEnquiry;
