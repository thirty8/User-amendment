import React, { useState } from "react";
import TabsComponent from "../../../../../components/others/tab-component/tab-component";
// import DPD from "./DPD";
import SoftQueue from "./soft-queue";
import MidQueue from "./mid-queue";
import HardQueue from "./hard-queue";
import SelfCureQueue from "./self-cure-queue";

function Queue({ selfCureData, loading, softData, midData, hardData }) {
  const arrearsDefaultScreens = [
    {
      value: "default",
      label: "Self Cure Queue",
      component: (
        <SelfCureQueue selfCureData={selfCureData} loading={loading} />
      ),
    },
    {
      value: "soft",
      label: "Soft Collection Queue",
      component: <SoftQueue data={softData} />,
    },
    {
      value: "mid",
      label: "Mid Collection Queue",
      component: <MidQueue data={midData} />,
    },
    {
      value: "hard",
      label: "Hard Collection Queue",
      component: <HardQueue data={hardData} />,
    },
  ];

  const [activeTab, setActiveTab] = useState(arrearsDefaultScreens[0].value);

  return (
    <div>
      <div>
        <TabsComponent
          tabsData={arrearsDefaultScreens}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeColor={"#87adff"}
          inactiveColor={"#c2e3fc"}
        />
      </div>
    </div>
  );
}

export default Queue;
