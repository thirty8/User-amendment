import React, { useEffect, useState } from "react";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import InputField from "../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import CustomTable from "../../../control-setups/components/CustomTable";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import Header from "../../../../../components/others/Header/Header";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import { FiPrinter } from "react-icons/fi";

function PrintLPAInvoice() {
  // STATES
  const [credData, setCredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [credBranches, setCredBranches] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    application_no: "",
    action_by: "",
    branch: "",
  });

  // CONSTANTS
  const creditHeaders = [
    <div>Application No.</div>,
    <div>Loan Type</div>,
    <div>Currency</div>,
    <div>Applicant Name</div>,
    <div>Requested Amount</div>,
    <div>Source Branch</div>,
    <div>Date</div>,
    <div>Action By</div>,
    <div>Print</div>,
  ];

  // FUNCTIONS
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
      <div>
        {formatDate(i?.posting_sys_date) === "01-JAN-1970"
          ? ""
          : formatDate(i?.posting_sys_date)}
      </div>,
      <div className="text-left">{i?.posted_by}</div>,
      <div className="flex justify-center items-center">
        <ButtonComponent
          buttonIcon={<FiPrinter />}
          buttonHeight={"20px"}
          buttonWidth={"40px"}
        />
      </div>,
    ];
  });

  //   FUNCTIONS
  const getPrintLpaInvoiceData = () => {
    const userinfo = JSON.parse(localStorage.getItem("userInfo"));
    const globalBranch = userinfo?.branchCode;
    setLoading(true);

    console.log(
      {
        name: formData?.name,
        amount: formData?.amount,
        application_no: formData?.application_no,
        action_by: formData?.action_by,
        branch: formData?.branch,
        globalBranch: globalBranch,
      },
      "LPAA"
    );

    axios
      .post(
        API_SERVER + "/api/get-printLpaData",
        {
          name: formData?.name,
          amount: formData?.amount,
          application_no: formData?.application_no,
          action_by: formData?.action_by,
          branch: formData?.branch,
          globalBranch: globalBranch,
        },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response?.data, "PRINT LPA");
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
      .get(API_SERVER + "/api/get-printLpaBranches", {
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
    getPrintLpaInvoiceData();
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
          getPrintLpaInvoiceData();
        }}
        onNewClick={() => {
          setFormData({
            name: "",
            amount: "",
            application_no: "",
            action_by: "",
            branch: "",
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
              label="Application No"
              labelWidth="25%"
              inputWidth="50%"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  application_no: e.target.value,
                })
              }
              value={formData?.application_no}
            />
          </div>

          <div className="w-1/2">
            <InputField
              label="Action By"
              labelWidth="15%"
              inputWidth="50%"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  action_by: e.target.value,
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
                  name: e.target.value,
                })
              }
              value={formData?.name}
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

        {/* THIRD ROW */}
        <div className="flex w-full">
          <div className="w-1/2">
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
              textAlign={"right"}
              value={formData?.amount}
            />
          </div>

          <div className="w-1/2"></div>
        </div>
      </div>

      <br />

      <div style={{ zoom: 0.9 }}>
        <Header title={"Print LPA Invoice"} headerShade />
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

export default PrintLPAInvoice;
