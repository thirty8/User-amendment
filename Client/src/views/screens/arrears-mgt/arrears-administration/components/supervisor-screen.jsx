import React, { useEffect, useState } from "react";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import Header from "../../../../../components/others/Header/Header";
import InputField from "../../../../../components/others/Fields/InputField";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import TabsComponent from "../../../../../components/others/tab-component/tab-component";
import Queue from "./queue";
import NonFid from "./NonFid";

const SupervisorScreen = () => {
  // HEADERS
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  // USE STATE
  const [nonFidData, setNonFidData] = useState([]);

  const [formData, setFormData] = useState({
    facility_no: "",
    principal_from: "",
    principal_to: "",
    interest_from: "",
    interest_to: "",
    customer_name: "",
  });

  //   STATES
  const [selfCureData, setselfCureData] = useState([]);
  const [softData, setSoftData] = useState([]);
  const [midData, setMidData] = useState([]);
  const [hardData, setHardData] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(formData, "DATA BEING INPUTTED");

  const handleFetch = () => {
    axios
      .post(
        API_SERVER + "/api/get-fids",
        {
          facility_no: formData?.facility_no,
          principal_from: parseFloat(formData?.principal_from),
          principal_to: parseFloat(formData?.principal_to),
          interest_from: formData?.interest_from,
          interest_to: formData?.interest_to,
          customer_name: formData?.customer_name,
        },
        { headers: headers }
      )
      .then(function (response) {
        setselfCureData(response.data);
        setLoading(false);
        console.log(response.data, "FID res");
      })
      .catch((error) => {
        console.log("Something went wrong: " + error);
        setLoading(false);
      });
  };

  // SOFT COLLECTIONS DATA
  const handleSoftCollectionsData = () => {
    axios
      .post(
        API_SERVER + "/api/get-soft-coll-queue",
        {
          facility_no: formData?.facility_no,
          principal_from: parseFloat(formData?.principal_from),
          principal_to: parseFloat(formData?.principal_to),
          interest_from: formData?.interest_from,
          interest_to: formData?.interest_to,
          customer_name: formData?.customer_name,
        },
        { headers: headers }
      )
      .then(function (response) {
        setSoftData(response.data);
        setLoading(false);
        console.log(response.data, "FID res");
      })
      .catch((error) => {
        console.log("Something went wrong: " + error);
        setLoading(false);
      });
  };

  // MID COLLECTIONS DATA
  const handleMidCollectionsData = () => {
    axios
      .post(
        API_SERVER + "/api/get-mid-coll-queue",
        {
          facility_no: formData?.facility_no,
          principal_from: parseFloat(formData?.principal_from),
          principal_to: parseFloat(formData?.principal_to),
          interest_from: formData?.interest_from,
          interest_to: formData?.interest_to,
          customer_name: formData?.customer_name,
        },
        { headers: headers }
      )
      .then(function (response) {
        setMidData(response.data);
        setLoading(false);
        console.log(response.data, "FID res");
      })
      .catch((error) => {
        console.log("Something went wrong: " + error);
        setLoading(false);
      });
  };

  // HARD COLLECTIONS DATA
  const handleHardCollectionsData = () => {
    axios
      .post(
        API_SERVER + "/api/get-hard-coll-queue",
        {
          facility_no: formData?.facility_no,
          principal_from: parseFloat(formData?.principal_from),
          principal_to: parseFloat(formData?.principal_to),
          interest_from: formData?.interest_from,
          interest_to: formData?.interest_to,
          customer_name: formData?.customer_name,
        },
        { headers: headers }
      )
      .then(function (response) {
        setHardData(response.data);
        setLoading(false);
        console.log(response.data, "FID res");
      })
      .catch((error) => {
        console.log("Something went wrong: " + error);
        setLoading(false);
      });
  };

  // NON-FID ACCOUNTS
  const handleNonFIDAccounts = () => {
    axios
      .get(
        API_SERVER + "/api/get-non-fidAccounts",

        { headers: headers }
      )
      .then(function (response) {
        setNonFidData(response.data);
        setLoading(false);
        console.log(response.data, "Non-FID res");
      })
      .catch((error) => {
        console.log("Something went wrong: " + error);
        setLoading(false);
      });
  };

  // EFFECTS
  useEffect(() => {
    handleFetch();
    handleSoftCollectionsData();
    handleMidCollectionsData();
    handleHardCollectionsData();
    handleNonFIDAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const arrearsDefaultScreens = [
    {
      value: "default",
      label: "First Installment Defaults (FID)",
      component: (
        <Queue
          selfCureData={selfCureData}
          softData={softData}
          midData={midData}
          hardData={hardData}
          loading={loading}
        />
      ),
    },
    {
      value: "1",
      label: "Non-FID Accounts",
      component: <NonFid data={nonFidData} />,
    },
  ];

  const [activeTab, setActiveTab] = useState(arrearsDefaultScreens[0].value);

  return (
    <div>
      <ActionButtons
        displayAuthorise={"none"}
        displayCancel={"none"}
        displayDelete={"none"}
        displayHelp={"none"}
        displayReject={"none"}
        displayView={"none"}
        displayRefresh={"none"}
        displayOk={"none"}
        onFetchClick={() => {
          handleFetch();
          handleSoftCollectionsData();
          handleMidCollectionsData();
          handleHardCollectionsData();
        }}
        onNewClick={() => {
          setFormData({
            facility_no: "",
            principal_from: "",
            principal_to: "",
            interest_from: "",
            interest_to: "",
            customer_name: "",
          });
        }}
      />

      <br />

      <main className="mb-48 px-4">
        <div>
          <div className="border border-[#ccc] p-2 rounded-md pb-7">
            <Header title="Arrears Enquiry" headerShade />
            <br />
            <div className="flex flex-1">
              <div className="flex-[0.5] space-y-4">
                <InputField
                  label={"Customer Name"}
                  labelWidth={"30%"}
                  inputWidth={"55%"}
                  name="customer_name"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      customer_name: e.target.value?.toUpperCase(),
                    })
                  }
                  value={formData?.customer_name}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleFetch();
                    }
                  }}
                />

                <InputField
                  label={"Principal From"}
                  labelWidth={"30%"}
                  inputWidth={"55%"}
                  textAlign={"right"}
                  name="principal_from"
                  onChange={(e) =>
                    setFormData({ ...formData, principal_from: e.target.value })
                  }
                  value={formData?.principal_from}
                />

                <InputField
                  label={"Interest From"}
                  labelWidth={"30%"}
                  inputWidth={"55%"}
                  textAlign={"right"}
                  name="interest_from"
                  onChange={(e) =>
                    setFormData({ ...formData, interest_from: e.target.value })
                  }
                  value={formData?.interest_from}

                  // name="br_code"
                  // data={branches}
                  // value={branchValue}
                  // onChange={(value) => setBranchValue(value)}
                />
              </div>

              <div className="flex-[0.5] space-y-4">
                <InputField
                  label={"Facility Number"}
                  labelWidth={"20%"}
                  inputWidth={"55%"}
                  textAlign={"right"}
                  name="facility_no"
                  onChange={(e) =>
                    setFormData({ ...formData, facility_no: e.target.value })
                  }
                  value={formData?.facility_no}
                />

                <InputField
                  label={"Principal To"}
                  labelWidth={"20%"}
                  inputWidth={"55%"}
                  textAlign={"right"}
                  name="principal_to"
                  onChange={(e) =>
                    setFormData({ ...formData, principal_to: e.target.value })
                  }
                  value={formData?.principal_to}
                />

                <InputField
                  label={"Interest To"}
                  labelWidth={"20%"}
                  inputWidth={"55%"}
                  textAlign={"right"}
                  name="interest_to"
                  onChange={(e) =>
                    setFormData({ ...formData, interest_to: e.target.value })
                  }
                  value={formData?.interest_to}
                />
              </div>
            </div>
          </div>

          <br />
          <TabsComponent
            tabsData={arrearsDefaultScreens}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            // activeColor={"#87adff"}
            // inactiveColor={"#c2e3fc"}

            activeColor={"#02c965"}
            inactiveColor={"#89fac1"}
          />
        </div>
      </main>
    </div>
  );
};

export default SupervisorScreen;
