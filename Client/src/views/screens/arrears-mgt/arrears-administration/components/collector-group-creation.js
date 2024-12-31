import React, { useEffect, useState } from "react";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import Header from "../../../../../components/others/Header/Header";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import InputField from "../../../../../components/others/Fields/InputField";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import { FiArrowRight } from "react-icons/fi";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import CustomTable from "../../../control-setups/components/CustomTable";

function CollectorGroupCreation() {
  // HEADERS
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const collectionGroupSetupHeaders = [
    <div>Collector Code</div>,
    <div>Collector Group</div>,
    <div style={{ textAlign: "right" }}>Min Days</div>,
    <div style={{ textAlign: "right" }}>Max Days</div>,
    <div>Posted By</div>,
    <div>Amend</div>,
  ];

  // STATES AND VARIABLES
  const [collectorGroup, setCollectorGroup] = useState([]);
  const [collectorData, setCOllectorData] = useState([]);
  const [loading, setLoading] = useState(true);

  var collectorSetupData = collectorGroup?.map((i) => {
    return [
      <div>{i?.collector_code}</div>,
      <div style={{ textAlign: "left" }}>{i?.description}</div>,
      <div style={{ textAlign: "right" }}>{i?.collector_min_days}</div>,
      <div style={{ textAlign: "right" }}>{i?.collector_max_days}</div>,
      <div style={{ textAlign: "left" }}>{i?.posted_by}</div>,
      <div
        onClick={() => {
          setCOllectorData(i);
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ButtonComponent
          buttonIcon={<FiArrowRight />}
          buttonWidth={"50px"}
          buttonHeight={"25px"}
        />
      </div>,
    ];
  });

  //  FUNCTIONS
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

  // EFFECTS
  useEffect(() => {
    axios
      .get(API_SERVER + "/api/get-collector-group-setup", { headers: headers })
      .then(function (response) {
        setCollectorGroup(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(`Something went wrong:` + error);
        setLoading(false);
      });
  }, []);

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
        onNewClick={() => {
          setCOllectorData([]);
        }}
        onExitClick={() => {
          handleExitClick();
        }}
      />
      <Header title={"Collector Group Creation"} />
      <hr />
      <br />

      <div className="space-y-6">
        <div style={{ width: "50%" }}>
          <ListOfValue
            required
            label={"Collector Group"}
            labelWidth={"30%"}
            inputWidth={"40%"}
            value={collectorData?.collector_code}
            // data={collectorGroup}
            // onChange={(value) => setCOllectorGroupValue(value)}
          />
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ width: "50%" }}>
            <InputField
              label="Min Arrears Days"
              required
              labelWidth={"30%"}
              inputWidth={"40%"}
              value={collectorData?.collector_min_days}
              textAlign={"right"}
            />
          </div>

          <div style={{ width: "50%" }}>
            <InputField
              label="Max Arrears Days"
              required
              labelWidth={"30%"}
              inputWidth={"40%"}
              value={collectorData?.collector_max_days}
              textAlign={"right"}
            />
          </div>
        </div>
      </div>

      <br />
      <br />

      <Header title={"Collector Setup"} headerShade />
      <div>
        <CustomTable
          headers={collectionGroupSetupHeaders}
          data={collectorSetupData}
          load={loading}
        />
      </div>
    </div>
  );
}

export default CollectorGroupCreation;
