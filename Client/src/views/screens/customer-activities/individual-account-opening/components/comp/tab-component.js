// import React from "react";
// import { Tabs } from "@mantine/core";

// const tabLineStyle = {
//   margin: "0 4px",
//   borderBottom: "1px solid lightgrey",
// };

// function TabsComponent({
//   tabsData,
//   disabledTabs,
//   activeTab,
//   setActiveTab,
//   activeColor,
//   inactiveColor,
//   blueTabs,
// }) {
//   return (
//     <Tabs
//       color={blueTabs ? "indigo" : "green"}
//       variant="pills"
//       radius="sm"
//       defaultValue={tabsData[0].value}
//       value={activeTab}
//       onTabChange={setActiveTab}
//     >
//       <Tabs.List style={tabLineStyle}>
//         {tabsData.map((tab) => (
//           <Tabs.Tab
//             key={tab.value}
//             value={tab.value}
//             icon={tab.icon}
//             disabled={disabledTabs ? disabledTabs.includes(tab.value) : null}
//             // style={disabledTabs ? (disabledTabs.includes(tab.value) ? disabledTabStyles : null) : null}
//             style={{
//               // backgroundColor: activeTab === tab.value ? "#3777c4" : "#b3d5ff",
//               backgroundColor:
//                 activeTab === tab.value ? activeColor : inactiveColor,
//               cursor:
//                 disabledTabs && disabledTabs.includes(tab.value)
//                   ? "pointer"
//                   : "pointer",
//                   fontFamily: "Poppins"
//             }}
//           >
//             {tab.label}
//           </Tabs.Tab>
//         ))}
//       </Tabs.List>

//       {tabsData.map((tab) => (
//         <Tabs.Panel key={tab.value} value={tab.value} pt="xs">
//           {tab.component}
//         </Tabs.Panel>
//       ))}
//     </Tabs>
//   );
// }

// export default TabsComponent;




import React from "react";
import { Tabs } from "@mantine/core";
import Swal from "sweetalert2";

const tabLineStyle = {
  margin: "0 4px",
  borderBottom: "1px solid lightgrey",
};

function TabsComponent({
  tabsData,
  activeTab,
  setActiveTab,
  activeColor,
  inactiveColor,
  blueTabs,
  completedTabs,
  insertedData,
}) {
  // Custom handler to manage tab changes with insertedData check
  const handleTabChange = (newTabValue) => {
    const currentTabIndex = tabsData.findIndex((tab) => tab.value === activeTab);
    const nextTabIndex = tabsData.findIndex((tab) => tab.value === newTabValue);

    // Allow switching to next tab if insertedData.length > 1 or if moving backward
    if (insertedData.length > 0 || nextTabIndex < currentTabIndex) {
      setActiveTab(newTabValue); // Change the tab only if condition is met
    } else {
      // alert("Please add more data before moving to the next step."); // Notify user
      Swal.fire({
        icon: "warning",
        title: "Please Add a Relation",
        text: "INFO - 00288 : Please Add a Relationship details before moving to the next TAB",
        showCancelButton: true,
        confirmButtonText: 'Yes, proceed',
        cancelButtonText: 'No, cancel',
      })
    }
  }

  return (
    <Tabs
      color={blueTabs ? "indigo" : "green"}
      variant="pills"
      radius="sm"
      defaultValue={tabsData[0].value}
      value={activeTab}
      onTabChange={handleTabChange} // Use custom handler here
    >
      <Tabs.List style={tabLineStyle}>
        {tabsData.map((tab) => (
          <Tabs.Tab
            key={tab.value}
            value={tab.value}
            icon={tab.icon}
            style={{
              backgroundColor:
                activeTab === tab.value ? activeColor : inactiveColor,
              cursor: "pointer",
              fontFamily: "Poppins",
            }}
          >
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {tabsData.map((tab) => (
        <Tabs.Panel key={tab.value} value={tab.value} pt="xs">
          {tab.component}
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}

export default TabsComponent;
