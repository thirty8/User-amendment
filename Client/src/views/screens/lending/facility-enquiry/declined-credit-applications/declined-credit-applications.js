import React, { useEffect, useState } from "react";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import InputField from "../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import CustomTable from "../../../control-setups/components/CustomTable";
import Header from "../../../../../components/others/Header/Header";
import { API_SERVER } from "../../../../../config/constant";
import { headers } from "../../../teller-ops/teller/teller-activities";
import axios from "axios";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import { FiArrowRight } from "react-icons/fi";

function DeclinedCreditApplications() {
  //  HEADERS
  const declinedHeaders = [
    <div>App No.</div>,
    <div className="text-left">Facility Type</div>,
    <div>Curr</div>,
    <div className="text-left">Applicant Name</div>,
    <div className="text-right">Requested Amount</div>,
    <div>Last St.</div>,
    <div>Cancelled Date</div>,
    <div className="text-left">Approval Status</div>,
    <div className="text-left">Action By</div>,
    <div>Click</div>,
  ];

  //   STATES
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    branch: "",
    relation_officer: "",
    application_no: "",
    amount: "",
  });
  const [branches, setBranches] = useState([]);
  const [declinedApplications, setDeclinedApplications] = useState([]);

  //   FUNCTIONS
  const handleRefresh = () => {
    setFormData({
      branch: "",
      relation_officer: "",
      application_no: "",
      amount: "",
    });
  };

  const handleFetchDeclinedApplications = () => {
    var userInfo = JSON.parse(localStorage?.getItem("userInfo"));
    var branchCode = userInfo?.branchCode;
    setLoading(true);
    axios
      .post(
        API_SERVER + "/api/decline-cred-application-data",
        {
          branch: formData?.branch,
          current_branch: branchCode,
          relation_officer: formData?.relation_officer,
          application_no: formData?.application_no,
          amount: formData?.amount,
        },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response.data);
        setLoading(false);
        setDeclinedApplications(response?.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

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

  //EFFECTS
  useEffect(() => {
    handleFetchDeclinedApplications();
    //   GET BRANCHES
    axios
      .get(API_SERVER + "/api/decline-cred-application-branches")
      .then(function (response) {
        console.log(response.data);
        setBranches(response?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //   TABLE DATA
  var declinedData = declinedApplications?.map((i) => {
    return [
      <div>{i?.applicant_no}</div>,
      <div className="text-left">{i?.facility_type}</div>,
      <div>{i?.currency}</div>,
      <div className="text-left">{i?.applicant_name}</div>,
      <div className="text-right">{formatNumber(parseFloat(i?.amount))}</div>,
      <div>{i?.age}</div>,
      <div>{formatDate(i?.posting_sys_date)}</div>,
      <div className="text-left">{i?.ret_status}</div>,
      <div className="text-left">{i?.posted_by}</div>,
      <div className="flex items-center justify-center">
        <ButtonComponent buttonWidth={"50px"} buttonIcon={<FiArrowRight />} />
      </div>,
    ];
  });

  return (
    <div>
      <div className="mb-4">
        <ActionButtons
          displayAuthorise={"none"}
          displayCancel={"none"}
          displayHelp={"none"}
          displayDelete={"none"}
          displayReject={"none"}
          displayView={"none"}
          displayNew={"none"}
          displayOk={"none"}
          onFetchClick={handleFetchDeclinedApplications}
          onRefreshClick={handleRefresh}
        />
      </div>

      <hr />

      <div className="space-y-4 mt-4">
        <InputField
          label="Application No."
          labelWidth={"30%"}
          inputWidth={"30%"}
          value={formData?.application_no}
          onChange={(e) => {
            setFormData({
              ...formData,
              application_no: e.target.value,
            });
          }}
        />
        <InputField
          label="Requested Amount >"
          labelWidth={"30%"}
          inputWidth={"30%"}
          value={formData?.amount}
          onChange={(e) => {
            setFormData({
              ...formData,
              amount: e.target.value,
            });
          }}
        />
        <InputField
          label="Applicant Name"
          labelWidth={"30%"}
          inputWidth={"30%"}
          value={formData?.relation_officer}
          onChange={(e) => {
            setFormData({
              ...formData,
              relation_officer: e.target.value,
            });
          }}
        />
        <ListOfValue
          label="Branch"
          labelWidth={"30%"}
          inputWidth={"30%"}
          // value={formData?.branch}
          data={branches}
          onChange={(value) => {
            setFormData({
              ...formData,
              branch: value,
            });
          }}
        />
      </div>

      <br />

      <div className="mt-4" style={{ zoom: 0.95 }}>
        <Header headerShade title={"Declined/Cancelled Applications"} />
        <CustomTable
          load={loading}
          data={declinedData}
          headers={declinedHeaders}
          rowsPerPage={10}
        />
      </div>
    </div>
  );
}

export default DeclinedCreditApplications;
