import React, { useState } from "react";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import TabsComponent from "../components/tab-component/tab-component";
import OverdraftDetails from "../components/tod-creation/overdraft-details";
import Document from "../components/credit-origination/Document";
import Summary from "../components/tod-creation/summary";
import { Tabs } from "@mantine/core";

const TodCreation = () => {
  // STATES
  const [acctDetails, setAcctDetails] = useState("");
  const [currentValuev, setCurrentValuev] = useState(1);
  const [limitNumber, setLimitNumber] = useState(1);
  const [pf, setPF] = useState({});

  // CONTINUE CLICK
  const handleContinueClick = () => {
    // Logic to update the value based on your requirements
    // For example, incrementing the value in this case
    if (currentValuev < 4) {
      // Assuming you have 4 values (1, 2, 3, 4)
      setCurrentValuev(currentValuev + 1);
    }
  };

  const handlePreviousClick = () => {
    // Logic to update the value based on your requirements
    // For example, incrementing the value in this case
    if (currentValuev > 1) {
      // Assuming you have 4 values (1, 2, 3, 4)
      setCurrentValuev(currentValuev - 1);
    }
  };

  // FUNCTIONS
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
    <div style={{ zoom: 0.92 }}>
      <div style={{ padding: "10px" }}>
        <ActionButtons
          displayFetch={"none"}
          displayAuthorise={"none"}
          displayCancel={"none"}
          displayDelete={"none"}
          displayHelp={"none"}
          displayReject={"none"}
          displayView={"none"}
          onExitClick={() => {
            handleExitClick();
          }}
          // onNewClick={onNewClick}
        />
        <br />

        <Tabs
          value={String(currentValuev)}
          color="yellow"
          radius="xs"
          variant="pills"
        >
          <Tabs.List>
            <Tabs.Tab value="1">Overdraft Details</Tabs.Tab>
            <Tabs.Tab value="2">Summary</Tabs.Tab>
            <Tabs.Tab value="3">Document</Tabs.Tab>
          </Tabs.List>
          <hr />

          <Tabs.Panel value="1" pt="xs">
            <OverdraftDetails
              data={setAcctDetails}
              onClickOfContinue={handleContinueClick}
              limit={setLimitNumber}
              proposedFacilityData={setPF}
              // onNewClick={onNewClick}
            />
          </Tabs.Panel>
          <Tabs.Panel value="2" pt="xs">
            <Summary
              account={acctDetails}
              onClickOfContinue={handleContinueClick}
              onClickOfPrevious={handlePreviousClick}
              limitNum={limitNumber}
              proposedFacilityDetails={pf}
            />
          </Tabs.Panel>
          <Tabs.Panel value="3" pt="xs">
            <Document onClickOfPrevious={handlePreviousClick} />
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default TodCreation;
