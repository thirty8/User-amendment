import React, { useEffect, useState } from "react";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import InputField from "../../../../../components/others/Fields/InputField";
import SelectField from "../../../../../components/others/Fields/SelectField";
import Header from "../../../../../components/others/Header/Header";
import CustomTable from "../../../control-setups/components/CustomTable";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import ButtonComponent from "./../../../../../components/others/Button/ButtonComponent";
import { FiArrowRight } from "react-icons/fi";
import Swal from "sweetalert2";

function CollectorRemoval() {
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
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  // STATES
  const [loading, setLoading] = useState(true);
  const [globalCollector, setGlobalCollector] = useState("");
  const [collectorDetails, setCollectorDetails] = useState([]);
  const [branches, setBranches] = useState([]);
  const [tableCollectorNameValue, setTableCollectorNameValue] = useState("");
  const [collectorData, setCollectorData] = useState({});

  // GETTING BRANCHES OF USERNAMES
  const handleBranches = (username) => {
    console.log(username);
    axios
      .post(
        API_SERVER + "/api/collector-removal-branches",
        { username: username },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response.data, "BRACHES");
        setBranches(response.data);
      })
      .catch((err) => console.log(err));
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
      .get(API_SERVER + "/api/get-collector-removal-data", { headers: headers })
      .then(function (response) {
        console.log(response.data);
        setCollectorDetails(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {}, []);

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
        <div
          onClick={() => {
            setCollectorData(collector);
            handleBranches(collector?.user_name);
          }}
        >
          <ButtonComponent
            buttonIcon={
              <div>
                <FiArrowRight />
              </div>
            }
          />
        </div>
      </div>,
    ];
  });

  const handleAmendment = (value) => {
    setTableCollectorNameValue(value);
    // Swal.fire({
    //   title: "Do you want to save the changes you have made?",
    //   showDenyButton: true,
    //   showCancelButton: true,
    //   confirmButtonText: "Yes",
    //   icon: "info",
    //   denyButtonText: `No`,
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     Swal.fire("Saved!", "", "success");
    //   } else if (result.isDenied) {
    //     Swal.close();
    //   }
    // });
  };

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
          setCollectorData({
            user_name: "",
            collector_min_days: "",
            collector_max_days: "",
          });
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
          <InputField
            label={"Collector Name"}
            required
            labelWidth={"20%"}
            inputWidth={"70%"}
            value={collectorData?.user_name}
            disabled
          />

          <InputField
            label={"Collector Group"}
            required
            id={"collector-group"}
            labelWidth={"20%"}
            inputWidth={"70%"}
            value={
              collectorData?.collector_code +
                " - " +
                collectorData?.collector_type ===
              "undefined - undefined"
                ? ""
                : collectorData?.collector_code +
                  " - " +
                  collectorData?.collector_type
            }
            disabled
          />

          <div className="flex">
            <InputField
              label={"Min Arrears Days"}
              labelWidth={"40%"}
              inputWidth={"40%"}
              disabled
              textAlign={"right"}
              value={collectorData?.collector_min_days}
            />

            <InputField
              label={"Min Arrears Days"}
              labelWidth={"40%"}
              inputWidth={"40%"}
              disabled
              textAlign={"right"}
              value={collectorData?.collector_max_days}
            />
          </div>

          <SelectField
            label={"Global Collector"}
            required
            id={"global-collector"}
            labelWidth={"20%"}
            inputWidth={"70%"}
            value={globalCollector}
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
          />

          <InputField
            label={"Zone"}
            required
            labelWidth={"20%"}
            id="collector-zone"
            inputWidth={"70%"}
            disabled
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
          <div style={{ overflowY: "scroll", height: "200px" }}>
            {branches?.map((branch) => {
              return (
                <div>
                  <br />
                  <InputField
                    disabled
                    inputWidth={"80%"}
                    value={`${branch?.br_code} - ${branch?.br_description}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <br />
      <hr />
      <br />

      <div>
        <Header title={"Collector Details"} headerShade />

        <div>
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

export default CollectorRemoval;
