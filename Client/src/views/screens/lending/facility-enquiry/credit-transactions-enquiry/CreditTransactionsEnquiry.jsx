import React, { useEffect, useState } from "react";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import InputField from "../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import CustomTable from "../../../control-setups/components/CustomTable";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import Header from "../../../../../components/others/Header/Header";
import SelectField from "./../../../../../components/others/Fields/SelectField";

function CreditTransactionsEnquiry() {
  // STATES
  const [credData, setCredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [credBranches, setCredBranches] = useState([]);
  const [formData, setFormData] = useState({
    branch: "",
    globalBranch: "",
    facilityNo: "",
    customerName: "",
    principalAcct: "",
    status: "",
    transCode: "",
  });

  // CONSTANTS
  const creditHeaders = [
    <div>Facility No.</div>,
    <div>Principal Account</div>,
    <div>Description</div>,
    <div>Transaction Type</div>,
    <div>Status</div>,
    <div>Posted By</div>,
    <div>Posting Date</div>,
    <div>Approved By</div>,
    <div>App. Date</div>,
  ];

  // FUNCTIONS
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
      <div className="text-left">{i?.facility_no}</div>,
      <div className="text-left">{i?.principal_account}</div>,
      <div className="text-left">{i?.account_name}</div>,
      <div className="text-left">{i?.product}</div>,
      <div className="text-left">{i?.approval_desc}</div>,
      <div className="text-left">{i?.posted_by}</div>,
      <div>
        {formatDate(i?.posting_date) === "01-JAN-1970"
          ? ""
          : formatDate(i?.posting_date)}
      </div>,
      <div className="text-left">{i?.approved_by}</div>,
      <div>
        {formatDate(i?.approval_date) === "01-JAN-1970"
          ? ""
          : formatDate(i?.approval_date)}
      </div>,
    ];
  });

  //   FUNCTIONS
  const getCreditTransactionData = () => {
    const userinfo = JSON.parse(localStorage.getItem("userInfo"));
    const globalBranch = userinfo?.branchCode;
    setLoading(true);

    console.log(
      {
        branch: formData?.branch,
        globalBranch: globalBranch,
        facilityNo: formData?.facilityNo,
        customerName: formData?.customerName,
        principalAcct: formData?.principalAcct,
        status: formData?.status,
        transCode: formData?.transCode,
      },
      "JELL"
    );
    axios
      .post(
        API_SERVER + "/api/get-creditTransactions",
        {
          branch: formData?.branch,
          globalBranch: globalBranch,
          facilityNo: formData?.facilityNo,
          customerName: formData?.customerName,
          principalAcct: formData?.principalAcct,
          status: formData?.status,
          transCode: formData?.transCode,
        },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response?.data, "TRANSACTIONS");
        setCredData(response?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const getCreditBranches = () => {
    axios
      .get(API_SERVER + "/api/get-creditTransactions-branches", {
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
    getCreditTransactionData();
    getCreditBranches();
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
          getCreditTransactionData();
        }}
        onNewClick={() => {
          setFormData({
            branch: "",
            globalBranch: "",
            facilityNo: "",
            customerName: "",
            principalAcct: "",
            status: "",
            transactionType: "",
          });
        }}
      />
      <hr />
      <br />
      <div className="space-y-4">
        {/* FIRST ROW */}
        <div className="flex w-full">
          <div className="w-1/2">
            <InputField
              label="Facility Number"
              labelWidth="25%"
              inputWidth="50%"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  facilityNo: e.target.value,
                })
              }
              value={formData?.facilityNo}
            />
          </div>

          <div className="w-1/2">
            <InputField
              label="Principal Account"
              labelWidth="15%"
              inputWidth="50%"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  principalAccount: e.target.value,
                })
              }
              value={formData?.principalAccount}
            />
          </div>
        </div>

        {/* SECOND ROW */}
        <div className="flex w-full">
          <div className="w-1/2">
            <InputField
              label="Customer Name"
              labelWidth="25%"
              inputWidth="50%"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  customerName: e.target.value,
                })
              }
              value={formData?.customerName}
            />
          </div>

          <div className="w-1/2">
            <SelectField
              label="Status"
              labelWidth="15%"
              inputWidth="50%"
              onChange={(value) =>
                setFormData({
                  ...formData,
                  status: value,
                })
              }
              data={[
                {
                  label: "Unapproved",
                  value: "N",
                },
                {
                  label: "Approved",
                  value: "Y",
                },
                {
                  label: "Cancelled",
                  value: "C",
                },
              ]}
              value={formData?.status}
            />
          </div>
        </div>

        {/* THIRD ROW */}
        <div className="flex w-full">
          <div className="w-1/2">
            <SelectField
              label="Transaction Type"
              labelWidth="25%"
              inputWidth="50%"
              onChange={(value) =>
                setFormData({
                  ...formData,
                  transCode: value,
                })
              }
              data={[
                {
                  label: "Loan Rescheduling",
                  value: "LRSH",
                },
                {
                  label: "Loan Early Settlement",
                  value: "LEST",
                },
                {
                  label: "Loan Capital Reduction",
                  value: "LCAP",
                },
                {
                  label: "Loan Cancellation",
                  value: "LCAN",
                },
                {
                  label: "Repayment Account Change",
                  value: "LACC",
                },
              ]}
              value={formData?.transCode}
            />
          </div>

          <div className="w-1/2">
            <ListOfValue
              label="Branch"
              labelWidth="15%"
              inputWidth="50%"
              data={credBranches}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  branch: value,
                })
              }
              value={formData?.branch}
            />
          </div>
        </div>
      </div>

      <br />

      <div style={{ zoom: 0.9 }}>
        <Header title={"Credit Transactions Enquiry"} headerShade />
        <CustomTable
          headers={creditHeaders}
          data={cred}
          rowsPerPage={10}
          load={loading}
        />
      </div>
    </div>
  );
}

export default CreditTransactionsEnquiry;
