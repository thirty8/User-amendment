import React, { useState, useEffect } from "react";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import Header from "../../../../components/others/Header/Header";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
import TabsComponent from "../../../../components/others/tab-component/tab-component";
import OtherDetails from "./atm-card-request-components/OtherDetails";
import ATMRequestDetails from "./atm-card-request-components/ATMRequestDetails";
import axios from "axios";
import { API_SERVER } from "../../../../config/constant";
import CustomTable from "../../control-setups/components/CustomTable";

function AtmCardRequest() {
  // headers
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  // state
  const [atmTypes, setATMTypes] = useState([]);
  const [atmTypeValue, setATMTypeValue] = useState("");
  const [atmCardTypeDetails, setATMCardTypeDetails] = useState([]);
  const [atmLimit, setAtmLimit] = useState("");
  const [atmDescription, setAtmDescription] = useState([]);
  const [atmLimitDuration, setAtmLimitDuration] = useState([]);
  const [atmCardTypeChange, setAtmCardTypeChange] = useState(false);
  const [showPhoneNumberField, setShowPhoneNumberField] = useState(false);

  // atm card tabs
  const atmCardTabs = [
    {
      value: "default",
      label: "ATM Request Details",
      component: (
        <ATMRequestDetails
          atmCardTypeValue={atmTypeValue}
          atmCardDetails={atmCardTypeDetails}
          phoneNumberField={showPhoneNumberField}
          atmLimit={atmLimit}
          atmDescription={atmDescription}
          atmLimitDuration={atmLimitDuration}
          atmCardTypeChange={atmCardTypeChange}
        />
      ),
    },
    {
      value: "1",
      label: "Other Details",
      component: <OtherDetails />,
    },
  ];

  // use effect
  axios
    .get(API_SERVER + "/api/get-atm-types", { headers })
    .then(function (response) {
      setATMTypes(response.data);
    })
    .catch((err) => console.log(err));

  // states
  const [activeTab, setActiveTab] = useState(atmCardTabs[0].value);

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

  return (
    <div>
      <ActionButtons
        displayAuthorise={"none"}
        displayCancel={"none"}
        displayDelete={"none"}
        displayHelp={"none"}
        displayRefresh={"none"}
        displayReject={"none"}
        displayView={"none"}
        displayFetch={"none"}
        displayExit={"none"}
        onExitClick={() => {
          handleExitClick();
        }}
        onNewClick={() => {
          setAtmLimit("");
          setAtmDescription("");
          setAtmLimitDuration("");
          setATMTypeValue("");
        }}
      />
      <Header title="ATM Card Request" headerShade />

      <div className="py-4 space-y-4">
        <ListOfValue
          label="ATM Card Type"
          labelWidth={"40%"}
          inputWidth={"20%"}
          data={atmTypes}
          onChange={(value) => {
            setATMTypeValue(value);
            setAtmCardTypeChange(true);

            // get card details
            axios
              .post(
                API_SERVER + "/api/get-atm-card-type-details",
                {
                  atm_card_type: value,
                },
                {
                  headers: headers,
                }
              )
              .then(function (response) {
                console.log(response.data, "omniman");
                setATMCardTypeDetails(response.data);
                setAtmLimit(response.data[0]?.atm_limit);
                setAtmDescription(response.data[0]?.description);
                setAtmLimitDuration(response.data[0]?.limit_duration);
                setShowPhoneNumberField(true);
              })
              .catch((err) => console.log(err));
          }}
          value={atmTypeValue}
        />

        <hr />

        <TabsComponent
          tabsData={atmCardTabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeColor={"#87adff"}
          inactiveColor={"#c2e3fc"}
        />

        <hr />

        <div>
          <Header title={"Fee Charges"} headerShade />
          <CustomTable
            headers={[
              "Fee Account.",
              "Fee Account Description",
              "Fees Description",
              "Fee Amount",
              "Currency",
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default AtmCardRequest;
