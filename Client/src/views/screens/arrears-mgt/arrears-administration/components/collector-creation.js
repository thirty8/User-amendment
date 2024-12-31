import React, { useEffect, useState } from "react";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import InputField from "../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import SelectField from "../../../../../components/others/Fields/SelectField";
import Header from "../../../../../components/others/Header/Header";
import CustomTable from "../../../control-setups/components/CustomTable";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import ButtonType from "./../../../../../components/others/Button/ButtonType";
import ButtonComponent from "./../../../../../components/others/Button/ButtonComponent";
import { FiArrowRight } from "react-icons/fi";
import Swal from "sweetalert2";

function CollectorCreation() {
  // CONSTANTS AND VARIABLES
  var collectorDetailsHeader = [
    <div>Collector Name</div>,
    <div>Zone Code</div>,
    <div>Zone Name</div>,
    <div>Collector Code</div>,
    <div>Collector Group</div>,
    <div
      style={{
        textAlign: "right",
      }}
    >
      Min Day
    </div>,
    <div
      style={{
        textAlign: "right",
      }}
    >
      Max Days
    </div>,
    <div>Action</div>,
  ];

  var zoneHeaders = [
    <div>Branch Code</div>,
    <div style={{ textAlign: "left" }}>Branch Deescription</div>,
    <div>Tick </div>,
  ];

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  // STATES
  const [loading, setLoading] = useState(false);
  const [collectorNames, setCollectorNames] = useState([]);
  const [collectorNameValue, setCollectorNameValue] = useState("");
  const [collectorGroup, setCollectorGroup] = useState([]);
  const [collectorGroupValue, setCollectorGroupValue] = useState("");
  const [collectorZone, setCollectorZone] = useState([]);
  const [collectorZoneValue, setCollectorZoneValue] = useState("");
  const [globalCollector, setGlobalCollector] = useState("");
  const [collectorDetails, setCollectorDetails] = useState([]);
  const [arrearsDay, setArrearsDay] = useState([]);
  const [branches, setBranches] = useState([]);
  const [checkedBranches, setCheckedBranches] = useState([]);
  const [tableCollectorNameValue, setTableCollectorNameValue] = useState("");

  const handleCheckboxChange = (brCode) => {
    const isBranchChecked = checkedBranches.some(
      (checkedBranch) => checkedBranch.br_code === brCode
    );

    if (isBranchChecked) {
      setCheckedBranches((prevCheckedBranches) =>
        prevCheckedBranches.filter((branch) => branch.br_code !== brCode)
      );
    } else {
      setCheckedBranches((prevCheckedBranches) => [
        ...prevCheckedBranches,
        { br_code: brCode },
      ]);
    }
  };

    // HANDLE ON CLICK OF EXIT BUTTON
    const handleExitClick = () => {
        if (document.getElementById("exitBTN1")) {
          const exitBTN = document.getElementById("exitBTN1");
          const clickEvent = new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window,
          });
          exitBTN.dispatchEvent(clickEvent);
        }
      };

  //   DATA - EFFECTS
  useEffect(() => {
    axios
      .get(API_SERVER + "/api/get-collector-names", { headers: headers })
      .then(function (response) {
        console.log(response.data);
        setCollectorNames(response.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));

    //   GET GLOBAL COLLECTOR
    axios
      .get(API_SERVER + "/api/get-collector-zone", { headers: headers })
      .then(function (response) {
        setCollectorZone(response.data);
      })
      .catch((err) => console.log(err));

    // GET COLLECTOR DETAILS
    axios
      .get(API_SERVER + "/api/get-collector-details", { headers: headers })
      .then(function (response) {
        setCollectorDetails(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //   GET COLLECTOR GROUP - EFFECTS
  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/get-collector-group",
        { username: collectorNameValue },
        { headers: headers }
      )
      .then(function (response) {
        setCollectorGroup(response.data);
      })
      .catch((err) => console.log(err));
  }, [collectorNameValue]);

  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/get-collector-branch-chk",
        { username: tableCollectorNameValue },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response.data);
        setCheckedBranches(response.data);
      })
      .catch((err) => console.log(err));
  }, [tableCollectorNameValue]);

  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/get-branches-from-zone-name",
        { zone_name: collectorZoneValue },
        { headers: headers }
      )
      .then(function (response) {
        setBranches(response.data);
      })
      .catch((err) => console.log(err));
  }, [collectorZoneValue]);

  // EXAMPLE VARIABLES
  var zones = branches?.map((branch) => {
    const isBranchChecked = checkedBranches.some(
      (checkedBranch) => checkedBranch.br_code === branch.br_code
    );

    return [
      <div>{branch?.br_code}</div>,
      <div style={{ textAlign: "left" }}>{branch?.br_description}</div>,
      <div
        style={{ textAlign: "center", display: "flex", alignItems: "center" }}
      >
        <ButtonType
          type={"checkbox"}
          checked={isBranchChecked}
          onChange={() => handleCheckboxChange(branch?.br_code)}
        />
      </div>,
    ];
  });

  var detailsOfCollectors = collectorDetails?.map((collector) => {
    return [
      <div>{collector?.user_name}</div>,
      <div>{collector?.zone_code}</div>,
      <div>{collector?.zone_name}</div>,
      <div>{collector?.collector_code}</div>,
      <div>{collector?.collector_type}</div>,
      <div
        style={{
          textAlign: "right",
        }}
      >
        {collector?.collector_min_days}
      </div>,
      <div
        style={{
          textAlign: "right",
        }}
      >
        {collector?.collector_max_days}
      </div>,
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => handleAmendment(collector?.user_name)}
      >
        <div>
          <ButtonComponent
            label={
              <div>
                <FiArrowRight />
              </div>
            }
            buttonWidth={"fit-content"}
          />
        </div>
      </div>,
    ];
  });

  //   FUNCTIONS
  const getMinAndMaxDays = (code) => {
    axios
      .post(
        API_SERVER + "/api/get-min-and-max-days",
        { collectorCode: code },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response.data, "geez");
        setArrearsDay(response.data);
      })
      .catch((err) => console.log(err));
  };

  const handleAmendment = (value) => {
    setTableCollectorNameValue(value);
    Swal.fire({
      title: "Do you want to save the changes you have made?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      icon: "info",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.close();
      }
    });
  };

  console.log(checkedBranches, "CHKK");

  return (
    <div className="mb-32">
      <ActionButtons
        displayAuthorise={"none"}
        displayReject={"none"}
        displayCancel={"none"}
        displayDelete={"none"}
        displayHelp={"none"}
        displayView={"none"}
        displayRefresh={"none"}
        displayFetch={"none"}
        onNewClick={() => {
          setCollectorNameValue("");
          setCollectorGroupValue("");
          setCollectorZoneValue("");
          setGlobalCollector("");
          setArrearsDay([]);
          setBranches([]);
        }}
        onExitClick={() => {
            handleExitClick();
          }}
      />

      <br />
      <hr />
      <br />

      <div
        style={{
          display: "flex",
          flex: 1,
          padding: "10px",
        }}
      >
        {/* COLLECTOR SETUP */}
        <div className="space-y-6" style={{ flex: 0.5 }}>
          <ListOfValue
            label={"Collector Name"}
            required
            labelWidth={"20%"}
            inputWidth={"70%"}
            data={collectorNames}
            onChange={(value) => {
              setCollectorNameValue(value);
              setTimeout(() => {
                const input = document.getElementById("collector-group");
                input?.focus();
              }, 0);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const input = document.getElementById("collector-group");
                input?.focus();
              }
            }}
            value={collectorNameValue}
          />

          <ListOfValue
            label={"Collector Group"}
            required
            id={"collector-group"}
            labelWidth={"20%"}
            inputWidth={"70%"}
            data={collectorGroup}
            onChange={(value) => {
              setCollectorGroupValue(value);
              setTimeout(() => {
                const input = document.getElementById("global-collector");
                input?.focus();
              }, 0);

              // PASSING VALUE TO GET MIN DAYS AND MAX DAYS
              getMinAndMaxDays(value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const input = document.getElementById("global-collector");
                input?.focus();
              }
            }}
            value={collectorGroupValue}
          />

          <div className="flex">
            <InputField
              label={"Min Arrears Days"}
              labelWidth={"40%"}
              inputWidth={"40%"}
              disabled
              textAlign={"right"}
              value={arrearsDay[0]?.collector_min_days}
            />

            <InputField
              label={"Min Arrears Days"}
              labelWidth={"40%"}
              inputWidth={"40%"}
              disabled
              textAlign={"right"}
              value={arrearsDay[0]?.collector_max_days}
            />
          </div>

          <SelectField
            label={"Global Collector"}
            required
            id={"global-collector"}
            labelWidth={"20%"}
            inputWidth={"70%"}
            data={[
              {
                label: "Yes",
                value: "Y",
              },
              {
                label: "No",
                value: "N",
              },
            ]}
            value={globalCollector}
            onChange={(value) => {
              setGlobalCollector(value);
              setTimeout(() => {
                const input = document.getElementById("collector-zone");
                input?.focus();
              }, 0);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const input = document.getElementById("collector-zone");
                input?.focus();
              }
            }}
          />

          <ListOfValue
            label={"Collector Zone"}
            required
            labelWidth={"20%"}
            id="collector-zone"
            inputWidth={"70%"}
            data={collectorZone}
            onChange={(value) => setCollectorZoneValue(value)}
            value={collectorZoneValue}
          />
        </div>

        <div
          style={{
            flex: 0.5,
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "4px",
          }}
        >
          <Header headerShade title={"Assign Branch to collector"} />
          {branches?.length !== 0 ? (
            <div
              style={{
                height: branches?.length !== 0 ? "250px" : "100%",
                overflowY: branches?.length !== 0 ? "scroll" : "none",
                zoom: "0.8",
              }}
            >
              <CustomTable
                data={zones}
                load={loading}
                headers={zoneHeaders}
                 
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <br />
      <hr />
      <br />

      <div>
        <Header title={"Collector Details"} headerShade />

        <div style={{ zoom: "0.8" }}>
          <CustomTable
            data={detailsOfCollectors}
            load={loading}
            headers={collectorDetailsHeader}
             
          />
        </div>
      </div>
    </div>
  );
}

export default CollectorCreation;
